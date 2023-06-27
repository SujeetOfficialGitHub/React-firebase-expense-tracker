import './App.css';
import Header from './components/layout/header/Header';
import PageRoutes from './routes/PageRoutes';

function App() {
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
