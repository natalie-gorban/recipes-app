import React from 'react';
import {
  withStyles
} from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import UploadFile from '../upload-file/upload-file'


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
    margin: theme.spacing(1),
    // width: '50ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: '20px',
    width: 1000,
    height: 800,
    // maxWidth: 1000,
  },
  image: {
    width: 300,
    height: 300,
  },
  img: {
    marginTop: '10px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  time: {
    width: '80px',
    margin: '50px 20px',
    fontSize: '3mm',
  },

  title: {
    width: '500px',
    margin: '10px',
  },

  description: {
    width: '500px',
    marginTop: '10px !important',
    height: '100px',
  },

  ingredients: {
    width: '500px',
    margin: '10px 10px  !important',
    height: '100px',
  },

  method: {
    width: '500px',
    margin: '60px !important',

  },
  button: {
    textAlign: 'left !important',
  },

  save: {
    width: '90px',
    backgroundColor: 'orange',
    margin: '10px'
  },

  private: {
    margin: '20px',
  }
})


class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        prepTime: '',
        cookTime: '',
        recipeTitle: '',
        description: '',
        ingredients: '',
        method: '',
        privateRecipe: true,
      }
    }

    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  onChangeHandle = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    });
  }

  save = (e) => {
    e.preventDefault();
    console.log('save', e)
    const {
      imageName,
      imageUrl,
    } = this.props
    const {
      formData
    } = this.state
    console.log('formData: ', formData, imageName, imageUrl)
  }

  cancel = (e) => {
    e.preventDefault();
    this.setState({
      value: e
    })
  }

  render() {
    const {
      classes,
      user: currentUser,
    } = this.props

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <form className={classes.root} onSubmit={this.save}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs container direction="row" spacing={2}>
                <ButtonBase className={classes.image}>
                  <UploadFile
                    className={classes.img}
                  />
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
                    name="description"
                    label="Description"
                    multiline
                    rows={2}
                    variant="outlined"
                    className={classes.description}
                    value={this.state.formData.description}
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
                      control={<Checkbox
                        name='privateRecipe'
                        checked={this.state.formData.privateRecipe}
                        onChange={this.onChangeHandle}
                      />}
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
  const { user } = state.auth
  const { imageName, imageUrl } = state.uploadFile
  const {
    formData
  } = state
  return (
    {
      imageName,
      imageUrl,
      user,
      formData
    }
  )
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AddRecipe);
