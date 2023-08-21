import React from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../../Context/Context";
import "./DisplayUsers.css"
import FormInput from "./FormInput";
import Table from "./Table";
import { Cookies } from 'react-cookie';
import { SERVER_URL } from "../../../EditableStuff/Config";
import axios from "axios";



function Users(){
    const { user, logged_in } = useContext(Context);


 const [tableData, setTableData] = useState([])
 const [formInputData, setformInputData] = useState(
     {
     fullName:'',
     emailAddress:'',
     salary:''
    }
 );


 const getUsers = async () => {
    const cookies = new Cookies();

    try {
        const data = await axios.get(`${SERVER_URL}/employees`, {
            headers: {
                "Authorization": `Bearer ${cookies.get('token')}`,
                "Content-Type": "application/json"
            }
        });
        console.log(data);
        setTableData(data.data);
    } catch(err){
        
    }
 }

 useEffect(()=>{
    getUsers();
 }, logged_in);
 


 const handleChange=(evnt)=>{  
     const newInput = (data)=>({...data, [evnt.target.name]:evnt.target.value})
    setformInputData(newInput)
 }
  
 const handleSubmit= (evnt) =>{
     evnt.preventDefault();
     const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
     if(checkEmptyInput)
     {
      const newData = (data)=>([...data, formInputData])
      setTableData(newData);
      const emptyInput= {fullName:'', emailAddress:'', salary:''}
      setformInputData(emptyInput)
     }
 }  

 return(
     <React.Fragment>
     <div className="container disu">
     <div className="row">
         <div className="col-sm-15">
         {/* <FormInput handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit}/> */}
         <Table tableData={tableData}/>
         </div>
         {/* <div className="col-sm-4">

         </div> */}
     </div>
    </div>
     </React.Fragment>
 );
}
export default Users;