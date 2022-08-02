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
import HomePage from '../pages/Home';

const UIRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<RequireAuth />}>
        <Route
          path="/home"
          element={
            <PageLayout pageTitle="Home">
              <HomePage />
            </PageLayout>
          }
        />

        <Route
          path="/users"
          element={
            <PageLayout pageTitle="Users">
              <UsersTable />
            </PageLayout>
          }
        />

        <Route
          path="/pages"
          element={
            <PageLayout pageTitle="Pages" pageScrollable>
              <PageTable />
            </PageLayout>
          }
        />

        <Route
          path="/pages/new"
          element={
            <PageLayout pageTitle="New Page" pageScrollable>
              <NewPage />
            </PageLayout>
          }
        />

        <Route
          path="/products"
          element={
            <PageLayout pageTitle="Products" pageScrollable>
              <ProductsTable />
            </PageLayout>
          }
        />

        <Route
          path="/products/new"
          element={
            <PageLayout pageTitle="New Products" pageScrollable>
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
