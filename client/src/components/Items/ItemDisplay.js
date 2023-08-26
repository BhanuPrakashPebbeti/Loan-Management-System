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
import { Cookies } from 'react-cookie';
import Modal from "react-bootstrap/Modal";
import "./LoanCard.css";
import loanImg from "./../../EditableStuff/loan.png";

const ItemDisplay = () => {
    const params = new useParams();
    const id = params.id;
    const { user, logged_in } = useContext(Context);
    const { showAlert } = useContext(alertContext);
    const [item, setItem] = useState(null);
    const [loans, setLoans] = useState(null);
    const [approvedLoans, setApprovedLoans] = useState(null);
    const [edit, setEdit] = useState(1);
    const [load, setLoad] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [modalShow4, setModalShow4] = useState(false);
    const [selLoanCard, setSelLoanCard] = useState(0);
    const [add, setAdd] = useState(false);
    const [duration, setDuration] = useState(0);
    const [editLoan, setEditLoan] = useState(0);
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
            console.log("item", data.data);
            try {
                const data1 = await axios.get(`${SERVER_URL}/getcard/empitem?eid=${user.id}&itemId=${id}`, {
                    headers: {
                        "Authorization": `Bearer ${cookies.get('token')}`,
                        "Content-Type": "application/json"
                    }
                });
                setApprovedLoans(data1.data);
                console.log("issuecard", data1.data);
            } catch (err) {
                setLoad(-1);
            }
            getLoans(data.data);
            setLoad(1);
            if (user && (user.role[0].name === "ROLE_ADMIN")) {
                setEdit(true);
            } else {
                setEdit(false);
            }
        } catch (err) {
            setLoad(-1);
            showAlert(`${err.message}`, "danger");
            navigate('/error');
        }
    }
    const getLoans = async (obj) => {
        try {
            const data = await axios.get(`${SERVER_URL}/loans/type?type=${obj.category}`, {
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
                    "loanType": item.category
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

    const PostIssueCard = async (e) => {
        e.preventDefault();
        try {
            setAdd(true);
            const issuecard = await axios.post(`${SERVER_URL}/getcard`,
                {
                    "employee_id": user.id,
                    "item_id": item.id,
                    "loan_id": selLoanCard.id
                }, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            showAlert("Loan Application Submitted Successfully!", "success");
            getLoans(item);
            setAdd(false);
            setModalShow4(false)
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.error, "danger");
        }

    };

    const EditLoanCard = async (e) => {
        e.preventDefault();
        try {
            setAdd(true);
            const itemData = await axios.put(`${SERVER_URL}/loans`, editLoan, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            showAlert("Loan Card edited Successfully!", "success");
            getItem(id);
            setAdd(false);
            setModalShow2(false);
            navigate(`/items/${id}`);
        }
        catch (err) {
            console.log(err);
            setAdd(false);
            setModalShow2(false);
            showAlert(err.response.data, "danger");
            navigate(`/items/${id}`);
        }

    };

    const deleteLoanCard = async () => {
        try {
            setAdd(true);
            const res = await axios.delete(`${SERVER_URL}/loans?id=${editLoan.id}`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            showAlert("Loan Card deleted successfully", "success");
            getItem(id);
            setAdd(false);
            setModalShow3(false);
            navigate(`/items/${id}`);
        } catch (error) {
            setAdd(false);
            setModalShow3(false);
            showAlert(error.response.data, "danger");
        }
    };


    const calcEmi = (p, t) => {
        const r = 0.006;
        const emi = (p * r * ((1 + r) ** t)) / (((1 + r) ** t) - 1);
        return emi.toFixed(2)
    }

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
                        <div className="card mb-3" style={{ "maxWidth": "1500" }}>
                            <div className="row g-0 ">
                                <div className="col-lg-6 ">
                                    <img
                                        src={(item.category === "furniture") ? furniture : ((item.category === "car") ? car : (item.category === "home") ? home : (item.category === "jewellery") ? jewellery : object)}
                                        className="img-fluid rounded p-5"
                                        alt="..."
                                        style={{ width: "30rem", objectFit: "contain" }}
                                    />
                                </div>
                                <div className="col-lg-6 align-self-center">
                                    <div className="card-body">
                                        <h3 className="card-title mt-2 mb-3">{item.itemName}</h3>
                                        <p className="font-monospace text-muted">
                                            Category : {item.category}
                                        </p>
                                        <p className="font-monospace text-muted">
                                            Make : {item.itemMake}
                                        </p>
                                        <h5 className="mb-4">
                                            &#x20b9; {item.valuation}
                                        </h5>
                                        <p className=" font-monospace text-muted card-text" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {approvedLoans && <div className="row">
                                {approvedLoans && <h4 className="text-center pb-1"> Loan Requests</h4>}
                                <div className="text-center">
                                    <div className="row">
                                        {approvedLoans && approvedLoans.map((apploan) => {
                                            return (
                                                apploan && <div className="col-md-3 mb-3" key={apploan.loan.id}>
                                                    <div className="loancard-container d-flex justify-content-center container mt-3">
                                                        <NavLink className="card p-2 px-3 py-3" style={{ textDecoration: 'none' }}>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                {(apploan.approvalStatus==0)?<span className="badge text-bg-warning">pending</span>:(apploan.approvalStatus==1)?<span className="badge text-bg-success">approved</span>:<span className="badge text-bg-danger">declined</span>}
                                                                <img src={loanImg} width="40" />
                                                            </div>
                                                            <div className="d-flex justify-content-between card-details mt-1 mb-1 text-light text-white ">
                                                                <div className="d-flex flex-column">
                                                                    <span className="light">Loan Tenure</span><span>{apploan.loan.duration} mon</span>
                                                                </div>
                                                                <div className="d-flex flex-row">
                                                                    <div className="d-flex flex-column mr-3"><span className="light">EMI</span><span>{calcEmi(item.valuation, apploan.loan.duration)}/-</span></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>}
                            <div className="row">
                                {loans && <h4 className="text-center pb-1">Available Loan Cards</h4>}
                                <div className="text-center">
                                    <div className="row">
                                        {loans && loans.map((loan) => {
                                            return (
                                                loan && <div className="col-md-3 mb-3" key={loan.id}>
                                                    <div className="loancard-container d-flex justify-content-center container text-white mt-3">
                                                        <NavLink className="card p-2 px-3 py-3" onClick={() => {
                                                            if (!edit) {
                                                                setSelLoanCard(loan);
                                                                setModalShow4(true);
                                                            }
                                                        }} style={{ textDecoration: 'none' }}>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                {/* {(!edit) && ((loan.id === selLoanCard) ? <img src="https://i.imgur.com/8ANWXql.png" width="20" height="20" /> : null)} */}
                                                                <div>
                                                                    {edit && <>
                                                                        <NavLink
                                                                            onClick={() => {
                                                                                setModalShow2(true);
                                                                                setEditLoan(loan);
                                                                            }}
                                                                            className="btn btn-primary btn-sm mx-2"
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </NavLink>

                                                                        <NavLink
                                                                            className="btn btn-danger btn-sm mx-2"
                                                                            onClick={() => {
                                                                                setModalShow3(true);
                                                                                setEditLoan(loan);
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </NavLink></>}
                                                                </div>
                                                                <img src={loanImg} width="40" /></div>
                                                            <div className="d-flex justify-content-between card-details mt-1 mb-1 text-light">
                                                                <div className="d-flex flex-column">
                                                                    <span className="light">Loan Tenure</span><span>{loan.duration} mon</span>
                                                                </div>
                                                                <div className="d-flex flex-row">
                                                                    <div className="d-flex flex-column mr-3"><span className="light">EMI</span><span>{calcEmi(item.valuation, loan.duration)}/-</span></div>
                                                                </div>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <Modal
                                show={modalShow2}
                                onHide={() => setModalShow2(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Body className="text-center p-5">
                                    <form
                                        method="PUT"
                                        onSubmit={EditLoanCard}
                                        encType="multipart/form-data"
                                    >

                                        <div className="modal-body">
                                            <h3 className="pb-4">Edit Loan Card</h3>
                                            <div className="form-group mb-3 text-start">
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="duration"
                                                        value={editLoan.duration}
                                                        onChange={(e) => {
                                                            setEditLoan({ ...editLoan, [e.target.name]: e.target.value });
                                                        }}
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
                                                        Editing <i className="fa fa-spinner fa-spin"></i>
                                                    </button>
                                                    :
                                                    <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" >
                                                        Edit
                                                    </button>
                                            }
                                        </div>

                                    </form>
                                </Modal.Body>
                            </Modal>
                            <Modal
                                show={modalShow3}
                                onHide={() => setModalShow3(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Body className="text-center p-5">
                                    <form
                                        method="DELETE"
                                        onSubmit={deleteLoanCard}
                                        encType="multipart/form-data"
                                    >

                                        <div className="modal-body">
                                            <h5 className="pb-4">Are you sure to delete Loan Card</h5>
                                            {
                                                add ?
                                                    <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" disabled>
                                                        Deleting <i className="fa fa-spinner fa-spin"></i>
                                                    </button>
                                                    :
                                                    <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" >
                                                        Delete
                                                    </button>
                                            }
                                        </div>

                                    </form>
                                </Modal.Body>
                            </Modal>
                            <Modal
                                show={modalShow4}
                                onHide={() => setModalShow4(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Body className="text-center p-5">
                                    <form
                                        method="POST"
                                        onSubmit={PostIssueCard}
                                        encType="multipart/form-data"
                                    >

                                        <div className="modal-body">
                                            <h5 className="pb-4">Apply for Loan</h5>
                                            <h3 className="card-title mt-2 mb-3">{item.itemName}</h3>
                                            <p className="font-monospace text-muted">
                                                Category : {item.category}
                                            </p>
                                            <p className="font-monospace text-muted">
                                                Make : {item.itemMake}
                                            </p>
                                            <p className="font-monospace text-muted">
                                                Tenure : {selLoanCard.duration} months
                                            </p>
                                            <p className="font-monospace text-muted">
                                                EMI : {calcEmi(item.valuation, selLoanCard.duration)}
                                            </p>
                                            <h5 className="mb-4">
                                                &#x20b9; {item.valuation}
                                            </h5>
                                            {
                                                add ?
                                                    <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" disabled>
                                                        Applying <i className="fa fa-spinner fa-spin"></i>
                                                    </button>
                                                    :
                                                    <button type="submit" name="submit" id="submit" className="btn btn-primary w-100 mb-4 py-2 px-4" >
                                                        Apply
                                                    </button>
                                            }
                                        </div>

                                    </form>
                                </Modal.Body>
                            </Modal>
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