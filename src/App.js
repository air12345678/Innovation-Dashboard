import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import Menu from './Components/Menu';
import Dashboard from './Components/Dashboard/Dashboard';
import AddIdea from './Components/AddIdea/AddIdea';
import Ideas from './Components/Ideas/Ideas';
import Login from './Components/Login/Login';
import DetailsIdea from './Components/DetailsIdea/DetailsIdea';
import EditIdea from './Components/EditIdea/EditIdea';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import Error from './Components/Error/Error';
import MyIdeas from './Components/MyIdeas/MyIdeas';
import Demo from './Components/Demo';
function App() {
  return (
    <div>
      {/* <Menu/> */}
      <Switch>
        <PublicRoute exact path ='/' component ={Login}/>
        <PrivateRoute path ='/dashboard' component ={Dashboard}/>
        <PrivateRoute path ='/add-idea' component = {AddIdea}/>
        <PrivateRoute path = '/ideas' component = {Ideas}/>
        <PublicRoute path = '/login' component ={Login}/>
        <PrivateRoute path ='/IdeaDetails/:id' component={DetailsIdea}/>
        <PrivateRoute path='/Edit-Idea/:id' component = {EditIdea} />
        <PrivateRoute path='/myideas/:email' component={MyIdeas}/>
        <PublicRoute path = "*" component={Error}/>
        {/* <PublicRoute path='/demo' component={Demo}/> */}
        </Switch>
     <Demo/>
    </div>
  );
}

export default App;
