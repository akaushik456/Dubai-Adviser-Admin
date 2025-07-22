import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Tooltip,
  Box
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarlisting } from './sideBarListing';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SideBarListProps {
  collapsed: boolean;
}

const SideBarList: React.FC<SideBarListProps> = ({ collapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Manage expanded state per main category
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        sidebarlisting.map(item => [item.list, true]) 
      )
  );

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <List sx={{ py: 0 }}>
      {sidebarlisting.map((category, idx) => (
        <div key={idx + category.list}>
          <Tooltip title={collapsed ? category.list : ''} placement="right">
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => toggleDropdown(category.list)}
                sx={{
                  backgroundColor: 'primary.main',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color:'#fff'
                }}
              >
                <ListItemIcon sx={{ color: 'info.main', minWidth: 40 }}>
                  <img src="/list.svg" alt="LIST" />
                </ListItemIcon>
                {!collapsed && (
                  <>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: 18
                          }}
                        >
                          {category?.list}
                        </Typography>
                      }
                    />
                    {openDropdowns[category.list] ? (
                      <ExpandLessIcon sx={{ color: '#fff' }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: '#fff' }} />
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>

          {/* Subcategories */}
          <Collapse in={openDropdowns[category.list]} timeout="auto" unmountOnExit>
            {category.subcategory?.map((sub, subIdx) => (
              <Tooltip
                key={subIdx + sub.list}
                title={collapsed ? sub.list : ''}
                placement="right"
              >
                <ListItem
                  disablePadding
                  sx={{
                    pl: collapsed ? 0 : 4,
                    backgroundColor: 'formbg.main'
                  }}
                >
                  <ListItemButton
                    onClick={() => navigate(sub?.pathname)}
                    sx={{
                      ml: collapsed ? 0 : 3,
                      pl: collapsed ? 0 : 0,
                      borderBottom: subIdx === category.subcategory.length - 1 ? '' : '1px solid rgb(106 106 106)',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}
                  >
                    {!collapsed && (
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <sub.icon
                          style={{
                            color:
                              pathname === sub?.pathname
                                ? '#BB5FD3'
                                : '#ffffff'
                          }}
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {collapsed && (
                            <sub.icon
                              style={{
                                color:
                                  pathname === sub?.pathname
                                    ? '#BB5FD3'
                                    : '#ffffff',
                                marginLeft: 20
                              }}
                            />
                          )}
                          {!collapsed && (
                            <Typography
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700,
                                fontSize: '15px',
                                textTransform: 'capitalize',
                                color:
                                  pathname === sub?.pathname
                                    ? 'sidebaractive.main'
                                    : 'info.main'
                              }}
                            >
                              {sub?.list}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            ))}
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default SideBarList;
