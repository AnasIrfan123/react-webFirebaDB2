import './login.css'
import { login } from '../../config/firebase';
// import Error from '../../components/Error';
// import Error from '../../components/Error';
// import useError from '../../components/Error';
import Error from '../../components/Error';

import { FaEnvelopesBulk } from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const navigate = useNavigate()

  const UserLoggedIn = async () => {

    if (!email || !password) {
      // setError('please fill in all input fields')
      setError('please fill out the fileed')
      return;
    }
// ye idhr sy fireb k andr ja rha ha 1st onchange sy value lega phir states k through try catch me email or pass phir udhr fire.js me ja kar save hoga or phir navigate ho jyaega

    try {
     await login({email, password})
      navigate('/dashboard')
      
    } catch (e) {
      alert(e.message)
      console.log('e ==>', e.message);
      // showError(e.message)
    }

    console.log('email:', email);
    console.log('password:', password);
  }

    return (
      // <div className="mainlogin">

      <div className='loginbody'>

        <div className='logincontent'>

          <div className="loginHeader">Sign In</div>

          <div>

            <div className='loginfield'>
              <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
              <span><FaEnvelopesBulk /></span>
            </div>

            <div className='loginfield'>
              <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
              <span><FaUnlockAlt /></span>
            </div>

            <div className="err">
                  {/* {Error }                 err msg idhr he hona chaye sub jga or setTimoeut sy remove krdo 2 sec k bad */}
                  <Error errorMessage={error} />
            </div>

            <div class="forgot-pass">
              <span onClick={() => navigate('/forgotPassword')}>Forgot Password?</span>
              </div>

            <button className='loginBtn' onClick={UserLoggedIn}>Login</button>

            <div class="signup">Don't have an account?
                  <span onClick={() => navigate('/register')}> Sign-up</span>
             </div>

          </div>

        </div>

      </div>
      
      // </div>
    )
}

export default Login;


