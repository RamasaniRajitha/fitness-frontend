import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext } from "react";

const Page404 = () => {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate(); 
  
    const handleClick = (e) => {
        e.preventDefault();
        if (currentUser) {
            navigate("/home");
        } else {
            navigate("/");
        }
    }

    return (
        <div>
            <p className="pb-3">Something's wrong here...</p>
            <h1>We can't find the page you're looking for.</h1>
            <button className="px-3 py-2 bg-white btn" onClick={(e) => handleClick(e)}
            style={{fontSize: "16px", color: "#1f3345"}}>Back To Home</button>
        </div>
    )
}

export default Page404;