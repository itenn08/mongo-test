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
import {Page} from '../../types/pages';
import {Resource} from '../../types/misc';

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
  getEditablePage: (item: Page) => void,
  getDeletablePage: (item: Page) => void,
): GridColDef[] => [
  {
    field: 'title',
    headerName: 'Title',
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
        <Box onClick={() => getEditablePage(params.value)} sx={{mr: '1em'}}>
          <Edit sx={{color: 'text.secondary'}} />
        </Box>
        <Box onClick={() => getDeletablePage(params.value)}>
          <Delete sx={{color: 'text.secondary'}} />
        </Box>
      </Box>
    ),
  },
];

export const makeRows = (pages: Resource<Page>): any => {
  const result =
    pages.data &&
    pages.data.map((page: Page, index: number) => ({
      id: index,
      title: page.title || '-',
      url: page.url || '-',
      seoTitle: page.seoTitle || '-',
      seoDescription: page.seoDescription || '-',
      date: formatDate(page.date) || '-',
      isActive: page.isActive,
      actions: page,
    }));
  return result || [];
};
