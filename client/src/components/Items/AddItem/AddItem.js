import React, { useContext, useState, useEffect } from "react";
import "./AddItem.css";
// import { Context } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import { CLIENT_URL, SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";
import { alertContext } from "../../../Context/Alert";
import Loading from "../../Loading";
import Error from "../../Error";
import { Cookies } from 'react-cookie';

const AddItem = () => {
    const navigate = useNavigate();
    const user = true;
    const logged_in = 1;
    const cookies = new Cookies();
    const { showAlert } = useContext(alertContext);
    const [add, setAdd] = useState(false);
    const [item, setItem] = useState();
    const [load, setLoad] = useState(0);

    useEffect(() => {
        if (logged_in === 1) {
            setItem({
                itemName: "",
                valuation: "",
                category: "",
                itemMake: "",
                description: "",
                issueStatus: 0
            });
            setLoad(1);
        }
        else if (logged_in === -1) {
            setLoad(-1);
        }
    }, [logged_in]);

    const handleInputs = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const PostItem = async (e) => {
        e.preventDefault();
        try {
            setAdd(true);
            const itemData = await axios.post(`http://localhost:8080/items/createItem`, item, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json",
                },
            });
            showAlert("Item Created Successfully!", "success");
            console.log(itemData);
            navigate(`/items/${itemData.data.id}`);
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
                        <h3 className="text-header m-4">Add Item</h3>
                        <form
                            method="POST"
                            onSubmit={PostItem}
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
                                        value={item.name}
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

export default AddItem;