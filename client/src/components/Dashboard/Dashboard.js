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
import adminCountDashboard from './../../EditableStuff/adminCountDashboard.png';
import PieChart from "./PieChart";

const Dashboard = () => {
    const { user, logged_in } = useContext(Context);
    const [loanCount, setLoanCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [loanValuation, setLoanValuation] = useState(0);
    const [applicationStats, setApplicationStats] = useState(null);
    const [load, setLoad] = useState(0);
    const cookies = new Cookies();

    const formatCurrency = (amount) => {
        amount = amount * 0.012;
        const units = ["", "K", "M", "B", "T"];
        let unitIndex = 0;
    
        while (amount >= 1000 && unitIndex < units.length - 1) {
            amount /= 1000;
            unitIndex++;
        }
    
        return `${amount.toFixed(2)} ${units[unitIndex]} USD`;
    }

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

            const cardtype = await axios.get(`${SERVER_URL}/stats/cardtype`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setApplicationStats(cardtype.data);

            const issue = await axios.get(`${SERVER_URL}/stats/issues`, {
                headers: {
                    "Authorization": `Bearer ${cookies.get('token')}`,
                    "Content-Type": "application/json"
                }
            });
            setLoanValuation(issue.data["Total Valuation"]);

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
                    <div class="row">
                    <div class="col-md-4">
                            <DashboardCard number={formatCurrency(loanValuation)} field={"Total Loans valuation"} img={creditDashboard} />
                        </div>
                        <div class="col-md-4">
                            <DashboardCard number={loanCount} field={"Loans Applications"} img={loanDashboard} />
                        </div>
                        <div class="col-md-4">
                            <DashboardCard number={itemCount} field={"Items in Market"} img={items} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <DashboardCard number={approvedCount} field={"Loans Approved"} img={loanApprovedDashboard} />
                        </div>
                        <div class="col-md-4">
                            <DashboardCard number={declinedCount} field={"Loans Declined"} img={loanDeclinedDashboard} />
                        </div>
                        <div class="col-md-4">
                            <DashboardCard number={pendingCount} field={"Loans Pending"} img={loanPendingDashboard} />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <PieChart data={applicationStats} />
                        </div>
                        <div class="col-md-4">
                            <DashboardCard number={adminCount} field={"Admin Count"} img={adminCountDashboard} />
                            <DashboardCard number={userCount} field={"User Count"} img={userCountDashboard} />
                        </div>
                    </div>
                </div>) : (
                null
            )}
        </>
    )
}

export default Dashboard
