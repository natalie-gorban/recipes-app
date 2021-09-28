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
          <Typography variant="body2">Recipe id: {formData.id} created by @{formData.username}</Typography>
          <Typography variant="h5">Ingredients</Typography>
          <List dense={true}>
            {String(formData.ingredients)
              .split("\n")
              .map((ingredient, index) => {
                return <ListItemText key={index}>{ingredient}</ListItemText>;
              })}
          </List>
          <Typography variant="h5">
            Preparation time: {formData.prepTime}
          </Typography>
          <Typography variant="h5">
            Cooking time: {formData.cookTime}
          </Typography>
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h1">{formData.recipeTitle}</Typography>
              <Typography variant="h4">Description</Typography>
              <List dense={true}>
                {String(formData.description)
                  .split("\n")
                  .map((descriptionPart, index) => {
                    return (
                      <ListItemText key={index}>{descriptionPart}</ListItemText>
                    );
                  })}
              </List>

              <Typography variant="h4">Method</Typography>
              <ol className="method">
                {String(formData.method)
                  .split("\n")
                  .map((methodPart, index) => {
                    return <li key={index}>{methodPart}</li>;
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
