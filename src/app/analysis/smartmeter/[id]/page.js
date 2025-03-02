"use client";
import Navbar from '../../../../../components/Navbar/Navbar';
import UserDashboard from '../../../../../components/Dashboard/dashboard';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './smart.css'
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, } from "chart.js";


import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ params }) {
    const email = decodeURIComponent(params.id);
    const router = useRouter();
    const [history, setHistory] = useState([]);


    const [stats, setStats] = useState({
        totalProduction: 0,
        totalConsumption: 0,
        avgProduction: 0,
        avgConsumption: 0,
        peakProduction: 0,
        peakConsumption: 0,
        efficiencyRatio: 0,
        surplusEnergy: 0,
        energyDeficit: 0,
        gridbal: 0,
        count: 0,
    });

    useEffect(() => {
        if (!email) {
            router.push("");
            return;
        }

        async function fetchData() {
            try {
                const response = await fetch(`/api/products/getenergyrecords/${email}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error);

                const totalProduction = data.reduce((sum, record) => sum + record.totalProduction, 0);
                const totalConsumption = data.reduce((sum, record) => sum + record.totalConsumption, 0);
                const peakProduction = Math.max(...data.map(record => record.totalProduction));
                const peakConsumption = Math.max(...data.map(record => record.totalConsumption));
                const count = data.length;




                setStats({
                    totalProduction,
                    totalConsumption,
                    avgProduction: totalProduction / count,
                    avgConsumption: totalConsumption / count,
                    peakProduction,
                    peakConsumption,
                    efficiencyRatio: totalProduction / (totalConsumption || 1),
                    surplusEnergy: Math.max(0, totalProduction - totalConsumption),
                    energyDeficit: Math.max(0, totalConsumption - totalProduction),
                    gridbal: totalProduction - totalConsumption,
                    count,
                });
                console.log(totalConsumption,89)
                console.log(totalProduction,89)

            } catch (error) {
                console.error("Error fetching records:", error.message);
            }
        }

        fetchData();

        const interval = setInterval(async () => {
            try {
                const response = await fetch(`/api/products/getenergyrecords/${email}`);
                const newData = await response.json();
                if (!response.ok) throw new Error(newData.error);

                if (newData.length === 0) return;

                const latestRecord = newData[newData.length - 1];

                setStats(prev => {
                    const updatedTotalProduction = prev.totalProduction + latestRecord.totalProduction;
                    const updatedTotalConsumption = prev.totalConsumption + latestRecord.totalConsumption;
                    const updatedCount = prev.count + 1;
                    setHistory(prevHistory => [
                        ...prevHistory,
                        {
                            time: new Date().toLocaleTimeString(),
                            production: updatedTotalProduction,
                            consumption: updatedTotalConsumption
                        }
                    ]);


                    return {
                        totalProduction: updatedTotalProduction,
                        totalConsumption: updatedTotalConsumption,
                        avgProduction: updatedTotalProduction / updatedCount,
                        avgConsumption: updatedTotalConsumption / updatedCount,
                        peakProduction: Math.max(prev.peakProduction, latestRecord.totalProduction),
                        peakConsumption: Math.max(prev.peakConsumption, latestRecord.totalConsumption),
                        efficiencyRatio: updatedTotalProduction / (updatedTotalConsumption || 1),
                        surplusEnergy: Math.max(0, updatedTotalProduction - updatedTotalConsumption),
                        energyDeficit: Math.max(0, updatedTotalConsumption - updatedTotalProduction),
                        gridbal: updatedTotalConsumption - updatedTotalProduction,
                        count: updatedCount,
                    };
                });

            } catch (error) {
                console.error("Error updating records:", error.message);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [email]);

    if (!email) return null;

    const chartData = {
        labels: history.map(entry => entry.time),  
        datasets: [
            {
                label: "Total Production",
                data: history.map(entry => entry.production), 
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.2)",
                borderWidth: 2,
                fill: true,
            },
            {
                label: "Total Consumption",
                data: history.map(entry => entry.consumption),  
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const getEfficiencyChartData = (efficiencyData) => {
        return {
            labels: ["Good (>0.8)", "Average (0.6 - 0.8)", "Poor (<0.6)"],
            datasets: [
                {
                    label: "Efficiency Ratio Distribution",
                    data: [stats.efficiencyRatio, 1 - stats.efficiencyRatio],
                    backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                    hoverOffset: 5,
                },
            ],
        };
    };





    return (
        <div>
            <UserDashboard />
            <Navbar />

            <div className="dashboard-container">

                <div className="top-metrics">
                    <div className="metric-box">
                        <h3>Production</h3>
                        <p className="totprod">{stats.totalProduction.toFixed(2)} kWh</p>

                    </div>
                    <div className="metric-box">
                        <h3> Consumption</h3>
                        <p className="totcons">{stats.totalConsumption.toFixed(2)} kWh</p>

                    </div>
                    <div className="metric-box">
                        <h3>Grid Balance</h3>
                        <p className={stats.gridbal > 0 ? "totprod" : "totcons"}>
                            {stats.gridbal} kWh
                        </p>


                    </div>

                    <div className="metric-box">
                        <h3>Efficiency</h3>

                        <p className={stats.efficiencyRatio.toFixed(2) > 0 ? "totprod" : "totcons"}>
                            {stats.efficiencyRatio.toFixed(2)} %
                        </p>
                    </div>
                </div>

                <div className="charts-container">
                    <div className="chart prod">
                        <Line data={chartData} />
                    </div>

                    <div className="chart session" >
                        <h3>Efficiency</h3>

                        <Pie data={getEfficiencyChartData([stats.efficiencyRatio > 1 ? 1 : 0, stats.efficiencyRatio >= 0.8 && stats.efficiencyRatio <= 1 ? 1 : 0, stats.efficiencyRatio < 0.8 ? 1 : 0])} options={{
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                            },
                        }}
                            height={180}
                            width={180}
                        />

                    </div>
                </div>


                <div className="top-metrics">
                    <div className="metric-box">
                        <h3>Peak Production</h3>
                        <p className="totprod">⬆ {stats.peakProduction.toFixed(2)} kWh</p>

                    </div>
                    <div className="metric-box">
                        <h3> Peak Consumption</h3>
                        <p className="totcons">⬆ {stats.peakConsumption.toFixed(2)} kWh</p>

                    </div>
                    <div className="metric-box">
                        <h3>Average Production</h3>
                        <p className="totprod"> {stats.avgProduction.toFixed(2)} kWh</p>
                    </div>
                    <div className="metric-box">
                        <h3>Average Consumption</h3>
                        <p className="totcons"> {stats.avgConsumption.toFixed(2)} kWh</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
