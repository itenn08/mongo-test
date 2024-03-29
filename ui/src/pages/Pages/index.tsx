import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, CircularProgress, Grid} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import {DataGridLayout} from '../../components/DataGridLayout';
import {columns, makeRows} from './PageTableDataGrid';
import {Page} from '../../types/pages';
import PageEdit from './EditPage';
import {usePages, useQueryPages} from '../../hooks/reactQuery/usePages';
import {createEmptyResource, makePage} from '../../utils/paging';
import {PageListingLayout} from '../../components/PageListingLayout';
import {Widget} from '../../components/Widget';
import {TabContentContainer} from '../../components/TabContentContainer';
import {CategoriesWidget} from './CategoriesWidget';
import DeleteModal from '../../components/DeleteModal';

const pageSize = 10;

const PageTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [query, setQuery] = useState('');

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedPage(null);
  };

  const {deletePage} = usePages();

  const {data: pagesResource = createEmptyResource<Page>(pageSize), isLoading} =
    useQueryPages(
      {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
        query,
      },
      {keepPreviousData: true},
    );

  useEffect(() => {
    if (pagesResource.data.length === 0) {
      setPageCount(0);
    } else {
      setPageCount(Math.ceil(pagesResource.total / page.pageSize));
    }
  }, [pagesResource, page.pageSize]);

  useEffect(() => {
    if (!isLoading && pagesResource && pagesResource?.data) {
      setRows(makeRows(pagesResource));
    }
  }, [pagesResource, isLoading]);

  const handleDeletePage = async () => {
    await deletePage(selectedPage?.id!);
    handleCloseModal();
  };

  const getEditablePage = (highlightedPage: Page) => {
    setSelectedPage(highlightedPage);
    setShowEditModal(true);
  };

  const getDeletablePage = (highlightedPage: Page) => {
    setSelectedPage(highlightedPage);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedPage(null);
  };

  return (
    <TabContentContainer>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <PageListingLayout
            renderWidget={
              <Widget
                getSearchValue={(value) => setQuery(value)}
                searchPlaceholder="Search by name"
                showActionBtn
                btnOnClick={() => navigate('/pages/new')}
                btnLabel="New Page"
              />
            }>
            <Box display="flex" flexGrow={1} sx={{minHeight: '650px'}}>
              {!isLoading ? (
                <DataGridLayout
                  rows={rows}
                  columns={columns(getEditablePage, getDeletablePage)}
                  loading={isLoading}
                  pageSize={page.pageSize}
                  pageIndex={page.pageIndex + 1}
                  pageCount={pageCount}
                  hideFooter={
                    pageCount <= 1 || pagesResource.data.length < pageSize
                  }
                  handlePageChange={(value) =>
                    setPage((prev) => ({
                      ...prev,
                      pageIndex: value - 1,
                    }))
                  }
                />
              ) : (
                <CircularProgress />
              )}
            </Box>
          </PageListingLayout>
        </Grid>
        {selectedPage && (
          <PageEdit
            page={selectedPage!}
            openDialog={showEditModal}
            onClose={handleCloseEditModal}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onConfirm={handleDeletePage}
          onClose={handleCloseModal}
          title="Delete Page"
          content={`Are you sure to delete Page ${selectedPage?.title}?`}
        />
        <Grid item xs={6}>
          <CategoriesWidget />
        </Grid>
      </Grid>
    </TabContentContainer>
  );
};

export default PageTable;
