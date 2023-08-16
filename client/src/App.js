import Home from './components/Home/Home';
import NavBar from './components/Navbar/NavBar';
import Routing from './Routing';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
