import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import PageTable from '../components/PageTable';
import UsersTable from '../components/UsersTable';

import AuthPage from '../pages/auth';
import AuthTemplate from '../pages/authTemplate';
import DashboardPage from '../pages/dashboard';
import RequireAuth from './RequireAuth';

const UIRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<AuthPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AuthTemplate />}>
          <Route
            path="/users"
            element={
              <DashboardPage>
                <UsersTable />
              </DashboardPage>
            }
          />
        </Route>
        <Route element={<AuthTemplate />}>
          <Route
            path="/pages"
            element={
              <DashboardPage>
                <PageTable />
              </DashboardPage>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  </Router>
);

export default UIRouter;
