import React from 'react';
import {Outlet} from 'react-router-dom';

import Footer from '../../components/Footer';

const NoAuthTemplate = () => (
  <>
    <Outlet />;
    <Footer />
  </>
);

export default NoAuthTemplate;
