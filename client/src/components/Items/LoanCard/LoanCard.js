import React from 'react';
import "./LoanCard.css";
import loan from "./../../../EditableStuff/loan.png";

const LoanCard = () => {
    return (
        <div className="loancard-container d-flex justify-content-center container text-white mt-5">
            <div className="card p-2 px-3 py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <img src="https://i.imgur.com/8ANWXql.png" width="20" height="20" />
                    <img src={loan} width="40" /></div>
                <div className="d-flex justify-content-between card-details mt-3 mb-3 text-light">
                    <div className="d-flex flex-column">
                        <span className="light">Loan Tenure</span><span>12 mon</span>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column mr-3"><span className="light">EMI</span><span>334/-</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanCard
