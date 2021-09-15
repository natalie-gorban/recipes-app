import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import './App.css'
import AppHeader from '../AppHeader/AppHeader';
import Home from '../Home/Home';

import Signup from '../Signup/Signup';
import Login from '../Login/Login';

import SearchIngredient from '../SearchIngredient/SearchIngredient';
import SearchResults from '../SearchResults/SearchResults';
import Recipe from '../Recipe/Recipe';
import AddRecipe from '../add-recipe/add-recipe';
import Profile from '../Profile/Profile';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";
import { history } from '../../helpers/history';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
      data: null
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    this.callbackBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.error(err))
  }

  logOut() {
    this.props.dispatch(logout());
  }

  callbackBackendAPI = async () => {
    const response = await fetch('/healthz')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render () {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <AppHeader/>
          <section id="hero" className="d-block align-items-center justify-content-center">
            <div className="container text-center">
              <Route exact path="/" component={Home}/>
              <Route path="/search_ingredient" component={SearchIngredient}/>
              <Route path="/search_results/:owner" component={SearchResults}/>
              <Route path="/recipe/:id" component={Recipe} />
              <Route path="/profile" component={Profile}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/add_recipe" component={AddRecipe}/>
            </div>
            <p>Express: {this.state.data || 'Backend is offline'}</p>
          </section>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
