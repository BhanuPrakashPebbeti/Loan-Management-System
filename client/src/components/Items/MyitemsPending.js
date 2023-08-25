import React, { useState, useContext, useEffect } from "react";
import "./Items.css";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import ItemCard from "./ItemCard/ItemCard";
import { Context } from "../../Context/Context";
import { Cookies } from "react-cookie";

const MyitemsPending = () => {
    const [load, setLoad] = useState(1);
    const [items, setItems] = useState([]);
    const { user, logged_in } = useContext(Context);
    const cookies = new Cookies();

    const getItems = async () => {
        try {
            await axios.get(`${SERVER_URL}/items/myitems?id=${user.id}&filter=applied`
            , {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            }).then((data) => {
                setItems(data.data);
                console.log(data.data,"pending");
                setLoad(1);
            })
        } catch (err) {
            setLoad(-1);
        };
    }

    useEffect(() => {
        getItems();
    }, [logged_in]);

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ? (
                <div className="item-container container">
                    <div>
                        <div className="row align-items-center py-4">
                            <div className="col-md-4 text-center text-md-start text-header">
                                Pending Requests
                            </div>
                            <div className="col-md-8 text-center text-md-end">
                                {user ? (
                                    <>
                                        {(user.role[0].name == "ROLE_EMPLOYEE") && (
                                            <>
                                                <NavLink
                                                    type="button"
                                                    className="btn btn-sm btn-success mx-2"
                                                    to="/myitemsApproved"
                                                >

                                                    Approved
                                                </NavLink>
                                                <NavLink
                                                    type="button"
                                                    className="btn btn-sm btn-danger mx-2"
                                                    to="/myitemsDeclined"
                                                >

                                                   Declined
                                                </NavLink>
                                                <NavLink
                                                    type="button"
                                                    className="btn btn-sm btn-primary mx-2"
                                                    to="/items"
                                                >

                                                    All Available Item
                                                </NavLink></>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="row">
                                {items && items.map((item) => {
                                    return (
                                        <div className="col-md-4 mb-4" key={item.id}>
                                            <ItemCard
                                                item={item}
                                                logged_in={logged_in}
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

export default MyitemsPending;