import React from 'react';
import './AppHeader.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class AppHeader extends React.Component {
  render() {
    return (
      <header className='fixed-top d-block'>
        <Navbar variant='dark' bg='dark' expand='lg'>
          <Navbar.Brand href='/'>Recipes</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll'/>
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto mb-3 mb-lg-0 p-2'
              style={{ maxHeight: '100px', marginLeft:'20px' }}
              navbarScroll
            >
              <Nav.Link href='/'>Home</Nav.Link>

              <NavDropdown title='DropDown' id='navbarScrollingDropdown'>
                <NavDropdown.Item href='/action3'>Action</NavDropdown.Item>
                <NavDropdown.Item href='/action4'>Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/action5'>Something else here</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href='/add_recipe'>Add Recipe</Nav.Link>
              <Nav.Link href='/search_ingredient'>Search by Ingredient</Nav.Link>
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
              <Nav.Link href='/signup'>Signup</Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href='/login'>Login</Nav.Link>
            </Nav>

            </Form>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}


export default AppHeader;
