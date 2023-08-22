import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Cookies } from 'react-cookie';
import { SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import { Context } from "../../Context/Context";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { alertContext } from "../../Context/Alert";
import { NavLink, useNavigate } from "react-router-dom";

const Users = () => {
    const { user, logged_in } = useContext(Context);
    const [tableData, setTableData] = useState([]);
    const { showAlert } = useContext(alertContext);
    const cookies = new Cookies();
    const navigate = useNavigate();

    const ddmmyy = (date) => {
        const d = new Date(date);
        return d.getDate() + "/" + String(parseInt(d.getMonth()) + 1) + "/" + d.getFullYear();
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
        const cookies = new Cookies();

        try {
            const data = await axios.get(`${SERVER_URL}/employees`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setTableData(data.data);
        } catch (err) {

        }
    }

    useEffect(() => {
        getUsers();
    }, logged_in);
    return (
        <div className='table-container adjust'>
            <MDBTable align='middle' >
                <MDBTableHead>
                    <tr>
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
                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://th.bing.com/th/id/OIP.-34wq4QQPS80r1PpZTU6ywHaHE?w=187&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>{userDetails.name}</p>
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
                                        <MDBBtn color='primary' rounded size='sm'>
                                            <i class="fas fa-edit"></i>
                                        </MDBBtn>
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
    );
}

export default Users;