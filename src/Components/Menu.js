
import { Navbar,NavDropdown,NavItem, Container, Nav } from 'react-bootstrap';
import classes from './Menu.module.css'

const Menu = () =>{
    return (      
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/" className = {classes.brand}>Thinking BreakThrough Ideas</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    {/* <Nav className="me-auto">
      <Nav.Link  href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav> */}
    <Nav className = "ml-auto">
      <h5 className = {classes.username}>Welcome User<i className ={`${classes.user} fa fa-user`}></i></h5>
      {/* <Nav.Link  href="#memes">
      <h4 className = {classes.kk}>Dank memes</h4>
      </Nav.Link> */}
      
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

    )
}
export default Menu