import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AuthPage from "../pages/auth";
import NoAuthTemplate from "../pages/noAuthTemplate";

const UIRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route element={<NoAuthTemplate />}> */}
        <Route path="/" element={<AuthPage />} />
        {/* </Route> */}
        {/* <Route element={<NoAuthTemplate />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/end" element={<EndPage />} />
        </Route>

        <Route element={<AuthTemplate showIcons={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AuthTemplate />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/logbook" element={<LogBook />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/policies" element={<Policies />} />
          </Route>
        </Route> */}
        {/* <Route path="*" element={<Navigate to="/overview" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default UIRouter;
