import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import BestSection from "../components/BestSection/BestSection";
import KPISection from "../components/KPISection/KPISection";
import GraphSection from "../components/GraphSection/GraphSection";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaHistory, FaUpload } from "react-icons/fa";
import ligthningBolt from "../assets/lightning-bolt.png";
import SlideOverCard from "../components/SlideOverCard/SlideOverCard";

const Dashboard: React.FC = () => {
    const [isSlideOverOpen, setSlideOverOpen] = useState(false);

    const scenarios = [
        "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
        "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles."
    ];

    const kpis = [
        { title: "Infrastructure Units", description: "This describes variable two and what the shown data means.", value: "€421.07" },
        { title: "Charging Growth", description: "This describes variable two and what the shown data means.", value: "33.07%" },
        { title: "Localization Change", description: "This describes variable two and what the shown data means.", value: "21.9%" },
        { title: "Fleet Growth", description: "This describes variable two and what the shown data means.", value: "7.03%" },
    ];

    const chartData = [
        { month: "Apr", value: 20000, target: 10000 },
        { month: "May", value: 40000, target: 20000 },
        { month: "Jun", value: 60000, target: 80000 },
        { month: "Jul", value: 100000, target: 60000 },
        { month: "Aug", value: 60000, target: 1000 },
        { month: "Sep", value: 40000, target: 100000 },
        { month: "Oct", value: 60000, target: 90000 },
    ];

    /*
    TODO!!!
    1. Adjust the sidebar and navbar alignment to get the desired layout.
    */
    return (
        <div className="outer-frame">
            <div className="dashboard">
                <div className="navbar-wrapper">
                    <Navbar />
                </div>
                <div className="flex">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className={`main-content ${isSlideOverOpen ? 'blurred' : ''}`}>
                        <div className="heading-section">
                            <h1 className="dashboard-title"><img className="light-image" src={ligthningBolt} alt="Hero" /> Charging Station</h1>
                            <div className="icon-group">
                                <button className="icon-btn">
                                    <FaHistory />
                                </button>
                                <div className="navbar-text-frame" onClick={() => setSlideOverOpen(true)}>
                                    <div className="navbar-text" >
                                        Edit Variables
                                    </div>
                                </div>
                                <button className="icon-btn">
                                    <FaUpload />
                                </button>
                            </div>
                        </div>
                        <BestSection scenarios={scenarios} />
                        <div className="content-wrapper">
                            <GraphSection data={chartData} />
                            <KPISection kpis={kpis} />
                        </div>
                    </div>

                    {isSlideOverOpen && (
                        <SlideOverCard isOpen={isSlideOverOpen} onClose={() => setSlideOverOpen(false)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
