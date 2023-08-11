import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import { SERVER_URL } from "../../EditableStuff/Config";
import LoginNew from "./LoginNew";
// import { Context } from "../../Context/Context";
import axios from "axios";
import Logo from '../../EditableStuff/lms.jpg';

const NavBarNew = () => {
    const [compete, setCompete] = useState([]);
    const user = false;
    const [modalShow, setModalShow] = React.useState(false);
    const Logout = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/logout`, {
                withCredentials: true,
            });
        } catch (err) {
            console.log("Unable to logout..");
        }
        window.location.reload(true);
    };

    const navs = [
        {
            show: true,
            link: "/home",
            name: "Home",
        },
        {
            show: true,
            link: "/about",
            name: "About",
        },
        {
            show: true,
            link: "/contactus",
            name: "Contact us",
        },
    ];

    const [navOpen, setNavOpen] = useState(false);
    const openNavFunc = () => {
        setNavOpen(true);
    }

    const closeNavFunc = () => {
        setNavOpen(false);
    }

    return (
        <div className="NavBar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav py-0 align-items-center adjust">
                            <li>
                                <NavLink className="navbar-brand" to='/'><span><img src={Logo} arc="Logo" style={{ width: "30px", borderRadius: "5px" }} /></span><span></span></NavLink>
                            </li>
                            {navs.map((nav) => {
                                if (nav.show) {
                                    return (
                                        <li className="nav-item" key={nav.link}>
                                            <NavLink className="nav-link" to={nav.link} onClick={closeNavFunc} aria-current="page">
                                                {nav.name}
                                            </NavLink>
                                        </li>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            {user ? (
                                <li className="nav-item">
                                    <div className="dropdown show">
                                        <NavLink
                                            className="nav-link dropdown-toggle user-name"
                                            role="button"
                                            id="dropdownMenuLink"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Hello {user.firstname}
                                        </NavLink>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <NavLink className="dropdown-item" to="/profile" onClick={closeNavFunc} aria-current="page">
                                                My Profile
                                            </NavLink>
                                            <hr />
                                            {user ? (
                                                user.isadmin ? (
                                                    <>
                                                        <NavLink className="dropdown-item" to="/admin" onClick={closeNavFunc} aria-current="page">
                                                            Admin
                                                        </NavLink>
                                                        <hr />
                                                    </>
                                                ) : null
                                            ) : null}
                                            <a className="dropdown-item" href="#" onClick={Logout}>
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-link mx-2 btn btn-primary" variant="primary" onClick={() => setModalShow(true)}>
                                        Login
                                    </NavLink>
                                </li>
                            )}
                            <LoginNew show={modalShow} onHide={() => setModalShow(false)} />
                        </ul>

                    </div>
                </div>
            </nav>
        </div>

    );
};

export default NavBarNew;