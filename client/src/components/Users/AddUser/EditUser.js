import React, { useContext, useState, useEffect } from "react";
import "./AddUser.css";
import { Context } from "../../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
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
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [usr, setUsr] = useState();
    const [load, setLoad] = useState(0);

    const [employee, setEmployee] = useState({
        name: "",
        designation: "",
        gender: "",
        department: "",
        dob: new Date(),
        doj: new Date(),
        password: "",
        isadmin: 0,
        role: ["employee"]
    });

   

    const handleInputs = (e) => {
        setUsr({ ...usr, [e.target.name]: e.target.value });
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

    const getUser = async () => {
        try {
            const data = await axios.get(`${SERVER_URL}/employees/id?id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setUsr(data.data);
            console.log(data.data);
            setLoad(1);
        } catch (err) {
            setLoad(-1);
            showAlert(`${err.message}`, "danger");
            navigate('/error');
        }
    };
    useEffect(() => {
        if (logged_in === 1) {
            if (id) {
                getUser();
            }
            else {
                setLoad(-1);
            }
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in, id]);


    const UpdateEmployee = async (e) => {
        e.preventDefault();
        try {
            setEdit(true);
            console.log("Final",usr);
            const itemData = await axios.put(`${SERVER_URL}/employees`, usr, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(usr);
            showAlert("User edited Successfully!", "success");
            setEdit(false);
            navigate(`/users`);
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
                        <h3 className="text-header m-4">Edit Employee</h3>
                        <form
                            method="POST"
                            onSubmit={UpdateEmployee}
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
                                        value={usr.name}
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
                                <label htmlFor="designation" className="col-sm-2 text-end">
                                    Designation :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="designation"
                                        value={usr.designation}
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
                                        value={usr.gender}
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
                                        value={usr.department}
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
                                        <option value="IT">EFT</option>
                                        <option value="EFT">EFT</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="form-group mt-3 row align-items-center">
                                <label htmlFor="dob" className="col-sm-2 text-end">
                                    DOB :
                                </label>
                                <div className="col-sm-10">
                                    <DatePicker
                                        name = "dob"
                                        className="form-control"
                                        selected={new Date(usr.dob)}
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
                                        name  = "doj"
                                        className="form-control"
                                        selected={new Date(usr.doj)}
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
                                        value={usr.password}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="password"
                                        aria-describedby="password"
                                        placeholder="Enter password"
                                        required /></div>
                            </div> */}
                            {
                                add ?
                                    <button type="submit" name="submit" id="submit" className="btn btn-primary" disabled>
                                        Adding <i className="fa fa-spinner fa-spin"></i>
                                    </button>
                                    :
                                    <button type="submit" name="submit" id="submit" className="btn btn-primary">
                                        Edit
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