import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../ContextApi/AuthContext';

const Navbar = () => {
    const { state } = useAuth();
    const navigate = useNavigate()

    const HandleLogout = () => {
        try {
            localStorage.removeItem("userData")
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    {/* Your logo component or content */}
                </div>
                <div className="nav-elements">
                    <ul>
                        {state ? (
                            <>
                                <li>
                                    <NavLink to="/private/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <button onClick={HandleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>

                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
