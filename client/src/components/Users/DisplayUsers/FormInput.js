function FormInput({handleChange, formInputData, handleSubmit}){
    return(
    
        <div className="form-row row">
          <div className="col">
            <input type="text" onChange={handleChange} value={formInputData.name} name="name" className="form-control"  placeholder="Name" />
          </div>
          <div className="col">
            <input type="submit" onClick={handleSubmit} className="btn btn-primary" />
          </div>
        </div>
     
      
    )
    }
    
    export default FormInput;