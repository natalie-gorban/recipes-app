export const styles = (theme) => ({
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
    width: 1000,
    height: 800,
    // maxWidth: 1000,
  },
  // box: {
  //   width: "400px !important",
  // },
  image: {
    width: 300,
    height: 300,
  },
  img: {
    marginTop: "10px",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },

  time: {
    width: "80px",
    margin: "50px 20px",
    fontSize: "3mm",
  },

  title: {
    width: "500px",
    margin: "10px",
  },

  tags: {
    width: "500px",
    marginTop: "10px !important",
    height: "100px",
  },

  ingredients: {
    width: "500px",
    // margin: '10px !important',
    height: "100px",
  },

  method: {
    width: "500px",
    marginTop: "60px !important",
  },
  button: {
    textAlign: "left !important",
  },

  save: {
    width: "90px",
    backgroundColor: "orange",
    margin: "10px",
  },

  private: {
    margin: "5px",
  },
});
