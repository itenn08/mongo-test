import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import RequireAuth from './RequireAuth';
import PageTable from '../pages/Pages';
import UsersTable from '../pages/Users';
import AuthPage from '../pages/auth';
import PageLayout from '../pages/PageLayout';
import {NewPage} from '../pages/NewPage';
import ProductsTable from '../pages/Products';
import {NewProduct} from '../pages/NewProduct';

const UIRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<RequireAuth />}>
        <Route
          path="/users"
          element={
            <PageLayout>
              <UsersTable />
            </PageLayout>
          }
        />

        <Route
          path="/pages"
          element={
            <PageLayout pageScrollable>
              <PageTable />
            </PageLayout>
          }
        />

        <Route
          path="/pages/new"
          element={
            <PageLayout pageScrollable>
              <NewPage />
            </PageLayout>
          }
        />

        <Route
          path="/products"
          element={
            <PageLayout pageScrollable>
              <ProductsTable />
            </PageLayout>
          }
        />

        <Route
          path="/products/new"
          element={
            <PageLayout pageScrollable>
              <NewProduct />
            </PageLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  </Router>
);

export default UIRouter;
