import React from 'react';
import './ContactUs.css';
import bg from "./../EditableStuff/contactus.jpg";

const ContactUs = () => {
    return (
        <>
            <h1 className='m-1'>
                &nbsp;
            </h1>
            <div className='contact-container adjust'>
                <div className="card mb-4 box-shadow" style={{ "maxWidth": "800px" }}>
                    <div className="row no-gutters">
                        <div className="col-md-6">
                            <img src={bg} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <form action="contact.php" className='contactform'>
                                    <h1>Contact Us</h1><br />
                                    <input type="text" id="name" name="name" placeholder="Full Name" /><br />
                                    <input type="email" id="mail" name="mail" placeholder="E-mail" /><br />
                                    <textarea id="Message" name="Message" rows="1" cols="50" placeholder="Message"></textarea><br />
                                    <input type="button" value="Contact Us" />
                                </form>
                            </div>
                            <div className="socialbtns">
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
                </div>
            </div>
        </>
    )
}

export default ContactUs