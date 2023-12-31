import React, { useContext, useState, useEffect } from "react";
import "./AddUser.css";
import { Context } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { alertContext } from "../../../Context/Alert";
import Loading from "../../Loading";
import Error from "../../Error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Cookies } from 'react-cookie';

const AddUser = () => {
    const navigate = useNavigate();
    const { user, logged_in } = useContext(Context);
    const { showAlert } = useContext(alertContext);
    const [add, setAdd] = useState(false);
    const cookies = new Cookies();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        designation: "",
        gender: "",
        department: "",
        dob: new Date(),
        doj: new Date(),
        password: "",
        isadmin: 0,
        role: [""]
    });
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (logged_in === 1) {
            if (user.role[0].name == "ROLE_ADMIN") {
                setLoad(1);
            }
            else {
                setLoad(-1)
            }
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in]);

    const handleInputs = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleRole = (e) => {
        setEmployee({ ...employee, [e.target.name]: [e.target.value] });
    };

    const setDOB = (date) => {
        setEmployee({ ...employee, dob: date });
    };

    const setDOJ = (date) => {
        setEmployee({ ...employee, doj: date });
    };

    const subtractYears = (date, years) => {
        date.setFullYear(date.getFullYear() - years);
        return date;
    }


    const PostEmployee = async (e) => {
        e.preventDefault();
        if (employee.dob > employee.doj) {
            showAlert("DOB cannot be greater than DOJ", "danger");
        }
        else {
            try {
                setAdd(true);
                const employeeData = await axios.post(`${SERVER_URL}/auth/signup`, employee, {
                    headers: {
                        "Authorization": `Bearer ${cookies.get('token')}`,
                        "Content-Type": "application/json"
                    }
                });
                showAlert("Employee Created Successfully!", "success");
                setAdd(false);
                // navigate(`/users/${employeeData.data.id}`);

                navigate(`/users`);
            }
            catch (err) {
                console.log(err);
                showAlert(err.response.data.error, "danger");
            }
        }
    };

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ?
                <div className="container addItem-container text-center">
                    <div className="adjust">
                        <h3 className="text-header m-4">Add User</h3>
                        <form
                            method="POST"
                            onSubmit={PostEmployee}
                            encType="multipart/form-data"
                        >
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="itemName" className="col-sm-2 text-end">
                                    Name :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="name"
                                        value={employee.name}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="name"
                                        aria-describedby="name"
                                        placeholder="Enter employee Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="email" className="col-sm-2 text-end">
                                    Email :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="email"
                                        value={employee.email}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="email"
                                        aria-describedby="email"
                                        placeholder="Enter employee email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="designation" className="col-sm-2 text-end">
                                    Designation :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="designation"
                                        value={employee.designation}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="designation"
                                        aria-describedby="designation"
                                        placeholder="Enter employee designation"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-3 row">
                                <label htmlFor="gender" className="col-sm-2 mt-3 text-end">
                                    Gender :
                                </label>
                                <div className="col col-9">
                                    <select
                                        name="gender"
                                        value={employee.gender}
                                        onChange={handleInputs}
                                        className="form-select"
                                        aria-label="gender"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-3 row">
                                <label htmlFor="department" className="col-sm-2 mt-3 text-end">
                                    Department :
                                </label>
                                <div className="col col-9">
                                    <select
                                        name="department"
                                        value={employee.department}
                                        onChange={handleInputs}
                                        className="form-select"
                                        aria-label="department"
                                    >
                                        <option value="">Select department</option>
                                        <option value="CT">CT</option>
                                        <option value="CCIBT">CCIBT</option>
                                        <option value="CTO">CTO</option>
                                        <option value="COO">COO</option>
                                        <option value="DTI">DTI</option>
                                        <option value="EFT">EFT</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-3 row">
                                <label htmlFor="department" className="col-sm-2 mt-3 text-end">
                                    Role :
                                </label>
                                <div className="col col-9">
                                    <select
                                        name="role"
                                        value={employee.role[0]}
                                        onChange={handleRole}
                                        className="form-select"
                                        aria-label="department"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mt-3 row align-items-center">
                                <label htmlFor="dob" className="col-sm-2 text-end">
                                    DOB :
                                </label>
                                <div className="col-sm-10">
                                    <DatePicker
                                        className="form-control"
                                        selected={new Date(employee.dob)}
                                        onChange={(date) => setDOB(date)}
                                        minDate={subtractYears(new Date(), 70)}
                                        dateFormat="MMMM d, yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-3 row align-items-center">
                                <label htmlFor="doj" className="col-sm-2 text-end">
                                    DOJ :
                                </label>
                                <div className="col-sm-10">
                                    <DatePicker
                                        className="form-control"
                                        selected={new Date(employee.doj)}
                                        onChange={(date) => setDOJ(date)}
                                        minDate={subtractYears(new Date(), 40)}
                                        dateFormat="MMMM d, yyyy"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                </div>
                            </div>
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="password" className="col-sm-2 text-end">
                                    Password :
                                </label>
                                <div className="col-sm-10">
                                    <input type="password"
                                        name="password"
                                        value={employee.password}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="password"
                                        aria-describedby="password"
                                        placeholder="Enter password"
                                        required /></div>
                            </div>
                            {
                                add ?
                                    <button type="submit" name="submit" id="submit" className="btn btn-primary" disabled>
                                        Adding <i className="fa fa-spinner fa-spin"></i>
                                    </button>
                                    :
                                    <button type="submit" name="submit" id="submit" className="btn btn-primary">
                                        Add
                                    </button>
                            }
                        </form>
                    </div>
                </div>
                : (
                    <Error />
                )}

        </>
    );
}

export default AddUser;