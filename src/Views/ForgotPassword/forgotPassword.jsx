import { useNavigate } from 'react-router-dom';

import './forgotPassword.css'
import { forgotPasword } from '../../config/firebase';
import Error from '../../components/Error';

import { MdMarkEmailRead } from "react-icons/md";
import { useState } from 'react';

function ForgotPassword() {

    const [email, setemail] = useState()
    const [error, setError] = useState()    // error state

    const navigate = useNavigate()

    const ForgotPasswd = async () => {

        if (!email) {
            setError('please insert your registered email')
            return //agr me return nh lgata tw ye false par !email par bh alert k bad console chlata (return lgane sy ye false condit par function sy bhar nikl gya)
        }
 
       try {

       await forgotPasword({email})

       } catch (e) {
        alert(e.message)
       }

        console.log('email:', email);
    }

    return (
        <div>

            <div className="forgotbody">

                <div className="forgotcontent">

                    <div className="forgotHeader">Forgot Password</div>

  <div className="err">
    <Error errorMessage={error}/>
  </div>
                    
                    <div>

                        <div className='forgotfield'>
                            <p className='forgot-INSTRUC '>
                             We just need your registered Email id to sent your password reset instruction
                            </p>
                        </div>

                        <div className="forgotfield">
                            <input type="text" placeholder='Enter your Email' onChange={(e) => setemail(e.target.value)}/>
                            <span><MdMarkEmailRead /></span>
                        </div>

                        <button className='forgotBtn' onClick={ForgotPasswd}>RESET PASSWORD</button>

                        <div className='forgot-back'>
                            <span onClick={() => navigate(-1)}>Back</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ForgotPassword;
