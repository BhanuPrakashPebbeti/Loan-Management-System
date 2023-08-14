import Carousel from 'react-bootstrap/Carousel';
import './Slider.css';
import React from 'react';
import slider1 from "./Slider-1.jpg";

function Slider() {
    const slides = [slider1,slider1,slider1,slider1];

    return (
        <>
            <div className='slides-home-container'>
                <Carousel>
                    {
                        slides.map((slide) => {
                            return (
                                <Carousel.Item interval={5000}>
                                    <img
                                        className="d-block w-100"
                                        src={slide}
                                        alt="First slide"
                                    />
                                    {/* <Carousel.Caption className='w-100 text-shadow' style={{color:textcolor}}>
                  <h1 className='mb-0'>{title}</h1>
                  <h6>{caption1}</h6>
                  <h5 className='mt-3'>{caption2}</h5>
                  {link && <a className="align-items-center" style={{ color: `${textcolor}` }} href={link}>{linkhypertext?linkhypertext:"Learn More"} <span>❯</span></a>}
                </Carousel.Caption> */}
                                </Carousel.Item>

                            )
                        })
                    }
                </Carousel>
            </div>

        </>
    );
}

export default Slider;