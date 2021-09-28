import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout } from "../../actions/auth";
import { withRouter } from "react-router-dom";
import { setSearchText } from "../../actions/search";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);

    this.props.setSearchText(this.props.location.state?.searchText || ""); // initialize 'searchText' after redirection to '/'
  }

  logOut() {
    this.props.logout();
  }

  onChangeSearch(e) {
    e.preventDefault();
    this.props.setSearchText(e.target.value);
  }

  onSubmitSearch(e) {
    e.preventDefault();
    const { history, searchText } = this.props;
    if (window.location.pathname !== "/") {
      history.push({ pathname: "/", state: { searchText } }); // this way we send 'searchText' state to '/' path when user clicks 'Search'
      window.location.reload();
    }
  }

  render() {
    const { user: currentUser, searchText, classes } = this.props;
    return (
      <header className="fixed-top d-block">
        <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand className={classes.logo} href="/">
            Recipes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className={`me-auto mb-3 mb-lg-0 p-2 ${classes.p2}`}
              style={{ maxHeight: "100px", marginLeft: "20px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/add_recipe">Add Recipe</Nav.Link>
              <NavDropdown title="DropDown" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/recipe/1">Recipe 1</NavDropdown.Item>
                <NavDropdown.Item href="/recipe/2">Recipe 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/recipe/3">Recipe 3</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled></Nav.Link>
            </Nav>

            <Nav
              className={`mb-3 mb-lg-0 p-2 ${classes.p2}`}
              style={{ maxHeight: "50px" }}
              navbarScroll
            >
              <Form className={`d-flex p-2 ${classes.p2}`}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchText}
                  onChange={this.onChangeSearch}
                />
                <Button
                  variant="outline-success"
                  onClick={this.onSubmitSearch}
                  type="submit"
                >
                  Search
                </Button>
              </Form>

              {!currentUser ? (
                <>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/login" onClick={this.logOut}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { searchText } = state.search;
  return {
    user,
    searchText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchText: (searchText) => dispatch(setSearchText(searchText)),
    logout: () => dispatch(logout()),
  };
}

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AppHeader);
