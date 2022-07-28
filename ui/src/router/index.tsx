import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import PageTable from '../pages/Pages';
import UsersTable from '../pages/Users';

import AuthPage from '../pages/auth';
import PageLayout from '../pages/PageLayout';
import {NewPage} from '../pages/NewPage';
import RequireAuth from './RequireAuth';

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
            <PageLayout>
              <NewPage />
            </PageLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  </Router>
);

export default UIRouter;
