import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import classes from './Menu.module.css'
import logo from '../Images/nagarro_logo.svg'
import { useHistory } from 'react-router';
const Menu = () => {
  var a = localStorage.getItem('name');
  var b = JSON.parse(a);
  var c = localStorage.getItem('email');
  var d = JSON.parse(c);
  var history = useHistory();
  const logOutHandler = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email')
    history.push('/login')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className={classes.navbar}>
      <Container>
        <Navbar.Brand className={classes.brand}><img src={logo} alt='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title={<span className={classes.name}>Welcome {b}</span>}
              id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={logOutHandler}>LogOut</NavDropdown.Item>
              <NavDropdown.Item onClick={() => { history.push('/dashboard') }}>Dashboard</NavDropdown.Item>
              <NavDropdown.Item onClick={() => { history.push('/myideas/' + d) }}>My Ideas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}
export default Menu