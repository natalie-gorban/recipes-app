import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
import { StylesContext } from '@material-ui/styles';
// import { TextInput, View } from 'react-native'
import { TextField, Grid, Paper, Typography, ButtonBase } from '@material-ui/core';
import { compose } from 'redux'
import { connect } from 'react-redux'


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
      value: "Placeholder"
    }

    this.onChangeTextHandle = this.onChangeTextHandle.bind(this)
  }

  onChangeTextHandle = (e) => {
    this.setState({
      value: e
    })
  }

  render() {
    const {classes} = this.props
    return (
      <form className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
              </ButtonBase>

              <div >
                <label>
                  <input className={classes.time} type="text" name="name" placeholder='Prep time'/>
                  <input className={classes.time} type="text" name="name" placeholder='Cook time'/>
                </label>
              </div>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">                  </Typography>

                    <div className='form'>
                      <label>
                        <TextField
                          id="outlined-multiline-static"
                          label="Recipe Title"
                          multiline
                          rows={1}
                          variant="outlined"
                          className={classes.title}
                        />
                      </label>
                      <label>
                        <TextField
                          id="outlined-multiline-static"
                          label="Description"
                          multiline
                          rows={2}
                          variant="outlined"
                          className={classes.description}
                        />
                      </label>
                      <label>
                        <TextField
                          id="outlined-multiline-static"
                          label="Ingredients"
                          multiline
                          rows={6}
                          variant="outlined"
                          className={classes.ingredients}
                        />
                      </label>
                      <label>
                        <TextField
                          id="outlined-multiline-static"
                          label="Method"
                          multiline
                          rows={8}
                          variant="outlined"
                          className={classes.method}
                        />
                      </label>

                    </div>
                    <div className='button'>
                    <label>
                      <input
                        name="private"
                        type="checkbox"
                        className={classes.private}/>
                        Private Recipe
                      </label><br />

                      <button onclick="save()" className={classes.save}>
                        Save
                      </button>
                      <button onclick="cansel()" className={classes.cansel}>
                        Cansel
                      </button>
                    </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );

  }
}


function mapStateToProps(state) {
  const value  = state.value
  return (
    value
  )
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AddRecipe);
