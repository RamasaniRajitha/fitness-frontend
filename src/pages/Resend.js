import { useState } from "react"
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Resend = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleResend = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified === true) {
                setError("Email already verified!")
                return;
            }
            sendEmailVerification(user).then(() => {
                alert("Verification email sent! Check your mailbox!")
                navigate("/login")
            })
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                setError('Invalid email address!');
            } else if (error.code === 'auth/user-not-found') {
                setError('User not found!');
            } else if (error.code === 'auth/invalid-credential') {
                setError('Wrong credentials!');
            } else {
                setError(error.code);
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/login")
    }

    return (
        <div>
            <div >
                <form 
                    onSubmit={handleResend}>
                    <h5>Resend Verification Email</h5>
                    <input
                        type="email"
                        placeholder="Enter e-mail"
                        onChange={(e) => {setEmail(e.target.value); setError(null)}}
                        required />
                    <input
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => {setPassword(e.target.value); setError(null)}}
                        required />
                    <button 
                        type="submit">
                        Submit
                    </button>
                    <span>{error}</span>
                    <div>
                        Back to
                        <span 
                            onClick={(e) => {handleClick(e)} }
                            style={{cursor: "pointer"}} >
                        Login
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}
  
export default Resend