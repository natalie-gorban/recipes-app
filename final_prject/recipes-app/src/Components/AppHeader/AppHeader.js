import React from 'react';
import './AppHeader.css'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class AppHeader extends React.Component {
  render() {
    return (
      <Navbar className='navbar-nav' variant='dark' bg='dark' expand='lg' sticky='top'>
        <Navbar.Brand href='#' className='navbar-brand'>Recipes</Navbar.Brand>

        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
     <Nav
      className='mr-auto my-2 my-lg-0'
      style={{ maxHeight: '100px' }}
      navbarScroll
    >
      <Nav.Link href='#action1'>Home</Nav.Link>
      <Nav.Link href='#action2'>Link</Nav.Link>
      <NavDropdown title='Link' id='navbarScrollingDropdown'>
        <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
        <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href='#' disabled>
      </Nav.Link>
    </Nav>
    <Form className='d-flex'>
      <FormControl
        type='search'
        placeholder='Search'
        className='mr-2'
        aria-label='Search'
      />
      <Button variant='outline-success'>Search</Button>
    </Form>
  </Navbar.Collapse>
  </Navbar>




      //  <>
      //   <Navbar id='header' className='fixed-top'>

      //     <nav className='navbar navbar-expand-lg navbar-dark' style='background-color: coral;' >

      //       <div className='container'>
      //         <a href='#' className='navbar-brand'>Recipes</a>

      //         <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navContent'
      //         aria-controls='navContent' aria-expanded='false' aria-label='Toggle navigation'>
      //           <span className='navbar-toggler-icon'></span>
      //         </button>
      //           <div className='collapse navbar-collapse' id='navContent'>
      //             <ul className='navbar-nav me-auto mb-3 mb-lg-0'>
      //               <li className='nav-item'>
      //                 <a href='#' className='nav-link'>Home</a>
      //               </li>
      //               <li className='nav-item'>
      //                 <a href='#' className='nav-link'>Home2</a>
      //               </li>
      //               <li className='nav-item'>
      //                 <a href='#' className='nav-link'>Home3</a>
      //               </li>
      //               <li className='nav-item'>
      //                 <a href='#' className='nav-link'>Home4</a>
      //               </li>
      //               <li className='nav-item dropdown'>
      //                 <a href='#' className='nav-link dropdown-toggle' id='button' data-bs-toggle='dropdown' aria-expanded='false'>Dropdown</a>
      //                 <ul className='dropdown-menu' aria-labelledby='navDrop'>
      //                   <li><a href='' className='dropdown-item'>Drop</a></li>
      //                   <li><a href='' className='dropdown-item'>Drop</a></li>
      //                   <li><a href='' className='dropdown-item'>Drop</a></li>
      //                   <li><a href='' className='dropdown-item'>Drop</a></li>
      //                 </ul>
      //                 <li className='nav-item signUp'>
      //                   <a href='#' className='nav-link'>Sign up/</a>
      //                 </li>
      //                 <li className='nav-item login'>
      //                   <a href='#' className='nav-link'>Login</a>
      //                 </li>
      //               </li>
      //             </ul>

      //             <form action='#' className='d-flex'>
      //               <input type='search' placeholder='Search' className='form-control me-2' />
      //               <button type='submit' className='btn-outline-dark'>Search</button>
      //             </form>

      //           </div>
      //       </div>
      //     </nav>
      //   </Navbar>
      // </div>
    )
  }
}


export default AppHeader;
