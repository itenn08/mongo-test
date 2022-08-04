import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {Avatar, Typography} from '@mui/material';

import {OrderProductView} from '../../types/orders';
import {StatusChip} from '../StatusChip/StatusChip';

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

export const columns: GridColDef[] = [
  {
    field: 'photoUrl',
    headerName: '',
    flex: 0.5,
    headerAlign: 'center',
    align: 'center',
    ...defaultProps,
    renderCell: (params) => <Avatar src={params.value} />,
  },
  {
    field: 'name',
    headerName: 'Name',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 0.5,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 1,
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 1,
  },
  {
    field: 'isActive',
    headerName: 'Status',
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => (
      <StatusChip
        color={params.value ? 'primary' : 'error'}
        label={params.value ? 'Active' : 'Inactive'}
      />
    ),
  },
];

export const makeRows = (products: OrderProductView[]): any => {
  const result =
    products &&
    products.map((product: OrderProductView) => ({
      id: product.product.id,
      quantity: product.quantity,
      name: product.product.name || '-',
      url: product.product.url || '-',
      price:
        `${product.product.price || 0}${
          product.product.currency && product.product.currency
        }` || '-',
      photoUrl: product.product.photoUrl || '-',
      inStock: product.product.quantity || '-',
      isActive: product.product.isActive,
    }));
  return result || [];
};
