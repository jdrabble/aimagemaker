import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import logo from "../../images/openai-white-logomark.png";

export default function NavBar({user, setUser}) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <img id="logo" src={logo} alt="" />&nbsp;AI.mage Maker
      { user ? <>
      &nbsp; | &nbsp;
      <Link to="/">Make Image</Link>
      &nbsp; | &nbsp;
      <Link to="/images">Your Images</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      </> : "" }
    </nav>
  );
}