import {BrowserRouter as Router} from 'react-router-dom'
import {AppRoutes} from './routes/routes'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import NavBar from './components/NavBar';
function App() {
  return (
    <>
    <Router>
      <NavBar/>
      

      <AppRoutes/>
      
    </Router>
    </>
  );
}

export default App;
