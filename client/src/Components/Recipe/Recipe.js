import React, { useState, useEffect } from "react";
import "./Recipe.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, ButtonBase, Paper } from "@material-ui/core/";
// import { Box, Rating, StarIcon } from '@mui/material/';
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import http from "../../helpers/http-common";
import { CDN_URL, API_URL } from "../../config";
const BASE_URL = `${API_URL}recipe/`;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      // width: '50ch',
    },
  },

  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: "20px",
    width: "1100px",
    height: "auto",
  },
  image: {
    width: "300px",
    height: "300px",
  },
  img: {
    marginTop: "20px",
    display: "block",
    maxWidth: "80%",
    maxHeight: "80%",
  },

  method: {
    margin: "40px",
  },
});

const Recipe = (props) => {
  let { recipeId } = useParams();

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [formData, setFormData] = useState({});

  const { classes } = props;

  useEffect(() => {
    http
      .post(
        `${BASE_URL}get`,
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

  const output = (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img
              className={classes.img}
              alt="complex"
              src="https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg"
            />
          </ButtonBase>
          {/* <Box
              sx={{
                width: 200,
                display: 'flex',
                alignItems:'center',
              }}
              >
                <Rating
                className='hover-feedback'
                value={value}
                precision={0.5}
                onChange={(event, vewValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHower) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity:0.5 }} fontSize='inherit' />}
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </Box> */}
          <p>Recipe id: {recipeId}</p>
          <h3>Ingredients:</h3>
          <ul>
            {String(formData.ingredients)
              .split("\n")
              .map((ingredient) => {
                return <li>{ingredient}</li>;
              })}
          </ul>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <p>Recipe id: {recipeId}</p>
              <h3>Method:</h3>
              <ol className="method">
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years{" "}
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical making it over 2000
                  years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Loimply random text. It has roots
                  in a piece of classical Latin literature from 45 BC, making it
                  over 2000 years old. Richard McClintock, a Latin professor at
                  Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has ure from 45 BC, making it over 2000 years old.
                  Richard McClintock, a Latin professor at Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney
                </li>
                <li>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney
                </li>
              </ol>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  const simpleOutput = (
    <>
      <h1>Recipe</h1>
      {!formData?.isError ? (
        <Link to={`/add_recipe/${recipeId}`}>Edit Recipe #{recipeId}</Link>
      ) : (
        <></>
      )}
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

  return output; // or output or simpleOutput
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Recipe);
