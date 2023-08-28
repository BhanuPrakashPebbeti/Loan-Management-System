import React, { useEffect, useState, useContext } from "react";
import DashboardCard from './DashboardCard';
import { Context } from "../../Context/Context";
import { SERVER_URL } from "../../EditableStuff/Config"; import axios from "axios";
import Loading from "../Loading";
import { Cookies } from 'react-cookie';
import loanApprovedDashboard from './../../EditableStuff/loanApprovedDashboard.png';
import loanDeclinedDashboard from './../../EditableStuff/loanDeclinedDashboard.png';
import loanPendingDashboard from './../../EditableStuff/loanPendingDashboard.png';
import creditDashboard from './../../EditableStuff/creditDashboard.png';
import loanDashboard from './../../EditableStuff/loanDashboard.png';
import items from './../../EditableStuff/items.png';
import userCountDashboard from './../../EditableStuff/userCountDashboard.png';

const Dashboard = () => {
    const { user, logged_in } = useContext(Context);
    const [loanCount, setLoanCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [load, setLoad] = useState(0);
    const cookies = new Cookies();

    const getStats = async () => {
        try {
            const cards = await axios.get(`${SERVER_URL}/stats/cards`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setApprovedCount(cards.data.Approved);
            setDeclinedCount(cards.data.Declined);
            setPendingCount(cards.data.Pending);
            setLoanCount(cards.data.Approved + cards.data.Declined + cards.data.Pending);

            const items = await axios.get(`${SERVER_URL}/stats/items`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setItemCount(items.data.Unissued);

            const users = await axios.get(`${SERVER_URL}/stats/users`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setAdminCount(users.data.Admins);
            setUserCount(users.data.Users);
            setLoad(1);

        } catch (err) {
            setLoad(1);
        }
    }

    useEffect(() => {
        if ((logged_in == 1) && (user.role[0].name == "ROLE_ADMIN")) {
            getStats();
        }
        else {
            setLoad(-1)
        }
    }, [logged_in]);


    return (
        <>
            {load === 0 ? (
                <Loading />
            ) : load === 1 ? (
                <div className="dashboard-container container">
                    <div>
                        <div className="text-md-start text-header pt-4">
                            Dashboard
                        </div>
                        <p className='text-muted text-info-emphasis'>Welcome to your dashboard</p>
                    </div>
                    <div className="d-flex">
                        <DashboardCard number={loanCount} field={"Loans Applications"} img={loanDashboard} />
                        <DashboardCard number={itemCount} field={"Items in Market"} img={items} />
                        <DashboardCard number={userCount} field={"User Count"} img={userCountDashboard} />
                    </div>
                    <div className="d-flex">
                        <DashboardCard number={approvedCount} field={"Loans Approved"} img={loanApprovedDashboard} />
                        <DashboardCard number={declinedCount} field={"Loans Declined"} img={loanDeclinedDashboard} />
                        <DashboardCard number={pendingCount} field={"Loans Pending"} img={loanPendingDashboard} />
                    </div>
                </div>) : (
                null
            )}
        </>
    )
}

export default Dashboard
