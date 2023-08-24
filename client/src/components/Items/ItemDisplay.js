import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import { SERVER_URL } from "../../EditableStuff/Config";
import { Context } from "../../Context/Context";
import { alertContext } from "../../Context/Alert";
import { NavLink } from "react-router-dom";
import Error from "../Error";
import furniture from "../../EditableStuff/furniture.jpg";
import car from "../../EditableStuff/car.jpg";
import home from "../../EditableStuff/home.jpg";
import jewellery from "../../EditableStuff/jewellery.jpg";
import object from "../../EditableStuff/object.jpeg";
import LoanCard from "./LoanCard/LoanCard";
import { Cookies } from 'react-cookie';
import Modal from "react-bootstrap/Modal";

const ItemDisplay2 = () => {
    const params = new useParams(LoanCard);
    const id = params.id;
    const { user, logged_in } = useContext(Context);
    const { showAlert } = useContext(alertContext);
    const [item, setItem] = useState(null);
    const [loans, setLoans] = useState(null);
    const [edit, setedit] = useState(1);
    const [load, setLoad] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [add, setAdd] = useState(false);
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const getItem = async (id) => {
        try {
            const data = await axios.get(`${SERVER_URL}/items/id?id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setItem(data.data);
            getLoans(data.data);
            setLoad(1);
            if (user && (user.role[0].name === "ROLE_ADMIN")) {
                setedit(true);
            } else {
                setedit(false);
            }
        } catch (err) {
            setLoad(-1);
            showAlert(`${err.message}`, "danger");
            navigate('/error');
        }
    }
    const getLoans = async (obj) => {
        try {
            const data = await axios.get(`${SERVER_URL}/loans/?type=${obj.category}`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(data.data);
            setLoans(data.data);
            setLoad(1);

        } catch (err) {
            setLoad(1);
        }
    }

    const deleteItem = async (status) => {
        if (status) {
            try {
                const res = await axios.delete(`${SERVER_URL}/items/?id=${id}`, {
                    headers: {
                        "Authorization": `Bearer ${cookies.get('token')}`,
                        "Content-Type": "application/json"
                    }
                });
                showAlert("Item deleted successfully", "success");
                navigate("/items");
            } catch (error) {
                console.log(error);
                showAlert("Item Deletion failed", "danger");
            }
        }
    };

    const PostLoanCard = async (e) => {
        e.preventDefault();
        try {
            setAdd(true);
            const loanData = await axios.post(`${SERVER_URL}/loans/createLoan`,
                {
                    "duration": duration,
                    "type": item.category
                }, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            showAlert("Loan Created Successfully!", "success");
            getLoans(item);
            setAdd(false);
            setModalShow(false)
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.error, "danger");
        }

    };

    useEffect(() => {
        if (logged_in !== 0 && id) {
            getItem(id);
        }
    }, [logged_in, id]);

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ? (
                <div className="container itemdisplay-container py-5">
                    <div className="header align-center">
                        {edit && (
                            <div className="text-center fs-6 pb-3">
                                <NavLink type="button" className="btn btn-success btn-sm mx-2" onClick={() => setModalShow(true)}>
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

                                <Modal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                >
                                    <Modal.Body className="text-center p-5">
                                        <form
                                            method="POST"
                                            onSubmit={PostLoanCard}
                                            encType="multipart/form-data"
                                        >

                                            <div className="modal-body">
                                                <h3 className="pb-4">Add Loan Card</h3>
                                                <div className="form-group mb-3 text-start">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="duration"
                                                            onChange={(e) => { setDuration(e.target.value) }}
                                                            className="form-control"
                                                            id="duration"
                                                            aria-describedby="duration"
                                                            placeholder="Loan Tenure (in months)"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                {
                                                    add ?
                                                        <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" disabled>
                                                            Adding <i className="fa fa-spinner fa-spin"></i>
                                                        </button>
                                                        :
                                                        <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" >
                                                            Add
                                                        </button>
                                                }
                                            </div>

                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <NavLink
                                    to={`/items/${id}/edit`}
                                    className="btn btn-primary btn-sm mx-2"
                                >
                                    Edit{" "}
                                </NavLink>
                                <NavLink
                                    rel="noreferrer"
                                    data-bs-toggle="modal"
                                    data-bs-target="#delete"
                                    className="btn btn-danger btn-sm mx-2"
                                >
                                    {" "}
                                    Delete
                                </NavLink>
                                <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h6 className="modal-title fs-5" id="deleteLabel">
                                                    Are you sure to delete the item {item.itemName}?
                                                </h6>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-sm" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={() => { deleteItem(true); }}>Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    <div className="col-md-6 mb-6" key={loan.id}>
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

export default ItemDisplay2;