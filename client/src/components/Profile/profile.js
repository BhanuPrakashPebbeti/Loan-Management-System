import "./profile.css"
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../EditableStuff/Config";
import axios from "axios";
import { alertContext } from "../../Context/Alert";
// import Loading from "../../Loading";
// import Error from "../../Error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Cookies } from 'react-cookie';

const Profile = () => {
    const navigate = useNavigate();
    const [usr, setUsr] = useState();
    const cookies = new Cookies();
    const { id } = useParams();
    const [load, setLoad] = useState(0);
    const { showAlert } = useContext(alertContext);
    const { user, logged_in } = useContext(Context);




    const getUser = async () => {
        console.log(id);
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
            // showAlert(`${err.message}`, "danger");
            // navigate('/error');
        }
    };


    useEffect(() => {
        if (logged_in === 1) {
            if (id) {
                console.log(id);
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


    return(
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md- border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Name</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                            <div className="col-md-12"><label className="labels">Department</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                            <div className="col-md-12"><label className="labels">Designation</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                            <div className="col-md-12"><label className="labels">Gender</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                            <div className="col-md-6"><label className="labels">DOJ</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                            <div className="col-md-6"><label className="labels">DOB</label><input type="text" className="form-control" placeholder="name" value="" /></div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-4">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br/>
                        <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" /></div> <br/>
                        <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" /></div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Profile;