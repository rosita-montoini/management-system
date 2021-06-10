import React, { useEffect } from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/authContext';
import { Navbar } from './components/navbar/navbar';
import 'materialize-css';

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
      {isAuth && <Navbar />}
      <div className="container">
          {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
