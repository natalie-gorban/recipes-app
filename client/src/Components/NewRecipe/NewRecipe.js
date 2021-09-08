import React from 'react';
import './NewRecipe.css'
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class NewRecipe extends React.Component {

  render () {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <h1>New Recipe</h1>
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

export default connect(mapStateToProps)(NewRecipe);
