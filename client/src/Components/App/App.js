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
import { BrowserRouter, Route } from 'react-router-dom'
import { store } from '../../helpers/store'
import { Provider } from 'react-redux'

class App extends React.Component {
  state = {
    data: null
  }

  componentDidMount() {
    this.callbackBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.error(err))
  }

  callbackBackendAPI = async () => {
    const response = await fetch('/express_backend')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render () {
    return (
      <Provider store={store}>
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
              <p>Express: {this.state.data}</p>
            </section>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App;
