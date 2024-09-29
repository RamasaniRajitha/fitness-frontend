import { useState } from "react"
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const ForgotPwd = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')

    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent! Check your mailbox!")
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                setError('Invalid email address!');
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
            <div>
                <form 
                    onSubmit={handleReset}>
                    <h5>Forgot Password</h5>
                    <input
                        type="email"
                        placeholder="Enter e-mail"
                        onChange={(e) => {setEmail(e.target.value); setError(null)}}
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

export default ForgotPwd