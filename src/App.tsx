import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import AllTodoLists from './components/AllTodos/AllTodoLists';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={isAuthenticated ? <AllTodoLists /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </Router>
  );
};

export default App;
