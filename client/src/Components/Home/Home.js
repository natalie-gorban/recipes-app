import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  IconButton,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { CDN_URL, DEFAULT_IMAGE_NAME } from "../../config";
import { getAllRecipes } from "../../actions/recipe";
import { styles } from "./styles";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAllRecipes());
  }

  render() {
    const { classes, recipes, searchText } = this.props;
    const filterRecipes = recipes.filter((recipe) => {
      return recipe.recipeTitle
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    return (
      <div className={classes.root}>
        <ImageList rowHeight={250} className={classes.imageList} gap={10}>
          <ImageListItem key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader className={classes.listSubheader} component="div">
              <Typography variant="h1">
                {searchText === ""
                  ? "All recipes"
                  : `Search results for "${searchText}"`}
              </Typography>
            </ListSubheader>
          </ImageListItem>

          {filterRecipes.map((item) => (
            <ImageListItem
              key={item.recipeId}
              className={classes.imageListItem}
              component={RouterLink}
              to={`/recipe/${item.recipeId}`}
            >
              <img
                src={`${CDN_URL}/${item.imageName || DEFAULT_IMAGE_NAME}`}
                alt={item.recipeTitle}
                loading="lazy"
              />

              <ImageListItemBar
                title={item.recipeTitle}
                subtitle={<span>by: {item.username}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${item.recipeTitle}`}
                    className={classes.icon}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { searchText } = state.search;
  const { recipes } = state.recipe;
  return {
    user,
    searchText,
    recipes,
  };
}

export default compose(withStyles(styles), connect(mapStateToProps))(Home);
