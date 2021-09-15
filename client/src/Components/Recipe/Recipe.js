import React from 'react';
import './Recipe.css'
import { connect } from "react-redux";

class Recipe extends React.Component {
  render () {
    return (
      <>
        <h1>Recipe</h1>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Recipe);
