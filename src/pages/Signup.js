import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';

const Signup = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            setError("Passwords don't match!")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user).then(() => {
                alert("Verification email sent! Check your mailbox!");
                navigate("/login")
            })
        })
        .catch((error) => {
          console.log(error.message)
          if (error.code === 'auth/email-already-in-use') {
            setError('Email address taken');
          } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address');
          } else if (error.code === 'auth/weak-password') {
            setError('Password should at least be 6 characters');
          } else {
            setError(error.code);
          }
        });
    }

    const handleClick = () => {
        navigate("/login")
    }

    return(
        <>
            <div>
                <form 
                onSubmit={handleSignup} >
                    <h5>Sign Up</h5>
                    <input
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => {setEmail(e.target.value); setError(null)}}
                        required />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value); setError(null)}}
                        required />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => {setPasswordCheck(e.target.value); setError(null)}}
                        required />
                    <button 
                        type="submit" >
                        Sign Up</button>
                    {error && <span>{error}</span>}
                    <div>
                        Already have an account? 
                        <span
                            onClick={(e) => {handleClick()} }
                            style={{cursor: "pointer"}} >
                        Login
                        </span>
                    </div>
                </form>
            </div>
        </>
    )
}
 
export default Signup