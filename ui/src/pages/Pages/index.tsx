import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Button, CircularProgress, Grid, Modal} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import styles from './styles.module.scss';
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

const pageSize = 10;

const PageTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
      },
      {keepPreviousData: true},
    );

  useEffect(() => {
    setPageCount(Math.ceil(pagesResource.total / page.pageSize));
  }, [pagesResource, page.pageSize]);

  useEffect(() => {
    if (!isLoading && pagesResource && pagesResource?.data.length > 0) {
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
                searchPlaceholder="Search by number, name, address etc."
                showActionBtn
                btnOnClick={() => navigate('/pages/new')}
                btnLabel="New Page"
              />
            }>
            <Box display="flex" flexGrow={1} sx={{minHeight: '650px'}}>
              {rows.length > 0 ? (
                <DataGridLayout
                  rows={rows}
                  columns={columns(getEditablePage, getDeletablePage)}
                  loading={isLoading}
                  pageSize={page.pageSize}
                  pageIndex={page.pageIndex + 1}
                  pageCount={pageCount}
                  hideFooter={pageCount <= 1}
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
        <Modal open={showDeleteModal} onClose={handleCloseModal}>
          <Box sx={style}>
            <div className={styles.modalText}>
              Are you sure to delete Page <span>{selectedPage?.title}</span>?
            </div>
            <div className={styles.modalButtons}>
              <Button onClick={handleCloseModal} variant="contained">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeletePage}>
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
        <Grid item xs={12}>
          <CategoriesWidget />
        </Grid>
      </Grid>
    </TabContentContainer>
  );
};

export default PageTable;
