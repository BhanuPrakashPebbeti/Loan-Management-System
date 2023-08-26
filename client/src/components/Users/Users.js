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

const Users = () => {
    const { user, logged_in } = useContext(Context);
    const [load, setLoad] = useState(0);
    const [tableData, setTableData] = useState([]);
    const { showAlert } = useContext(alertContext);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const ddmmyy = (date) => {
        const d = new Date(date);
        return d.toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})
    }
    const deleteUser = async (status, id) => {
        if (status) {
            try {
                const res = await axios.delete(`${SERVER_URL}/employees/?id=${id}`, {
                    headers: {
                        "Authorization": `Bearer ${cookies.get('token')}`,
                        "Content-Type": "application/json"
                    }
                });
                getUsers();
                showAlert("User deleted successfully", "success");
                navigate("/users");
            } catch (error) {
                console.log(error);
                showAlert("User Deletion failed", "danger");
            }
        }
    };

    const getUsers = async () => {

        try {
            const data = await axios.get(`${SERVER_URL}/employees`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setLoad(1);
            setTableData(data.data);
        } catch (err) {
            console.log(err);
            showAlert(err.response.data.error, "danger");
        }
    }

    useEffect(() => {
        if ((logged_in == 1) && (user.role[0].name == "ROLE_ADMIN")) {
            getUsers();
        }
        else {
            setLoad(-1)
        }
    }, logged_in);
    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ?
                <div className='table-container adjust'>
                    <div className="row align-items-center py-4">
                        <div className="col-md-4 text-center text-md-start text-header">
                            Users
                        </div>
                        <div className="col-md-8 text-center text-md-end">
                            {user ? (
                                <>
                                    {(user.role[0].name == "ROLE_ADMIN") && (
                                        <NavLink
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            to="/addEmployee"
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
                                            Add User
                                        </NavLink>
                                    )}
                                </>
                            ) : null}
                        </div>
                    </div>
                    <MDBTable align='middle' >
                        <MDBTableHead>
                            <tr className='table-dark'>
                                <th scope='col'>Name</th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>DOB</th>
                                <th scope='col'>DOJ</th>
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
                                                        <p className='fw-bold mb-1'>{userDetails.name.toUpperCase()}</p>
                                                        {/* <p className='text-muted mb-0'>john.doe@gmail.com</p> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className='fw-normal mb-1'>{userDetails.designation}</p>
                                                <p className='text-muted mb-0'>{userDetails.department}</p>
                                            </td>
                                            <td>
                                                <MDBBadge color={`${userDetails.gender === "M" ? "success" : userDetails.gender === "F" ? "primary" : "danger"}`} pill>
                                                    {userDetails.gender}
                                                </MDBBadge>
                                            </td>
                                            <td>{ddmmyy(userDetails.dob)}</td>
                                            <td>{ddmmyy(userDetails.doj)}</td>
                                            <td>
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
                                                </div>
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

export default Users;