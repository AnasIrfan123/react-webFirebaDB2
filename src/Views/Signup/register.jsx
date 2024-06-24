import './register.css';
import { register } from '../../config/firebase';
import Error from '../../components/Error';

import { HiMiniUserGroup } from "react-icons/hi2";
import { BsEnvelopePlusFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signup() {

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpass, setConfirmpass] = useState('')
  const [age, setAge] = useState('')
  const [phoneNumb, setPhoneNumb] = useState('')

  const [error, setError] = useState()

  const navigate = useNavigate()

  const UserRegistered = async () => {

    if (!fullname || !email || !password || !confirmpass || !phoneNumb || !age) {
      setError('please fill out the proper all input fields')
      return
    }

    if (fullname.length <= 3) {             
      setError('at-least 4 characters are accepted')
      return
    }

    if (password !== confirmpass) {
      setError('password is not matchable with confirm password')
      return
    }

    if (age <= 10 || age > 110) {
      setError(`you age is ${age} atleast 10 years is allowed`)
      return
    }

    if (phoneNumb.length < 11 || phoneNumb.length > 11) {
      setError('please enter valid phone number')
      return
    }

    console.log('fullName:', fullname);
    console.log('email:', email);
    console.log('password:', password);
    console.log('confirmpass:', confirmpass);
    console.log('age:', age);
    console.log('phoneNumb:', phoneNumb);

    try {
     await register({fullname, email, password, age, phoneNumb})
      navigate('/')
      
    } catch (error) {
      console.log("error", error);
      alert(error)            
    }

    setFullname('')  //after fill the form all fields empty
    setEmail('')
    setPassword('')
    setConfirmpass('')
    setAge('')
    setPhoneNumb('')

  } 

    return (
        <div className='signupbody'>

             <div className="signupcontent">

              <div className="signupHeader">Sign Up</div>

              <div>
                 
                 <div className="signupfield">
                   <input type="text" placeholder='Enter your Full-Name' onChange={(e) => setFullname(e.target.value)} value={fullname} />
                   <span><HiMiniUserGroup /></span>
                 </div>

                 <div className="signupfield">
                   <input type="text" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                   <span><BsEnvelopePlusFill /></span>
                 </div>

                 <div className="signupfield">
                   <input type="password" placeholder='Enter Strong Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                   <span><FaLock /></span>
                 </div>

                 <div className="signupfield">
                   <input type="password" placeholder='Enter Confirm-Password' onChange={(e) => setConfirmpass(e.target.value)} value={confirmpass} />
                   <span><FaLock /></span>
                 </div>

                 <div className="signupfield">
                   <input type="number" placeholder='Enter Your Age' onChange={(e) => setAge(e.target.value)} value={age} />
                   <span><ImListNumbered /></span>
                 </div>

                 <div className="signupfield">
                   <input type="number" placeholder='Enter your Phone-Number' onChange={(e) => setPhoneNumb(e.target.value)} value={phoneNumb}/>
                   <span><FaPhoneAlt /></span>
                 </div>

                 <div className='err'>
                     <Error errorMessage={error} />
                 </div>

                 <div class="Sforgot-pass"><a href="#">Forgot Password?</a></div>

                 <button className='signupBtn'
                 onClick={UserRegistered} >Register</button>

                 <div class="signin">Already have an account? 
                     <span onClick={() => navigate('/')}> Sign-in</span>
                </div>

              </div>

             </div>

        </div>
    )
}

export default Signup;
