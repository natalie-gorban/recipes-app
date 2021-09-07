import React from 'react';
import './App.css'
import AppHeader from '../AppHeader/AppHeader';
import Home from '../Home/Home';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import SearchIngredient from '../SearchIngredient/SearchIngredient';
import SearchResults from '../SearchResults/SearchResults';
import Recipe from '../Recipe/Recipe';
import NewRecipe from '../NewRecipe/NewRecipe';
import {BrowserRouter, Route} from 'react-router-dom'

class App extends React.Component {
  render () {
    return (
      <>
        <BrowserRouter>
          <div className="App">
            <AppHeader/>
            <section id="hero" className="d-block align-items-center justify-content-center">
              <div className="container text-center">
                <Route exact path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/search_ingredient" component={SearchIngredient}/>
                <Route path="/search_results" component={SearchResults}/>
                <Route path="/recipe:id" component={Recipe}/>
                <Route path="/new_recipe" component={NewRecipe}/>
              </div>
            </section>
          </div>
        </BrowserRouter>
      </>
    )
  }
}
export default App;
