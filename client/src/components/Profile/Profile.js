import React, { useContext, useState, useEffect } from "react";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../EditableStuff/Config";
import { alertContext } from "../../Context/Alert";
import { Context } from "../../Context/Context";
import { Cookies, useCookies } from 'react-cookie';
import axios from "axios";
import Loading from '../Loading';
import Error from '../Error';
import DatePicker from "react-datepicker";

const Profile = () => {
    const { id } = useParams();
    const { user, logged_in } = useContext(Context);
    const { showAlert } = useContext(alertContext);
    const [editUser, seteditUser] = useState(user);
    const [editUserCopy, seteditUserCopy] = useState(user);
    const [editMode, setEditMode] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [change, setChange] = useState(false);
    const [msg, setMsg] = useState("");
    const [load, setLoad] = useState(0);
    const [pChange, setPChange] = useState(false);
    const cookies = new Cookies();

    const changePassword = async (e) => {
        e.preventDefault();
        if (password === "" || newPassword === "" || cPassword === "") {
            setMsg("Fill All Details");
            return;
        }
        setMsg("");
        setChange(true);
        try {
            axios.put(`${SERVER_URL}/changePassword/${editUserCopy.id}`,
                {
                    password: password,
                    newPassword: newPassword,
                    cPassword: cPassword
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }).then(res => {
                    document.getElementById("modalClose").click();
                    showAlert(`${res.data.msg}!`, "success");
                    setChange(false);
                })
        } catch (err) {
            setMsg(err.response.data.error);
            setChange(false);
            console.log(err);
        }
    }

    const UpdateTeam = async (e) => {
        e.preventDefault();
        try {
            setChange(true);
            const itemData = await axios.put(`${SERVER_URL}/employees`, JSON.stringify(editUserCopy), {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            }).then((res)=>{
                showAlert("Profile Saved Successfully!", "success");
                setChange(false);
                setEditMode(false);
            })
            .catch((err)=>{
                console.log(err);
                showAlert("Some error!", "danger");
                setChange(false);
                setEditMode(false);
            });
            
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.error, "danger");
        }

    };

    const ddmmyy = (date) => {
        const d = new Date(date);
        return d.toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric'})
    }

    const handleInputs = (e) => {
        seteditUserCopy({ ...editUserCopy, [e.target.name]: e.target.value });
    }

    const setDOB = (date) => {
        seteditUserCopy({ ...editUserCopy, dob: date });
    };

    const setDOJ = (date) => {
        seteditUserCopy({ ...editUserCopy, doj: date });
    };

    const subtractYears = (date, years) => {
        date.setFullYear(date.getFullYear() - years);
        return date;
    }

    useEffect(() => {
        if (logged_in === 1) {
            setLoad(1);
            seteditUser(user);
            seteditUserCopy(user);
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in, id, user]);

    return (
        <>
            {load === 0 ? <Loading /> : load === 1 ?
                <>
                    <div className="profile container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-10 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ "borderRadius": ".5rem" }}>
                                    <div className="row g-0">
                                        <div className="col-md-4 gradient-custom text-center text-white"
                                            style={{ "borderTopLeftRadius": ".5rem", "borderButtomLeftRadius": ".5rem" }}>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="Avatar" className="img-fluid my-5" style={{ "width": "100px" }} />
                                            <h5>{editUserCopy.name}</h5>
                                            <p>{editUserCopy.designation}</p>
                                            <div className="d-flex justify-content-center mb-2 mt-3 mb-5">
                                                {
                                                    editMode ?
                                                        <>
                                                            <button type="button" onClick={() => {
                                                                seteditUserCopy(user);
                                                                setEditMode(false);
                                                            }} className="btn btn-sm btn-primary ms-1">Cancel</button>
                                                            {
                                                                pChange ?
                                                                    <button type="button" className="btn btn-sm btn-success ms-1" disabled>Saving <i className="fa fa-spinner fa-spin"></i></button>
                                                                    :
                                                                    <button type="button" onClick={UpdateTeam} className="btn btn-sm btn-success ms-1">Save Profile</button>
                                                            }

                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" onClick={() => setEditMode(true)} className="btn btn-sm btn-primary ms-1"><i className="fas fa-edit"></i> Edit Profile</button>
                                                            <button type="button" className="btn btn-sm btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#passwordModal" onClick={() => setMsg("")}>Change Password</button>

                                                            {/* password modal */}
                                                            <div className="modal fade" id="passwordModal"
                                                                data-bs-backdrop="static"
                                                                data-bs-keyboard="false"
                                                                tabIndex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog" >
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h1 className="modal-title fs-5" id="passwordModalLabel">Change Password</h1>
                                                                        </div>
                                                                        <form method="POST" encType="multipart/form-data">
                                                                            <div className="text-start modal-body">
                                                                                {msg ? <div className="alert alert-danger">{msg}</div> : null}
                                                                                <div className="form-group my-3">
                                                                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" id="passsword" aria-describedby="password" placeholder="Old Password" required={true} />
                                                                                </div>
                                                                                <div className="form-group my-3">
                                                                                    <input type="password" name="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control form-control-lg" id="newpassword" aria-describedby="newpassword" placeholder="New Password" required={true} />
                                                                                </div>
                                                                                <div className="form-group my-3">
                                                                                    <input type="password" name="cpassword" value={cPassword} onChange={(e) => setCPassword(e.target.value)} className="form-control form-control-lg" id="password" aria-describedby="cpassword" placeholder="Confirm Password" required={true} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="modal-footer">
                                                                                <button type="reset" id="modalClose" className="btn btn-sm btn-primary" data-bs-dismiss="modal"
                                                                                    onClick={() => {
                                                                                        setPassword("");
                                                                                        setNewPassword("");
                                                                                        setCPassword("");
                                                                                        setMsg("");
                                                                                    }}
                                                                                >Cancel</button>
                                                                                {
                                                                                    change ?
                                                                                        <button type="submit" onClick={changePassword} className="btn btn-sm btn-primary" disabled>
                                                                                            <span>Updating <i className="fa fa-spinner fa-spin"></i></span>
                                                                                        </button>
                                                                                        : <button type="submit" onClick={changePassword} className="btn btn-sm btn-primary">
                                                                                            Update
                                                                                        </button>
                                                                                }
                                                                            </div>
                                                                        </form>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4">
                                                <h6>Personal Details</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Name</h6>
                                                        {editMode ? <input type="text" name="name" value={editUserCopy.name} onChange={handleInputs} className="form-control form-control-sm mb-3" id="name" aria-describedby="name" placeholder="Enter Name" />
                                                            : <p className="text-muted">{editUserCopy.name}</p>}
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        {editMode ? <input type="text" name="email" value={editUserCopy.email} onChange={handleInputs} className="form-control form-control-sm mb-3" id="email" aria-describedby="email" placeholder="Enter Email" />
                                                            : <p className="text-muted">{editUserCopy.email}</p>}

                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Gender</h6>
                                                        {editMode ? <select
                                                            name="gender"
                                                            value={editUserCopy.gender}
                                                            onChange={handleInputs}
                                                            className="form-select"
                                                            aria-label="gender"
                                                        >
                                                            <option value="">Select gender</option>
                                                            <option value="M">Male</option>
                                                            <option value="F">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                            : <p className="text-muted">{editUserCopy.gender}</p>}

                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>DOB</h6>
                                                        {editMode ? <DatePicker
                                                            className="form-control"
                                                            selected={new Date(editUserCopy.dob)}
                                                            onChange={(date) => setDOB(date)}
                                                            minDate={subtractYears(new Date(), 70)}
                                                            dateFormat="MMMM d, yyyy"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                        />
                                                            : <p className="text-muted">{ddmmyy(editUserCopy.dob)}</p>}
                                                    </div>
                                                </div>
                                                <h6>Professional Details</h6>
                                                <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Designation</h6>
                                                        {editMode ? <input type="text" name="designation" value={editUserCopy.designation} onChange={handleInputs} className="form-control form-control-sm mb-3" id="designation" aria-describedby="designation" placeholder="Enter designation" />
                                                            : <p className="text-muted">{editUserCopy.designation}</p>}
                                                    </div>
                                                    <div className="col-6 mb-3">
                                                        <h6>Department</h6>
                                                        {editMode ? <select
                                                            name="department"
                                                            value={editUserCopy.department}
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
                                                            : <p className="text-muted">{editUserCopy.department}</p>}
                                                    </div>
                                                </div>
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>DOJ</h6>
                                                        {editMode ?
                                                            <DatePicker
                                                                className="form-control"
                                                                selected={new Date(editUserCopy.doj)}
                                                                onChange={(date) => setDOJ(date)}
                                                                minDate={subtractYears(new Date(), 70)}
                                                                dateFormat="MMMM d, yyyy"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                            />
                                                            : <p className="text-muted">{ddmmyy(editUserCopy.doj)}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <Error />}
        </>
    )
}

export default Profile
