import React, { useContext, useState, useEffect } from "react";
import "./AddUser.css";
// import { Context } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { alertContext } from "../../../Context/Alert";
import Loading from "../../Loading";
import Error from "../../Error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddUser = () => {
    const navigate = useNavigate();
    const user = true;
    const logged_in = 1;
    const { showAlert } = useContext(alertContext);
    const [add, setAdd] = useState(false);
    const [employee, setEmployee] = useState();
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (logged_in === 1) {
            setEmployee({
                name: "",
                designation: "",
                gender: "",
                department: "",
                dob: new Date(),
                doj: new Date(),
                password: ""
            });
            setLoad(1);
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in]);

    const handleInputs = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
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

    const renderYearContent = (year) => {
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };

    const PostEmployee = async (e) => {
        e.preventDefault();
        try {
            setAdd(true);
            const employeeData = await axios.post(`http://localhost:8080/employees`, employee, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            showAlert("Employee Created Successfully!", "success");
            console.log(employeeData);
            navigate(`/users/${employeeData.data.id}`);
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.error, "danger");
        }

    };

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ?
                <div className="container addItem-container text-center">
                    <div className="adjust">
                        <h3 className="text-header m-4">Add Employee</h3>
                        <form
                            method="POST"
                            onSubmit={PostEmployee}
                            encType="multipart/form-data"
                        >
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="itemName" className="col-sm-2 text-end">
                                    Employee Name :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="employeeName"
                                        value={employee.name}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="employeeName"
                                        aria-describedby="employeeName"
                                        placeholder="Enter employee Name"
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
                                        name="category"
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
                                        <option value="CCIBT">CCIBTR</option>
                                        <option value="CTO">CTO</option>
                                        <option value="COO">COO</option>
                                        <option value="DTI">DTI</option>
                                        <option value="EFT">EFT</option>
                                        <option value="Other">Other</option>
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