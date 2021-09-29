import React, { useState, useEffect } from "react";
import "./Recipe.css";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  ButtonBase,
  Paper,
  List,
  ListItemText,
  Chip,
} from "@material-ui/core/";
// import { Box, Rating, StarIcon } from '@mui/material/';
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import http from "../../helpers/http-common";
import { CDN_URL, API_URL, DEFAULT_IMAGE_NAME } from "../../config";
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
    width: "100%",
    height: "auto",
  },
  image: {
    width: "300px",
    height: "300px",
  },
  img: {
    marginTop: "20px",
    // display: "block",
    maxWidth: "250px !important",
    maxHeight: "250px",
    width: "250px",
  },

  method: {
    textAlign: "left",
  },
  titleMethod: {
    textAlign: "left",
  },
  titleIngr: {
    textAlign: "left",
    marginLeft: "30px",
  },

  Ingredients: {
    font: "20px !important",
    textAlign: "left",
    marginLeft: "30px",
  },
  MuiTypography: {
    font: "20px !important",
  },
});

const Recipe = (props) => {
  let { recipeId } = useParams();

  // const [value, setValue] = React.useState(2);
  // const [hover, setHover] = React.useState(-1);
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
              alt={`Recipe Id ${formData.recipeId}`}
              src={`${CDN_URL}/${formData.imageName || DEFAULT_IMAGE_NAME}`}
            />
          </ButtonBase>
          
          <Typography variant="body2">
            Recipe id: {formData.id} created by @{formData.username}
          </Typography>
          <Typography className={classes.time} variant="h7">
            Preparation time: {formData.prepTime}
          </Typography><br/>
          <Typography className={classes.time} variant="h7">
            Cooking time: {formData.cookTime}
          </Typography>
          <Typography className={classes.titleIngr} variant="h4">
            Ingredients:
          </Typography>
          <List dense={true}>
            {String(formData.ingredients)
              .split("\n")
              .map((ingredient, index) => {
                return (
                  <ListItemText className={classes.Ingredients} key={index}>
                    {ingredient}
                  </ListItemText>
                );
              })}
          </List>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h1">{formData.recipeTitle}</Typography>
              {String(formData.tags)
                .split(" ")
                .map((tag, index) => {
                  // https://mui.com/components/chips/
                  return <Chip key={index} label={tag} variant="outlined" />;
                })}
              <Typography className={classes.titleMethod} variant="h4">
                Method:
              </Typography>
              <ol className="method">
                {String(formData.method)
                  .split("\n")
                  .map((methodPart, index) => {
                    if (methodPart)
                      return (
                        <li className={classes.method} key={index}>
                          {methodPart}
                        </li>
                      );
                    else return <br />;
                  })}
              </ol>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  const simpleOutput = (
    <>
      <Typography variant="h1">Recipe</Typography>
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
