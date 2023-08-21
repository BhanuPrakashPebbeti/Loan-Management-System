import React, { useState, useContext, useEffect } from "react";
import "./Items.css";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import ItemCard from "./ItemCard/ItemCard";
import { Context } from "../../Context/Context";
import { Cookies, CookiesProvider } from "react-cookie";

const Items = () => {
    const [load, setLoad] = useState(1);
    const [items, setItems] = useState([]);
    const user = { "isadmin": true };
    const { user_, logged_in } = useContext(Context);
    const cookies = new Cookies();

    const getItems = async () => {
        try {
            await axios.get(`${SERVER_URL}/items`).then((data) => {
                setItems(data?.data);
                setLoad(1);
            })
        } catch (err) {
            setLoad(-1);
        };
    }

    useEffect(() => {
        getItems();
    }, []);

    const foo = ()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/employees/userdetails?id=8c7bfe9a-9862-44c6-888d-807a48cc4c54',
            headers: { 
              'Authorization': `Bearer ${cookies.get("token")}`
            }
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          
    }

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
                            <button onClick={foo}>click me</button>
                            <div className="col-md-8 text-center text-md-end">
                                {user ? (
                                    <>
                                        {user.isadmin && (
                                            <NavLink
                                                type="button"
                                                className="btn btn-sm btn-success"
                                                to="/additem"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="currentColor"
                                                    className="bi bi-plus-circle-fill"
                                                    viewBox="0 0 16 18"
                                    
                                    >
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                                </svg>{" "}
                                                Add Item
                                            </NavLink>
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