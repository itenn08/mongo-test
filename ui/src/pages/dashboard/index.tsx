import React, {ReactNode} from 'react';

import styles from './styles.module.scss';

const DashboardPage = ({children}: {children: ReactNode}) => (
  <div className={styles.wrapper}>{children}</div>
);

export default DashboardPage;
