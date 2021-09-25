import React from 'react';
import './AppHeader.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { logout } from "../../actions/auth";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;
    return (
      <header className='fixed-top d-block'>
        <Navbar variant='dark' bg='dark' expand='lg'>
          <Navbar.Brand className='logo' href='/'>Recipes</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'/>
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto mb-3 mb-lg-0 p-2'
              style={{ maxHeight: '100px', marginLeft:'20px' }}
              navbarScroll
            >
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/search_ingredient'>Search by Ingredient</Nav.Link>
              <Nav.Link href='/search_results/public'>All recipes</Nav.Link>
              <Nav.Link href='/add_recipe'>Add Recipe</Nav.Link>
              <Nav.Link href='/search_ingredient'>Search by Ingredient</Nav.Link>
              <NavDropdown title='DropDown' id='navbarScrollingDropdown'>
                <NavDropdown.Item href='/recipe/1'>Recipe 1</NavDropdown.Item>
                <NavDropdown.Item href='/recipe/2'>Recipe 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/recipe/3'>Recipe 3</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href='#' disabled></Nav.Link>
            </Nav>

            <Form className='d-flex p-2'>
              <FormControl
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
              />
              <Button variant='outline-success'>Search</Button>

            <Nav
              className='mb-3 mb-lg-0 p-2'
              style={{ maxHeight: '50px' }}
              navbarScroll
            >
              {
                !currentUser ?
                  <>
                    <Nav.Link href='/signup'>Signup</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>
                  </>
                :
                  <>
                    <Nav.Link href='/profile'>Profile</Nav.Link>
                    <Nav.Link href='/' onClick={this.logOut}>Logout</Nav.Link>
                  </>

              }
            </Nav>

            </Form>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(AppHeader);
