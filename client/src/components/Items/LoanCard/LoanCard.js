import React from 'react';
import "./LoanCard.css";
import loanImg from "./../../../EditableStuff/loan.png";

const LoanCard = ({ item, loan }) => {
    const calcEmi = (p, t) => {
        const r = 0.006;
        return (p * r * ((1 + r) ** t)) / (((1 + r) ** t) - 1)
    }
    return (
        <div className="loancard-container d-flex justify-content-center container text-white mt-5">
            <div className="card p-2 px-3 py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <img src="https://i.imgur.com/8ANWXql.png" width="20" height="20" />
                    <img src={loanImg} width="40" /></div>
                <div className="d-flex justify-content-between card-details mt-3 mb-3 text-light">
                    <div className="d-flex flex-column">
                        <span className="light">Loan Tenure</span><span>{loan.duration} mon</span>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column mr-3"><span className="light">EMI</span><span>{calcEmi(item.valuation, loan.duration)}/-</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanCard
