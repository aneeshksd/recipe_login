import React from 'react';
import './App.css';
import LoginPage from "../src/pages/LoginPage";
import { Route,  BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../src/pages/RecipeDashboard';
import RecipeDetail from '../src/pages/RecipeDetails'
import Sidebar from '../src/pages/Sidebar';

function App() {
  return (
    <><Router>
      <Switch>
      <Route path="/LoginPage" component={LoginPage} />
        <Route path='/recipe_dashboard' component={Dashboard} />
        <Route path='/recipeDetails' component={RecipeDetail} />
        <Route path='/sidebar' component={Sidebar} />
        <Route path="/" render={() => <Redirect to="/LoginPage" />} />
      </Switch>
    </Router></>
  );
}

export default App;