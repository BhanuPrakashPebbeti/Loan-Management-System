import React, { useContext, useEffect, useState } from "react";
import { SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./ItemCard.css";
import { alertContext } from "../../../Context/Alert";
import furniture from "../../../EditableStuff/furniture.jpg";
import car from "../../../EditableStuff/car.jpg";
import home from "../../../EditableStuff/home.jpg";
import jewellery from "../../../EditableStuff/jewellery.jpg";
import object from "../../../EditableStuff/object.jpeg";
import Login from "../../Navbar/Login";

const ItemCard = ({ item, logged_in }) => {
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    const addDefaultSrc = (ev) => {
        ev.target.src =
            object;
    };

    return (
        <div className="itemCard my-3 itemcard-container">
            <div className="card text-center box-shadow">
                <img
                    onError={addDefaultSrc}
                    src={(item.category === "Furniture") ? furniture : ((item.category === "Vehicle") ? car : (item.category === "Home") ? home : (item.category === "Jewellery") ? jewellery : object)}
                    alt="item"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{item.itemName} </h5>
                    <p className="card-text">
                        <small className="text-muted">
                            Item Category : {item.category}
                            <br />
                            Item Make : {item.itemMake}
                        </small>
                    </p>
                    <NavLink
                        rel="noreferrer"
                        to={`/items/${item.id}`}
                        className="btn btn-sm btn-dark"
                    >
                        View More
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export default ItemCard;