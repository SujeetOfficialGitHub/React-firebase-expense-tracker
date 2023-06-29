import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/header/Header';
import PageRoutes from './routes/PageRoutes';
import { useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { logout } from './app/features/authSlice';

function App() {
  const {color} = useSelector(state => state.theme)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch();


  const isTokenExpired = (token) => {
    if (!token) return true
    const currentTime = Math.floor(Date.now()/1000);
    const decodedToken = decodeToken(token)
    return currentTime>decodedToken.exp
  }

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired(token)){
        dispatch(logout())
      }
    }
    const checkTokenExpirationInterval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(checkTokenExpirationInterval);
  },[dispatch, token])

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <>
      <Header />
      <main>
        <PageRoutes />
      </main>
    </>
  );
}

export default App;
