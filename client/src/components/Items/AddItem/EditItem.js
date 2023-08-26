import React, { useContext, useState, useEffect } from "react";
import "./AddItem.css";
import { Context } from "../../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { alertContext } from "../../../Context/Alert";
import Loading from "../../Loading";
import Error from "../../Error";
import { Cookies } from 'react-cookie';

const EditItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, logged_in } = useContext(Context);
    const cookies = new Cookies();
    const { showAlert } = useContext(alertContext);
    const [edit, setEdit] = useState(false);
    const [item, setItem] = useState();
    const [load, setLoad] = useState(0);

    const getItem = async () => {
        try {
            const data = await axios.get(`${SERVER_URL}/items/id?id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setItem(data.data);
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
                getItem();
            }
            else {
                setLoad(-1);
            }
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in, id]);

    const handleInputs = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const UpdateItem = async (e) => {
        e.preventDefault();
        try {
            setEdit(true);
            const itemData = await axios.put(`${SERVER_URL}/items`, item, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            showAlert("Item edited Successfully!", "success");
            setEdit(false);
            navigate(`/items/${itemData.data.id}`);
        }
        catch (err) {
            console.log(err);
            setEdit(false);
            showAlert(err.response.data, "danger");
            navigate(`/items/${id}`);
        }

    };

    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ?
                <div className="container addItem-container text-center">
                    <div className="adjust">
                        <h3 className="text-header m-4">Edit Item</h3>
                        <form
                            method="POST"
                            onSubmit={UpdateItem}
                            encType="multipart/form-data"
                        >
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="itemName" className="col-sm-2 text-end">
                                    Item Name :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="itemName"
                                        value={item.itemName}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="itemName"
                                        aria-describedby="itemName"
                                        placeholder="Enter Item Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="valuation" className="col-sm-2 text-end">
                                    Valuation :
                                </label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="valuation"
                                        value={item.valuation}
                                        onChange={handleInputs}
                                        className="form-control"
                                        id="valuation"
                                        aria-describedby="valuation"
                                        placeholder="Enter Item Price"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-3 row">
                                <label htmlFor="category" className="col-sm-2 mt-3 text-end">
                                    Category :
                                </label>
                                <div className="col col-9">
                                    <select
                                        name="category"
                                        value={item.category}
                                        onChange={handleInputs}
                                        className="form-select"
                                        aria-label="category"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Home">Home</option>
                                        <option value="Vehicle">Vehicle</option>
                                        <option value="Property">Property</option>
                                        <option value="Jewellery">Jewellery</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group align-items-center mt-3 row">
                                <label htmlFor="itemMake" className="col-sm-2 mt-3 text-end">
                                    Make :
                                </label>
                                <div className="col col-9">
                                    <select
                                        name="itemMake"
                                        value={item.itemMake}
                                        onChange={handleInputs}
                                        className="form-select"
                                        aria-label="itemMake"
                                    >
                                        <option value="">Select Item Make</option>
                                        <option value="Wood">Wood</option>
                                        <option value="Steel">Steel</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Plastic">Plastic</option>
                                        <option value="Fabric">Fabric</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group my-3 row align-items-center">
                                <label htmlFor="description" className="col-sm-2 text-end">
                                    Description :
                                </label>
                                <div className="col-sm-10"><textarea type="text"
                                    name="description"
                                    value={item.description}
                                    onChange={handleInputs}
                                    className="form-control"
                                    id="description"
                                    aria-describedby="description"
                                    placeholder="Enter Item description"
                                    required rows="3" /></div>
                            </div>
                            {
                                edit ?
                                    <button type="submit" name="submit" id="submit" className="btn btn-primary" disabled>
                                        Editing <i className="fa fa-spinner fa-spin"></i>
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

export default EditItem;