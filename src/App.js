import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/header/Header';
import PageRoutes from './routes/PageRoutes';
import { useEffect } from 'react';

function App() {
  const {color} = useSelector(state => state.theme)

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
