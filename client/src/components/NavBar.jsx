import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth-services';
import Swal from 'sweetalert2'

function NavBar() {
  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem('user'))
  const handleLogOut=(e)=>{
    e.preventDefault()
    Swal.fire({
      icon:'success',
      text:'Logged Out'
    }).then(()=>{
      authService.logOut()
      navigate('/')
    })
  }

  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark">
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Container>
          <Navbar.Collapse>
          <Navbar.Brand href="/">Personal Budget App📈</Navbar.Brand>
          
          <Nav className="me-auto">
           {user? <Nav.Link href="/home">Home</Nav.Link>: <Nav.Link href='/register'>Register</Nav.Link>}
           {!user &&  <Nav.Link href='/login'>Login</Nav.Link>}
            { user &&<Nav.Link onClick={handleLogOut} href="#features">Log out</Nav.Link>}
          </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      
    </>
  );
}

export default NavBar;