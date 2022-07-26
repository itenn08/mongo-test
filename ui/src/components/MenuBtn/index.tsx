import {MouseEvent, useState} from 'react';
import Box from '@mui/material/Box';
import Button, {ButtonProps} from '@mui/material/Button';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import {MenuBtnProps} from '../../types/misc';

interface Props extends ButtonProps {
  label?: string | JSX.Element;
  menu: MenuBtnProps[];
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  menuProps?: MenuProps;
  anchorType?: 'iconButton' | 'button';
  anchorIcon?: JSX.Element | null;
  disableIcon?: boolean;
  persistList?: boolean;
}

export const MenuBtn = ({
  label = '',
  menu,
  startIcon,
  endIcon,
  menuProps,
  anchorType = 'button',
  anchorIcon = null,
  disableIcon,
  persistList = false,
  ...rest
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {anchorType === 'button' ? (
        <Button
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={handleClick}
          {...rest}>
          {label}
        </Button>
      ) : (
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={disableIcon}
          sx={{opacity: disableIcon ? 0.2 : 1}}>
          {anchorIcon}
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        {...menuProps}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            onClick={(e) => {
              if (!persistList) {
                handleClose();
              }
              item.action(e);
            }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
