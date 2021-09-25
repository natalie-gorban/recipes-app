import React from 'react';
import './Recipe.css'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux";

const Recipe = () => {
  let { recipe_id } = useParams()

  return (
    <>
      <h1>Recipe</h1>
      <p>ID of recipe: {recipe_id}</p>
    </>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Recipe);
