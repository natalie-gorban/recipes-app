import React from 'react';
import './NewDummyRecipe.css'
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { TextInput } from "react-native";

import { addDummyRecipe } from "../../actions/recipe";
import { ImageService } from "../../services/image.service"
import { connect } from "react-redux";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class NewDummyRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewDummyRecipe = this.handleNewDummyRecipe.bind(this);
    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeRecipeBody = this.onChangeRecipeBody.bind(this);
    this.onChangeSelectFile = this.onChangeSelectFile.bind(this)

    this.state = {
      recipeName: "",
      recipeBody: "",
      currentFile: undefined,
      selectedFile: undefined,
      loading: false,
    };
  }

  onChangeRecipeName(e) {
    this.setState({
      recipeName: e.target.value,
    });
  }

  onChangeRecipeBody(e) {
    this.setState({
      recipeBody: e.target.value,
    });
  }

  handleNewDummyRecipe(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(addDummyRecipe(this.state.recipeName, this.state.recipeBody))
        .then(() => {
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { user: currentUser, message, recipeName, recipeBody} = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="col-md-12">
        <h1>NewDummyRecipe</h1>
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleNewDummyRecipe}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="recipeName">recipeName</label>
              <Input
                type="text"
                className="form-control"
                name="recipeName"
                value={this.state.recipeName}
                onChange={this.onChangeRecipeName}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="recipeBody">RecipeBody</label>
              <Input
                type="text"
                className="form-control"
                name="recipeBody"
                value={this.state.recipeBody}
                onChange={this.onChangeRecipeBody}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>New Dummy Recipe</span>
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="recipeBody">RecipeBody</label>
              <Input
                type="text"
                className="form-control"
                name="recipeBody"
                value={this.state.recipeBody}
                onChange={this.onChangeRecipeBody}
                validations={[required]}
              />
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { message } = state.message;
  const recipeName = state.recipeName;
  const recipeBody = state.recipeBody;
  return {
    message,
    user,
    recipeName,
    recipeBody
  };
}

export default connect(mapStateToProps)(NewDummyRecipe);
