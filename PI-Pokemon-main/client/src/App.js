import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/LandingPage/Landing';
import Home from './components/HomePage/Home';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import './Font.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" component={Home} /> 
          <Route path="/about" component={About} />
          <Route path="/pokemon/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
