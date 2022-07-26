import {useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useTheme from '@mui/material/styles/useTheme';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnHeaderParams,
  GridEventListener,
  GridEvents,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate} from 'react-router-dom';

import {EmptySection} from '../EmptySection';
import {CustomPagination} from '../CustomPagination';

interface Props extends DataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  hideFooter?: boolean;
  height?: string | number;
  containerStyle?: {[key: string]: string | number};
  loading?: boolean;
  onCellClick?: GridEventListener<GridEvents.cellClick>;
  pageSize?: number;
  pageIndex?: number;
  handlePageSizeChange?: (pageSize: number) => any;
  handlePageChange?: (pageSize: number) => any;
  pageCount?: number;
  totalRows?: number;
  fullHeight?: boolean;
  noRowsEmptySection?: JSX.Element;
  noResultsEmptySection?: JSX.Element;
  noResultsCondition?: boolean;
  isRowSelectable?: (params: GridRowParams) => boolean;
  isCellClickable?: boolean;
  checkboxSelection?: boolean;
  isWidget?: boolean;
  headerHeight?: number;
  scrollToTop?: any;
}

interface ColumnProps extends GridColDef {
  field: string;
  headerName: string;
  type?: 'string' | 'number';
  cellClassName?: 'nowrap' | 'truncateText';
  variant?: 'uppercase' | 'titleCase';
}

export const getColumnProps = ({
  field,
  headerName,
  type = 'string',
  cellClassName = 'nowrap',
  variant = 'uppercase',
  renderHeader = (params: GridColumnHeaderParams) => (
    <Typography variant="subtitle2" color="textSecondary">
      {(params.colDef.headerName &&
        variant === 'titleCase' &&
        params.colDef.headerName) ||
        (params.colDef.headerName && params.colDef.headerName.toUpperCase())}
    </Typography>
  ),
  renderCell = (params: GridRenderCellParams<any, any, any>) => (
    <Typography variant="body2">{params.value || '-'}</Typography>
  ),
  flex = 1,
  align = 'left',
  editable = false,
  sortable = false,
}: ColumnProps): GridColDef => ({
  field,
  type,
  headerName,
  cellClassName,
  renderHeader,
  renderCell,
  flex,
  headerAlign: align,
  align,
  editable,
  sortable,
});

export const DataGridLayout = ({
  rows,
  columns,
  hideFooter = false,
  height,
  containerStyle,
  loading,
  onCellClick,
  pageSize,
  pageIndex,
  handlePageSizeChange = (n: number) => n,
  handlePageChange = (n: number) => n,
  pageCount,
  totalRows,
  fullHeight = true,
  noRowsEmptySection,
  isRowSelectable,
  noResultsEmptySection,
  noResultsCondition = false,
  isCellClickable = true,
  checkboxSelection = false,
  disableSelectionOnClick = true,
  onRowClick = () => {},
  selectionModel,
  isWidget = false,
  headerHeight,
  scrollToTop,
  ...rest
}: Props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const gridRef = useRef<any>();

  const rowClassNames: any[string] = [];
  rows.forEach((item) => {
    if (item.showHeader) {
      rowClassNames[`& .MuiDataGrid-rowHeading-${item.id}`] = {
        '&::before': {
          content: `"${item.headerText}"`,
        },
      };
    }
  });

  useEffect(() => {
    if (gridRef.current) {
      const ele = gridRef.current.querySelector('.MuiDataGrid-virtualScroller');
      ele.scrollTop = 0;
    }
  }, [scrollToTop]);

  const renderFooter = () => (
    <CustomPagination
      pageSize={pageSize}
      pageIndex={pageIndex}
      handlePageSizeChange={handlePageSizeChange}
      handlePageChange={handlePageChange}
      pageCount={pageCount}
      totalRows={totalRows}
    />
  );

  const noRowsOverlay = () => {
    if (noResultsCondition) {
      return (
        noResultsEmptySection || (
          <EmptySection
            illustration="clipboard"
            size="tiny"
            containerStyle={{my: 'auto'}}
            label="No data entries yet. They will appear here once added."
          />
        )
      );
    }
    return (
      noRowsEmptySection || (
        <EmptySection
          illustration="clipboard"
          size="tiny"
          containerStyle={{my: 'auto'}}
          label="There are no entires for the applied filters."
        />
      )
    );
  };

  return (
    <Box
      sx={{
        flexGrow: fullHeight ? 1 : 'unset',
        ...(!fullHeight && {height}),
      }}>
      <DataGrid
        ref={gridRef}
        components={{
          LoadingOverlay: LinearProgress,
          Footer: renderFooter,
          NoRowsOverlay: noRowsOverlay,
        }}
        loading={loading}
        headerHeight={headerHeight || 50}
        rows={rows}
        columns={columns}
        isRowSelectable={isRowSelectable}
        disableSelectionOnClick={disableSelectionOnClick}
        disableColumnFilter
        disableColumnMenu
        selectionModel={selectionModel}
        hideFooter={hideFooter}
        sortingMode="server"
        onCellClick={
          onCellClick ||
          ((params, e) => {
            if (params.field === '__check__') {
              return;
            }
            e.preventDefault();
            if (params.field !== 'actions' && isCellClickable) {
              navigate(params.row.navigateTo);
            }
          })
        }
        getRowClassName={(params) =>
          params.row.showHeader
            ? `MuiDataGrid-rowHeading-common MuiDataGrid-rowHeading-${params.row.id}`
            : ''
        }
        onRowClick={onRowClick}
        checkboxSelection={checkboxSelection}
        sx={{
          width: '100%',
          my: '0.5em',
          borderLeft: 'none',
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: '2px solid',
          borderColor: 'background.default',
          '& .MuiDataGrid-row': {
            background: 'white',
            cursor: 'pointer',
          },
          '& .MuiDataGrid-columnHeaders': {
            background: 'white',
            border: '2px solid',
            borderColor: 'background.default',
            borderRadius: '4px',
            ...(isWidget && {
              border: `1px solid ${theme.palette.text.disabled}`,
              borderRadius: '4px',
            }),
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: '0',
            whiteSpace: 'pre-wrap',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-main': {
            '.MuiLinearProgress-root': {
              top: 50,
              zIndex: 1,
              position: 'absolute',
              width: '100%',
            },
            '& *:focus, & *:focus-within': {
              '& *': {
                outline: 'none',
                cursor: 'pointer',
              },
            },
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus ':
            {
              outline: 'none',
              border: 'none',
            },
          '& .MuiDataGrid-cell': {
            borderBottom: '2px solid ',
            borderColor: 'background.default',
            whiteSpace: 'normal',
          },

          '.MuiDataGrid-rowHeading-common': {
            marginTop: 'calc(2em + 4px)',
            position: 'relative',
            '&::before': {
              position: 'absolute',
              width: '100%',
              top: '-2em',
              paddingLeft: '.75em',
              borderTop: '2px solid',
              borderColor: 'background.default',
              borderBottom: '2px solid white',
              background: 'white',
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.9375rem',
              lineHeight: 1.73,
              letterSpacing: '0.15px',
            },
          },
          '.nowrap': {
            whiteSpace: 'nowrap',
          },
          '.truncateText': {
            '& p': {
              overflow: 'hidden',
              textOverflow: 'ellipsis ',
              display: '-webkit-box',
              maxWidth: '100%',
              // Limit to number of lines
              WebkitLineClamp: '2 ',
              WebkitBoxOrient: 'vertical',
            },
          },
          '& .MuiDataGrid-columnHeaderCheckbox': {
            opacity: 0,
          },
          ...rowClassNames,
          ...containerStyle,
        }}
        {...rest}
      />
    </Box>
  );
};
