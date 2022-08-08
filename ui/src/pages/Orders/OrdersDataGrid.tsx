import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

import {formatDate} from '../../utils/date';
import {Resource} from '../../types/misc';
import {OrderView} from '../../types/orders';
import {OrderChip} from '../../components/OrderChip';
import OrderProductsPopover from '../../components/OrderProductsPopover';

const defaultProps = {
  editable: false,
  sortable: false,
  renderHeader: (params: GridColumnHeaderParams) => (
    <Typography variant="subtitle2" color="textSecondary">
      {typeof params.colDef.headerName === 'string'
        ? params.colDef.headerName
        : params.colDef.headerName}
    </Typography>
  ),
  renderCell: (params: GridRenderCellParams<any, any, any>) => (
    <Typography variant="body2" mx="0.5em">
      {params.value}
    </Typography>
  ),
};

const defaultAlignment: {
  flex: number;
  headerAlign: GridAlignment;
  align: GridAlignment;
} = {
  flex: 1,
  headerAlign: 'left',
  align: 'left',
};

export const columns = (
  getEditableOrder: (item: OrderView) => void,
  getDeletableOrder: (item: OrderView) => void,
): GridColDef[] => [
  {
    field: 'firstName',
    headerName: 'First Name',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'number_phone',
    headerName: 'Phone',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'products',
    headerName: 'Products',
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => <OrderProductsPopover products={params.value} />,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 1,
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => <OrderChip status={params.value} />,
  },
  {
    field: 'actions',
    headerName: '',
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => (
      <Box sx={{display: 'flex'}}>
        <Box onClick={() => getEditableOrder(params.value)} sx={{mr: '1em'}}>
          <Edit sx={{color: 'text.secondary'}} />
        </Box>
        <Box onClick={() => getDeletableOrder(params.value)}>
          <Delete sx={{color: 'text.secondary'}} />
        </Box>
      </Box>
    ),
  },
];

export const makeRows = (orders: Resource<OrderView>): any => {
  const result =
    orders.data &&
    orders.data.map((order: OrderView, index: number) => ({
      id: index,
      firstName: order.firstName || '-',
      lastName: order.lastName || '-',
      number_phone: order.number_phone || '-',
      address: order.address || '-',
      text: order.text || '-',
      products: order.products || [],
      updatedAt: formatDate(order.updatedAt) || '-',
      createdAt: formatDate(order.createdAt) || '-',
      status: order.status,
      actions: order,
    }));
  return result || [];
};
