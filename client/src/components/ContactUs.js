import React from 'react';
import './ContactUs.css';
import bg from "./../EditableStuff/contactus.jpg";

const ContactUs = () => {
    return (
        <div className='contact-container adjust'>
            <div class="card mb-4" style={{ "max-width": "800px" }}>
                <div class="row no-gutters">
                    <div class="col-md-6">
                        <img src={bg} class="card-img" alt="..." />
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <form action="contact.php" className='contactform'>
                                <h1>Contact Us</h1><br />
                                <input type="text" id="name" name="name" placeholder="Full Name" /><br />
                                <input type="email" id="mail" name="mail" placeholder="E-mail" /><br />
                                <textarea id="Message" name="Message" rows="1" cols="50" placeholder="Message"></textarea><br />
                                <input type="button" value="Contact Us" />
                            </form>
                        </div>
                        <div className="socialbtns">
                            <a href="https://www.facebook.com/" className="fa fa-lg fa-facebook"></a>
                            <a href="https://twitter.com/" className="fa fa-lg fa-twitter"></a>
                            <a href="https://www.linkedin.com/" className="fa fa-lg fa-linkedin"></a>
                            <a href="https://www.instagram.com/" className="fa fa-lg fa-instagram"></a>
                            <a href="https://www.youtube.com/" className="fa fa-lg fa-youtube"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs