import React from 'react';
import { useRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/authContext';
import { Navbar } from './components/navbar/navbar';
import { Loader } from '../../components/loader/loader';
import { useHttp } from './hooks/useHttp';
import 'materialize-css';

function App() {
  const { token, login, logout, userId } = useAuth();
  const { loading } = useHttp();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  if (loading) {
    return <Loader/>
}
  
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
