import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from '../context/authContext';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);

    const {dispatch} = useContext(AuthContext)
    
    const navigate = useNavigate(); 
    
    const handleHome = () => {
      if (currentUser) {
        navigate("/home");
      } else {
        navigate("/");
      }
    }
  
    const handleSignOut = (e) => {
      e.preventDefault();
      signOut(auth)
      .then(() => {
          dispatch({type:"LOGOUT"})
          alert("Logged out successfully");
          navigate("/");
      }).catch((error) => {
          console.log(error.code, error.message)
      });
    }

    return (
        <nav className='flex flex-row justify-between gap-x-2 w-full z-20 top-0 left-0 h-12 border-b items-center bg-gray-200 px-4'>
            <div className="text-lg font-bold" onClick={() => handleHome()}>Fitness Manager</div>
            
            <div className="ml-auto flex gap-x-2">
                { currentUser ? 
                    <>
                        <button
                            onClick={(e) => handleSignOut(e)}
                            className='bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out'
                        >
                            Logout
                        </button>
                    </>
                :
                    <>
                        <Link
                            className='bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out mx-2'
                            to={'/login'}
                        >
                            Login
                        </Link>
                        <Link
                            className='bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out mx-2'
                            to={'/signup'}
                        >
                            Sign Up
                        </Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar