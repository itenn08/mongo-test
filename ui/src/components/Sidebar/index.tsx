import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Description, Logout, People} from '@mui/icons-material';

import AuthStore from '../../store/Auth';
import SidebarLink from './Link';
import styles from './styles.module.scss';

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthStore.logout();
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      <SidebarLink title="Users" onClick={() => navigate('/users')}>
        <People />
      </SidebarLink>
      <SidebarLink title="Pages" onClick={() => navigate('/pages')}>
        <Description />
      </SidebarLink>
      <SidebarLink title="Logout" onClick={logoutHandler}>
        <Logout />
      </SidebarLink>
    </div>
  );
};

export default Sidebar;
