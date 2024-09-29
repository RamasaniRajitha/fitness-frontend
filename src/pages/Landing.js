import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/authContext';

const Landing = () => {
    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        currentUser ? navigate('/home') : navigate('/signup');
    }

    return (
        <div className="landing-page">
            <div className="content">
                <div className="col-xl-7 col-12">
                    <h1 className="text-center py-5">Welcome to Trenify!</h1>
                    <div className="px-sm-5 px-1">
                        <center>
                        <h3>The Fitness Management System is a cutting-edge web application that helps users achieve their health and fitness goals through AI-powered personalized workout and meal plans. 
                            It features comprehensive tracking and analytics, mental wellness support, and secure data management. 
                            Users can also consult certified physiotherapists for expert advice.
                        </h3>
                        <button className="start mt-2 mb-5" onClick={(e) => {handleGetStarted(e)}}>Get Started</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Landing;