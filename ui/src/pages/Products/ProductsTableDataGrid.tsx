import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {Box, Typography} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';

import {formatDate} from '../../utils/date';
import {StatusChip} from '../../components/StatusChip/StatusChip';
import {Resource} from '../../types/misc';
import {Product} from '../../types/products';

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
  getEditableProduct: (item: Product) => void,
  getDeletableProduct: (item: Product) => void,
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'url',
    headerName: 'URL',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'seoTitle',
    headerName: 'SEO Title',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'seoDescription',
    headerName: 'SEO Description',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'string',
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
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
  {
    field: 'actions',
    headerName: '',
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => (
      <Box sx={{display: 'flex'}}>
        <Box onClick={() => getEditableProduct(params.value)} sx={{mr: '1em'}}>
          <Edit sx={{color: 'text.secondary'}} />
        </Box>
        <Box onClick={() => getDeletableProduct(params.value)}>
          <Delete sx={{color: 'text.secondary'}} />
        </Box>
      </Box>
    ),
  },
];

export const makeRows = (products: Resource<Product>): any => {
  const result =
    products.data &&
    products.data.map((product: Product, index: number) => ({
      id: index,
      name: product.name || '-',
      url: product.url || '-',
      category: product.category?.name || '-',
      seoTitle: product.seoTitle || '-',
      seoDescription: product.seoDescription || '-',
      createdAt: formatDate(product.createdAt) || '-',
      updatedAt: formatDate(product.updatedAt) || '-',
      isActive: product.isActive,
      actions: product,
    }));
  return result || [];
};
