import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LogInForm/LogInForm';
import NavBar from '../../components/NavBar/NavBar';
import { useState } from 'react';

function AuthPage({setUser}) {
  const [showSignUp, setShowSignUp] = useState(false);
    return (
     <div>
      <NavBar/>
      <div className="container">
      <button  onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'LOG IN' : 'SIGN UP'}</button>
      </div>
      { showSignUp ?
          <SignUpForm setUser={setUser} />
          :
          <LoginForm setUser={setUser} />
      }
     </div>
);
}

export default AuthPage;