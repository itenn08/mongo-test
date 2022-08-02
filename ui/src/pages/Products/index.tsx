import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, CircularProgress, Grid} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import {DataGridLayout} from '../../components/DataGridLayout';
import {columns, makeRows} from './ProductsTableDataGrid';
import {createEmptyResource, makePage} from '../../utils/paging';
import {PageListingLayout} from '../../components/PageListingLayout';
import {Widget} from '../../components/Widget';
import {TabContentContainer} from '../../components/TabContentContainer';
import {CategoriesWidget} from './CategoriesWidget';
import DeleteModal from '../../components/DeleteModal';
import {Product} from '../../types/products';
import {
  useProducts,
  useQueryProducts,
} from '../../hooks/reactQuery/useProducts';
import ProductEdit from './EditProduct';

const pageSize = 10;

const ProductsTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState('');

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const {deleteProduct} = useProducts();

  const {
    data: productsResource = createEmptyResource<Product>(pageSize),
    isLoading,
  } = useQueryProducts(
    {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query,
    },
    {keepPreviousData: true},
  );

  useEffect(() => {
    if (productsResource.data.length === 0) {
      setPageCount(0);
    } else {
      setPageCount(Math.ceil(productsResource.total / page.pageSize));
    }
  }, [productsResource, page.pageSize]);

  useEffect(() => {
    if (!isLoading && productsResource && productsResource?.data) {
      setRows(makeRows(productsResource));
    }
  }, [productsResource, isLoading]);

  const handleDeleteProduct = async () => {
    await deleteProduct(selectedProduct?.id!);
    handleCloseModal();
  };

  const getEditableProduct = (highlightedProduct: Product) => {
    setSelectedProduct(highlightedProduct);
    setShowEditModal(true);
  };

  const getDeletableProduct = (highlightedProduct: Product) => {
    setSelectedProduct(highlightedProduct);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
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
                btnOnClick={() => navigate('/products/new')}
                btnLabel="New Product"
              />
            }>
            <Box display="flex" flexGrow={1} sx={{minHeight: '650px'}}>
              {!isLoading ? (
                <DataGridLayout
                  rows={rows}
                  columns={columns(getEditableProduct, getDeletableProduct)}
                  loading={isLoading}
                  pageSize={page.pageSize}
                  pageIndex={page.pageIndex + 1}
                  pageCount={pageCount}
                  hideFooter={
                    pageCount <= 1 || productsResource.data.length < pageSize
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
        {selectedProduct && (
          <ProductEdit
            product={selectedProduct!}
            openDialog={showEditModal}
            onClose={handleCloseEditModal}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onConfirm={handleDeleteProduct}
          onClose={handleCloseModal}
          title="Delete Product"
          content={`Are you sure to delete Product ${selectedProduct?.name}?`}
        />
        <Grid item xs={6}>
          <CategoriesWidget />
        </Grid>
      </Grid>
    </TabContentContainer>
  );
};

export default ProductsTable;
