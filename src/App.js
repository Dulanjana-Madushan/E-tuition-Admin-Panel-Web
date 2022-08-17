import React from 'react'; 
import { useRoutes } from 'react-router-dom';
import router from './routes';
import useToken from './services/useToken';

function App() {
  const { token, setToken } = useToken();

  var role = localStorage.getItem('role');

  const route = useRoutes(router(role, setToken));

  return (
    <div> {route}</div>
  );
}

export default App;
