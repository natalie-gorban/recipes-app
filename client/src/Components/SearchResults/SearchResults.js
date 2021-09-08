import React from 'react';
import './SearchResults.css'
import { useParams } from 'react-router-dom'
import { connect } from "react-redux";

const SearchResults = () => {
  let { owner } = useParams()

  return (
    <>
      <h1>Search Results</h1>
      <p>Owner: {owner}</p>
    </>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(SearchResults);
