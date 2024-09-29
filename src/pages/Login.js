import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified === false) {
            setError("Email not verified!")
            alert("Email not verified! Check your mailbox for a verification email.")
            return;
          }
          dispatch({type:"LOGIN", payload:user})
          navigate("/home")
        })
        .catch((error) => {
          setError("Wrong credentials!");
          console.log(error.code, error.message)
        });
    }

    const handleReset = (e) => {
        e.preventDefault()
        navigate("/reset")
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/signup")
    }

    const handleResendMail = (e) => {
        e.preventDefault()
        navigate("/resend")
    }

    return(
        <>
            <div>
                <form 
                    onSubmit={handleLogin}>
                    <h5>Login</h5>
                    <input
                        type="email"
                        placeholder="Enter e-mail"
                        onChange={(e) => {setEmail(e.target.value); setError(null)}}
                        required />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value); setError(null)}}
                        required />
                    <span 
                        style={{cursor: "pointer", font: "small-caption"}} 
                        onClick={(e) => handleReset(e)} >
                        Forgot password?
                    </span>
                    <button 
                    type="submit" >
                        Log in</button>
                    <span className='text-danger mx-auto'>{error}</span>
                    <div>
                        Don't have an account? 
                        <span
                            onClick={(e) => {handleClick(e)} }
                            style={{cursor: "pointer"}} >
                            <br />
                            Sign Up
                        </span>
                    </div>
                    <div style={{font: "small-caption"}}>
                        <span
                            onClick={(e) => {handleResendMail(e)}}
                            style={{cursor: "pointer", color: 'blue'}} >
                        Click here 
                        </span>
                        to resend verification email
                    </div>
                </form>
            </div>
        </>
    )
}
 
export default Login