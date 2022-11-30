import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Home />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
