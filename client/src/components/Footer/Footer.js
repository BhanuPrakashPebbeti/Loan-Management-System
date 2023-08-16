import React from 'react';
import { NavLink } from "react-router-dom";
import './Footer.css';

const Footer = () => {

    return (
        <div className='footer' id='contactus'>
            <div className='adjust'>
                <div className='row'>
                    <div className='col-md-3 col-6'>
                        <h5>WELLS FARGO</h5>
                        <NavLink to="/home" style={{ color: "#212529" }}><p>Home</p></NavLink>
                        <NavLink to="/items" style={{ color: "#212529" }}><p>Items</p></NavLink>
                    </div>
                    <div className='col-md-4 col-6'>
                        <h5>&nbsp;&nbsp;</h5>
                        <NavLink to="/about" style={{ color: "#212529" }}><p>About</p></NavLink>
                        <NavLink to="/contactus" style={{ color: "#212529" }}><p>Contact Us</p></NavLink>
                    </div>
                    <div className='col-md-5 col-12'>
                        <h5>CONTACT US</h5>
                        <p>Address: <span>Wells Fargo Embassy Tech Village, Bangalore Pincode: 560103</span></p>
                        <div className="d-flex justify-content-start my-4">
                            <a
                                className="fa fa-lg fa-facebook mx-2"
                                href="https://www.facebook.com/wellsfargo/"
                                target="_blank"
                            ></a>
                            <a className="fa fa-lg fa-twitter mx-2"
                                href="https://twitter.com/WellsFargo"
                                target="_blank"></a>
                            <a
                                className="fa fa-lg fa-envelope mx-2"
                                href={`mailto:pebbetibhanu2017@gmail.com`}
                            ></a>
                            <a
                                className="fa fa-lg fa-linkedin mx-2"
                                href="https://www.linkedin.com/company/wellsfargo"
                                target="_blank"
                            ></a>
                            <a
                                className="fa fa-lg fa-instagram mx-2"
                                href="https://www.instagram.com/wellsfargo/"
                                target="_blank"
                            ></a>

                            <a
                                className="fa fa-lg fa-youtube mx-2"
                                href="https://www.youtube.com/user/wellsfargo/?themeRefresh=1"
                                target="_blank"
                            ></a>
                        </div>
                    </div>
                </div>
                <div className='text-centre'>
                    <hr />
                    Copyright © 2023 Wells Fargo. All rights reserved.
                </div>
            </div>
        </div>
    )
}

export default Footer