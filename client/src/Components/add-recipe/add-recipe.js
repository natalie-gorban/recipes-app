import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UploadFile from "../upload-file/upload-file";
import { addRecipe } from "../../actions/recipe";
import { styles } from "./styles";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        prepTime: "",
        cookTime: "",
        recipeTitle: "",
        tags: "",
        ingredients: "",
        method: "",
        privateRecipe: true,
      },
    };

    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  onChangeHandle = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  save = (e) => {
    e.preventDefault();
    const { imageName, dispatch } = this.props;
    const { formData } = this.state;
    dispatch(addRecipe(formData, imageName));
  };

  cancel = (e) => {
    e.preventDefault();
    this.setState({
      value: e,
    });
  };

  render() {
    const { classes, user: currentUser, recipeId } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    if (recipeId) {
      return <Redirect to={`/recipe/${recipeId}`} />;
    }

    return (
      <form className={classes.root} onSubmit={this.save}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container direction="row" spacing={2}>
                <ButtonBase className={classes.image}>
                  <UploadFile className={classes.img} />
                </ButtonBase>
              </Grid>
              <Grid item xs container direction="row" spacing={2}>
                <TextField
                  name="prepTime"
                  label="Prep time"
                  variant="outlined"
                  className={classes.time}
                  value={this.state.formData.prepTime}
                  onChange={this.onChangeHandle}
                />
                <TextField
                  name="cookTime"
                  label="Cook time"
                  variant="outlined"
                  className={classes.time}
                  value={this.state.formData.cookTime}
                  onChange={this.onChangeHandle}
                />
              </Grid>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <TextField
                    name="recipeTitle"
                    label="Recipe Title"
                    multiline
                    rows={1}
                    variant="outlined"
                    className={classes.title}
                    value={this.state.formData.recipeTitle}
                    onChange={this.onChangeHandle}
                  />
                  <TextField
                    name="tags"
                    label="Tags"
                    multiline
                    rows={2}
                    variant="outlined"
                    className={classes.tags}
                    value={this.state.formData.tags}
                    onChange={this.onChangeHandle}
                  />
                  <TextField
                    name="ingredients"
                    label="Ingredients"
                    multiline
                    rows={6}
                    variant="outlined"
                    className={classes.ingredients}
                    value={this.state.formData.ingredients}
                    onChange={this.onChangeHandle}
                  />
                  <TextField
                    name="method"
                    label="Method"
                    multiline
                    rows={8}
                    variant="outlined"
                    className={classes.method}
                    value={this.state.formData.method}
                    onChange={this.onChangeHandle}
                  />

                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="privateRecipe"
                          checked={this.state.formData.privateRecipe}
                          onChange={this.onChangeHandle}
                        />
                      }
                      label="Private Recipe"
                      className={classes.private}
                    />
                  </FormGroup>
                  <Button className={classes.save} type="submit">
                    Save
                  </Button>
                  <Button onClick={this.cancel} className={classes.cancel}>
                    Cancel
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { message } = state.message;
  const { imageName, imageUrl } = state.uploadFile;
  const { recipeId } = state.recipe;
  const outputState = {
    imageName,
    imageUrl,
    user,
    recipeId,
    message,
  };
  return outputState;
}

export default compose(withStyles(styles), connect(mapStateToProps))(AddRecipe);
