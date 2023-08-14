import React, { useContext, useEffect, useState } from "react";
import { SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./ItemCard.css";
import { alertContext } from "../../../Context/Alert";
import furniture from "../../../EditableStuff/furniture.jpg";
import car from "../../../EditableStuff/car.jpg";
import home from "../../../EditableStuff/home.jpg";
import object from "../../../EditableStuff/object.jpeg";

const ItemCard = ({ item }) => {
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (item) {
        }
    }, [item]);

    return (
        <div className="my-3 itemcard-container">
            <div className="card text-center">
                <img
                    onError={object}
                    src={(item.item_category === "furniture") ? furniture : ((item.item_category === "car") ? car : (item.item_category === "home") ? home : object)}
                    alt="item"
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{item.item_name} </h5>
                    <p className="card-text">
                        <small className="text-muted">
                            Item Category : {item.item_category}
                            <br />
                            Item Make : {item.item_make}
                        </small>
                    </p>
                    <NavLink
                        rel="noreferrer"
                        to={`/items/${item.item_id}`}
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