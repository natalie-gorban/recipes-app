import React from 'react';
import './SearchIngredient.css'
import { connect } from "react-redux";

class SearchIngredient extends React.Component {
  render () {
    return (
      <>
        <h1>Search by Ingredients</h1>
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

export default connect(mapStateToProps)(SearchIngredient);
