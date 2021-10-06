import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import Menu from './Components/Menu';
import Dashboard from './Components/Dashboard';
import AddIdea from './Components/AddIdea';
import Ideas from './Components/Ideas';
function App() {
  return (
    <div>
      <Menu/>
      <Switch>
        <Route exact path ='/' component ={Dashboard}/>
        <Route path ='/dashboard' component ={Dashboard}/>
        <Route path ='/add-idea' component = {AddIdea}/>
        <Route path = '/ideas' component = {Ideas}/>
        </Switch>
     
    </div>
  );
}

export default App;
