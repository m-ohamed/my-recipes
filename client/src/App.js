import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import RecipesList from "./components/recipes-list.component";
import EditRecipe from "./components/edit-recipe.component";
import AddRecipe from "./components/add-recipe.component";
import ViewRecipe from './components/view-recipe.component';

function App() {
  return (
    <Router>
      <Navbar />
      
      <br/>

      <Route path="/" exact component={RecipesList} />
      <Route path="/edit/:id" exact component={EditRecipe} />
      <Route path="/add" exact component={AddRecipe} />
      <Route path="/view/:id" exact component={ViewRecipe} />
    </Router>
  );
}

export default App;
