import React from 'react';
import "./Dashboard.css";

const DashboardCard = ({number, field, img}) => {
    return (
        <div className="dashboardcard-container d-flex justify-content-center container mt-3">
            <div className="card p-2 px-3 py-3" style={{ textDecoration: 'none', maxWidth: "25rem" }}>
                <div className="d-flex justify-content-around card-details mt-1 mb-1 text-light text-white ">
                    <div className="d-flex align-self-center flex-column">
                        <span className='fs-2'>{number}</span>
                        <span className="light">{field}</span>
                    </div>
                    <div className="d-flex flex-row">
                        <img src={img} width="80" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard
