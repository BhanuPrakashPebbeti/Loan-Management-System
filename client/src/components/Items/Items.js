import React, { useState, useContext, useEffect } from "react";
import "./Items.css";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import ItemCard from "./ItemCard/ItemCard";

const Items = () => {
    const [load, setLoad] = useState(1);
    const user = true;
    const items = [{
        "item_id": 1,
        "item_name": "Chair",
        "item_category": "furniture",
        "item_make": "wood",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "4000"
    },
    {
        "item_id": 2,
        "item_name": "Car",
        "item_category": "car",
        "item_make": "vehicle",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "250000"
    },
    {
        "item_id": 3,
        "item_name": "Car",
        "item_category": "car",
        "item_make": "vehicle",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "250000"
    },
    {
        "item_id": 4,
        "item_name": "Table",
        "item_category": "furniture",
        "item_make": "wood",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "2500"
    },
    {
        "item_id": 5,
        "item_name": "Wardrope",
        "item_category": "furniture",
        "item_make": "wood",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "25000"
    },
    {
        "item_id": 6,
        "item_name": "Car",
        "item_category": "car",
        "item_make": "vehicle",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "250000"
    },
    {
        "item_id": 7,
        "item_name": "Home",
        "item_category": "home",
        "item_make": "home",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "2500000"
    },
    {
        "item_id": 8,
        "item_name": "Home",
        "item_category": "home",
        "item_make": "vehicle",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "250000"
    },
    {
        "item_id": 9,
        "item_name": "Car",
        "item_category": "car",
        "item_make": "vehicle",
        "item_description": "tyxucvabdnm'v;etg[frdv ",
        "item_valuation": "250000"
    }]

    useEffect(() => {
    }, [user]);

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ? (
                <div className="item-container container">
                    <div>
                        <div className="row align-items-center py-4">
                            <div className="col-md-4 text-center text-md-start text-header">
                                Items
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="row">
                                {items.map((item) => {
                                    return (
                                        <div className="col-md-4 mb-4" key={item.item_category}>
                                            <ItemCard
                                                item={item}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </>
    );
};

export default Items;