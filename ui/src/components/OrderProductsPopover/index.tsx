import React, {useEffect, useState} from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import {GridRowsProp} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import {OrderProductView} from '../../types/orders';
import {DataGridLayout} from '../DataGridLayout';
import {columns, makeRows} from './OrderProductsGrid';

type Props = {
  products: OrderProductView[];
};

const OrderProductsPopover = ({products}: Props) => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    if (products) {
      setRows(makeRows(products));
    }
  }, [products]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Show
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Box sx={{height: '100%', minWidth: '700px', padding: '20px'}}>
          <DataGridLayout
            rows={rows}
            columns={columns}
            hideFooter
            containerStyle={{minHeight: '500px'}}
          />
        </Box>
      </Popover>
    </div>
  );
};

export default OrderProductsPopover;
