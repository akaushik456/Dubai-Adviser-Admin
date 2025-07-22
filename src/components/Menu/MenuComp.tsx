import React from 'react';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken } from '../../app/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';


interface MenuCompProps {
  open: boolean
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}
const MenuComp: React.FC<MenuCompProps> = ({ anchorEl, open, setAnchorEl }) => {
  const token = localStorage.getItem('token');
  const reduxtoken = useSelector(selectToken);
  const dispatch = useDispatch()
  const nav = useNavigate();

  const handleMenuClick = (handleFunction?: () => void) => {
    setAnchorEl(null); // Close menu
    if (handleFunction) handleFunction(); // Execute assigned function
  };

  const menuItems = [
    {
      title: "Profile",
      icon: <Avatar />,
      handle: () => nav('/profile'),
    },
    {
      title: "My Account",
      icon: <Avatar />,
      handle: () => nav('/account'),
    },
    { divider: true },
    {
      title: "Add another account",
      icon: <PersonAdd fontSize="small" />,
      handle: () => console.log("Adding another account..."),
    },
    {
      title: "Settings",
      icon: <Settings fontSize="small" />,
      handle: () => nav('/settings'),
    },
    {
      title: "Logout",
      icon: <Logout fontSize="small" />,
      handle: () => {
        console.log("Logging out...");
        dispatch(logout());
        localStorage.removeItem('token');
        nav('/');
      },
    },
  ];


  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
    console.log('event', event, event.currentTarget)
    if (event.currentTarget) {
      console.log('currenttarget', event.currentTarget.tagName)
      if (token || reduxtoken) {
        // dispatch(logout());
        // if (!token) {
        //   nav('/')
        // }
      }
    }

  }
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {menuItems.map((item, index) =>
        item.divider ? (
          <Divider key={index} />
        ) : (
          <MenuItem key={index} onClick={() => handleMenuClick(item?.handle)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.title}
          </MenuItem>
        )
      )}

    </Menu>
  )
}

export default MenuComp