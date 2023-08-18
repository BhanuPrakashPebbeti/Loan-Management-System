import React, { useRef, useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
// import "./ItemDisplay.css";
import axios from "axios";
import Loading from "../Loading";
import { SERVER_URL } from "../../EditableStuff/Config";
// import { Context } from "../../Context/Context";
import { alertContext } from "../../Context/Alert";
import { NavLink } from "react-router-dom";
import Error from "../Error";
import furniture from "../../EditableStuff/furniture.jpg";
import car from "../../EditableStuff/car.jpg";
import home from "../../EditableStuff/home.jpg";
import jewellery from "../../EditableStuff/jewellery.jpg";
import object from "../../EditableStuff/object.jpeg";
import LoanCard from "./LoanCard/LoanCard";

const ItemDisplay = () => {
    const params = new useParams(LoanCard);
    const editor = useRef(null);
    const id = params.id;
    const user = true;
    const { showAlert } = useContext(alertContext);
    const [item, setItem] = useState(null);
    const [loans, setLoans] = useState(null);
    const [edit, setedit] = useState(1);
    const [load, setLoad] = useState(0);
    const navigate = useNavigate();

    const getItem = async (id) => {
        try {
            const data = await axios.get(`${SERVER_URL}/items/${id}`);
            setItem(data?.data);
            setLoad(1);
        } catch (err) {
            setLoad(-1);
            showAlert(`${err.response.data.error}`, "danger");
            navigate('/error');
        }
    }
    const getLoans = async (id) => {
        try {
            const data = await axios.get(`${SERVER_URL}/loans/${id}`);
            setLoans(data?.data);
            setLoad(1);
        } catch (err) {
            setLoad(1);
            // showAlert(`${err.response.data.error}`, "danger");
            // navigate('/error');
        }
    }

    const handleInputs = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getItem(id);
        getLoans(id);
    }, [id]);

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ? (
                <div div className="container itemdisplay-container py-5">
                    <div className="header align-center">
                        {edit && (
                            <div className="text-center fs-6 pb-3">
                                <NavLink type="button" className="btn btn-success btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#loanCardModal">
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
                                    Add Loan Card
                                </NavLink>

                                <div className="modal fade" id="loanCardModal" tabindex="-1" aria-labelledby="loanCardModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="loanCardModalLabel">Add Loan Card</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-group my-3 row align-items-center">
                                                    <label htmlFor="valuation" className="col-sm-6 text-end">
                                                        Loan Tenure (in months) :
                                                    </label>
                                                    <div className="col-sm-6">
                                                        <input
                                                            type="text"
                                                            name="loanDuration"
                                                            // value={loan.loanDuration}
                                                            onChange={handleInputs}
                                                            className="form-control"
                                                            id="loanDuration"
                                                            aria-describedby="loanDuration"
                                                            placeholder="Enter Loan Duration"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <NavLink
                                    to={`/items/${item.id}/edit`}
                                    className="btn btn-primary btn-sm mx-2"
                                >
                                    Edit{" "}
                                </NavLink>
                                <NavLink
                                    rel="noreferrer"
                                    // onClick={deleteItem}
                                    className="btn btn-danger btn-sm mx-2"
                                >
                                    {" "}
                                    Delete
                                </NavLink>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-lg-5 ">
                                <img
                                    src={(item.category === "furniture") ? furniture : ((item.category === "car") ? car : (item.category === "home") ? home : (item.category === "jewellery") ? jewellery : object)}
                                    className="img-fluid rounded"
                                    alt="..."
                                    style={{ width: "30rem", objectFit: "contain" }}
                                />
                            </div>
                            <div className="col-lg-7">
                                <div className="row">
                                    <h3 className="text-center pt-4 pt-lg-1 pb-1">Description</h3>
                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                </div>
                                <div className="row">
                                    <h4 className="text-center pb-1">Item Details</h4>
                                    <p className="mb-1">
                                        Item Name : {item.itemName}
                                    </p>
                                    <p className="mb-1">
                                        Item Category : {item.category}
                                    </p>
                                    <p className="mb-1">
                                        Item Make : {item.itemMake}
                                    </p>
                                    <p className="mb-1">
                                        Item Valuation : {item.valuation}
                                    </p>
                                </div>
                                <div className="row">
                                    <h4 className="text-center pb-1">Available Loan Cards</h4>
                                    <div className="text-center">
                                        <div className="row">
                                            {loans && loans.map((loan) => {
                                                return (
                                                    <div className="col-md-4 mb-4" key={item.id}>
                                                        <LoanCard
                                                            item={item}
                                                            loan={loan}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            ) : (
                <Error />
            )}
        </>
    );
};

export default ItemDisplay;