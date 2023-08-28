import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Cookies } from 'react-cookie';
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import { Context } from "../../Context/Context";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { alertContext } from "../../Context/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../Error";
import Error from "../Error";


const LoanIssue = () => {
    const { user, logged_in } = useContext(Context);
    const [tableData, setTableData] = useState([]);
    const [load, setLoad] = useState(0);
    // const [loandata, setLoandata] = useState([]);
    const { showAlert } = useContext(alertContext);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const ddmmyy = (date) => {
        const d = new Date(date);
        return d.getDate() + "/" + String(parseInt(d.getMonth()) + 1) + "/" + d.getFullYear();
    }

    function ShowStatus(props) {
        console.log(props.userDetails);
        if (props.userDetails.approvalStatus === 0) {
            return (
                <div>
                    <button type="button" class="btn btn-success" onClick={() => approveLoan(true, props.userDetails.cardId)}>Accept</button>
                    <button type="button" class="btn btn-danger" onClick={() => declineLoan(true, props.userDetails.cardId)}>Decline</button>
                </div>
            )
        } else if (props.userDetails.approvalStatus === 1) {
            return (
                <div>
                    <button type="button" class="btn btn-success">Loan Approved</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button type="button" class="btn btn-danger">Loan Declined</button>
                </div>
            )
        }
    }

    const declineLoan = async (status, cardId) => {
        console.log(cardId);
        if (status) {
            try {
                const res = await axios.post(`${SERVER_URL}/approval/decline?cardId=${cardId}`, null, {
                    headers: {
                        "authorization": `Bearer ${cookies.get('token')}`,
                        "content-Type": "application/json"
                    }
                });
                getLoans();
                showAlert("Loan declined successfully", "success");
                navigate("/loanissue");
            } catch (error) {
                console.log(error);
                showAlert("Loan decline failed", "danger");
            }
        }
    };

    const approveLoan = async (status, cardId) => {
        console.log(cardId);
        console.log(cookies.get('token'));
        if (status) {
            try {
                const res = await axios.post(`${SERVER_URL}/approval/new?cardId=${cardId}`, null, {

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${cookies.get('token')}`

                    },
                });
                getLoans();
                showAlert("Loan approved successfully", "success");
                navigate("/loanissue");
            } catch (error) {
                console.log(error);
                showAlert("Loan approval failed", "danger");
            }
        }
    };

    const getLoans = async () => {
        const cookies = new Cookies();

        try {
            const data = await axios.get(`${SERVER_URL}/getcard`, {
                headers: {
                    "authorization": `Bearer ${cookies.get('token')}`,
                    "content-Type": "application/json"
                }
            });
            console.log(data.data)
            setTableData(data.data);
            // setLoandata(data.data);
            // console.log(loandata);
        } catch (err) {

        }
    }

    useEffect(() => {
        if ((logged_in == 1) && (user.role[0].name == "ROLE_ADMIN")) {
            getLoans();
            setLoad(1);
        }
        else {
            setLoad(-1)
        }
    }, [logged_in]);


    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ?
                <div className='table-container adjust pt-5'>
                    <MDBTable align='middle' >
                        <MDBTableHead>
                            <tr className='table-dark'>
                                <th scope='col'>User Name</th>
                                <th scope='col'>Loan ID</th>
                                <th scope='col'>Card ID</th>
                                <th scope='col'>Loan Type</th>
                                <th scope='col'>Duration</th>
                                {/* <th scope='col'>DOJ</th> */}
                                <th scope='col'>ACTIONS</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                tableData.map((userDetails, index) => {
                                    return (
                                        <tr className={index%2==0?'table-secondary':''}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <img
                                                        src='https://th.bing.com/th/id/OIP.-34wq4QQPS80r1PpZTU6ywHaHE?w=187&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                                                        alt=''
                                                        style={{ width: '45px', height: '45px' }}
                                                        className='rounded-circle'
                                                    />
                                                    <div className='ms-3'>
                                                        <p className='fw-bold mb-1'>{userDetails.employee.name.toUpperCase()}</p>
                                                        {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{userDetails.loan.id}</p>
                                                {/* <p className='text-muted mb-0'>{userDetails.department}</p> */}
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{userDetails.cardId}</p>
                                                {/* <p className='text-muted mb-0'>{userDetails.department}</p> */}
                                            </td>
                                            <td>
                                                {/* <MDBBadge color={`${userDetails.gender === "M" ? "success" : userDetails.gender === "F" ? "primary" : "danger"}`} pill>
                                        {userDetails.gender}
                                    </MDBBadge> */}
                                                <p className='fw-normal mb-1'>{userDetails.loan.loanType}</p>
                                            </td>
                                            {/* <td>{ddmmyy(userDetails.dob)}</td>
                                <td>{ddmmyy(userDetails.doj)}</td> */}
                                            <td><p className='fw-normal mb-1'>{userDetails.loan.duration}</p></td>
                                            <td>
                                                {/* <button type="button" class="btn btn-success">Accept</button>
                                <button type="button" class="btn btn-danger">Decline</button> */}
                                                <ShowStatus userDetails={userDetails} />
                                                {/*
                                    <NavLink
                                        to={`/user/${userDetails.id}/edit`}
                                        className="btn btn-primary btn-sm mx-2"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </NavLink>

                                    <NavLink
                                        rel="noreferrer"
                                        data-bs-toggle="modal"
                                        data-bs-target="#userdelete"
                                        className="btn btn-danger btn-sm mx-2"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </NavLink>

                                    <div className="modal fade" id="userdelete" tabIndex="-1" aria-labelledby="userdeleteLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h6 className="modal-title fs-5" id="deleteLabel">
                                                        Are you sure to delete user {userDetails.name}?
                                                    </h6>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-sm" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={() => { deleteUser(true, userDetails.id); }}>Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                            </div> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </MDBTableBody>
                    </MDBTable>
                </div>
                : (
                    <Error />
                )}

        </>




    );
}

export default LoanIssue;