import React, { useState, useEffect } from "react";
import "./Recipe.css";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import http from "../../helpers/http-common";
const API_URL = `${process.env.API_URL || "http://localhost:5000/api/"}recipe/`;

const Recipe = () => {
  let { recipeId } = useParams();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    http
      .post(
        `${API_URL}get`,
        { recipeId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setFormData({ ...response.data });
      })
      .catch((err) => {
        setFormData({ message: err.message, isError: true });
      });
  }, [recipeId]);

  return (
    <>
      <h1>Recipe</h1>
      {
        !formData?.isError ? (
          <Link to={`/add_recipe/${recipeId}`}>Edit Recipe #{recipeId}</Link>
      ) : (
        <></>
      )

      }
      <div>
        {Object.entries(formData).map((entry) => {
          return (
            <p key={entry[0]}>
              {entry[0]}: <span key={entry[0]}>{entry[1]}</span>
            </p>
          );
        })}
      </div>
    </>
  );
};

export default connect()(Recipe);
