import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, CircularProgress, Grid} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import {DataGridLayout} from '../../components/DataGridLayout';
import {columns, makeRows} from './OrdersDataGrid';

import {createEmptyResource, makePage} from '../../utils/paging';
import {PageListingLayout} from '../../components/PageListingLayout';
import {Widget} from '../../components/Widget';
import {TabContentContainer} from '../../components/TabContentContainer';
import DeleteModal from '../../components/DeleteModal';
import {OrderView} from '../../types/orders';
import {useOrders, useQueryOrders} from '../../hooks/reactQuery/useOrders';
import OrderEdit from './EditOrder';

const pageSize = 10;

const OrdersTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderView | null>(null);
  const [query, setQuery] = useState('');

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  const {deleteOrder} = useOrders();

  const {
    data: ordersResource = createEmptyResource<OrderView>(pageSize),
    isLoading,
  } = useQueryOrders(
    {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
      query,
    },
    {keepPreviousData: true},
  );

  useEffect(() => {
    if (ordersResource.data.length === 0) {
      setPageCount(0);
    } else {
      setPageCount(Math.ceil(ordersResource.total / page.pageSize));
    }
  }, [ordersResource, page.pageSize]);

  useEffect(() => {
    if (!isLoading && ordersResource && ordersResource?.data) {
      setRows(makeRows(ordersResource));
    }
  }, [ordersResource, isLoading]);

  const handleDeletePage = async () => {
    await deleteOrder(selectedOrder?.id!);
    handleCloseModal();
  };

  const getEditableOrder = (highlightedOrder: OrderView) => {
    setSelectedOrder(highlightedOrder);
    setShowEditModal(true);
  };

  const getDeletableOrder = (highlightedOrder: OrderView) => {
    setSelectedOrder(highlightedOrder);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  return (
    <TabContentContainer>
      <Grid container columnSpacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <PageListingLayout
            renderWidget={
              <Widget
                getSearchValue={(value) => setQuery(value)}
                searchPlaceholder="Search by phone number"
                showActionBtn
                btnOnClick={() => navigate('/orders/new')}
                btnLabel="New Order"
              />
            }>
            <Box display="flex" flexGrow={1} sx={{minHeight: '650px'}}>
              {!isLoading ? (
                <DataGridLayout
                  rows={rows}
                  columns={columns(getEditableOrder, getDeletableOrder)}
                  loading={isLoading}
                  pageSize={page.pageSize}
                  pageIndex={page.pageIndex + 1}
                  pageCount={pageCount}
                  hideFooter={
                    pageCount <= 1 || ordersResource.data.length < pageSize
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
        {selectedOrder && (
          <OrderEdit
            order={selectedOrder!}
            openDialog={showEditModal}
            onClose={handleCloseEditModal}
          />
        )}
        <DeleteModal
          open={showDeleteModal}
          onConfirm={handleDeletePage}
          onClose={handleCloseModal}
          title="Delete Order"
          content={`Are you sure to delete Order ${selectedOrder?.id}?`}
        />
      </Grid>
    </TabContentContainer>
  );
};

export default OrdersTable;
