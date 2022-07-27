import React, {useEffect} from 'react';

import UIRouter from './router';
import UserStore from './store/User';
import styles from './App.module.scss';
import {getUserById} from './hooks/reactQuery/useUsers';

const App = () => {
  const email = window.localStorage.getItem('email');

  useEffect(() => {
    const getProfile = async () => {
      if (email) {
        const user = await getUserById(email);
        UserStore.setUser(user);
      }
    };
    getProfile();
  }, [email]);

  return (
    <div className={styles.body}>
      <UIRouter />
    </div>
  );
};

export default App;
