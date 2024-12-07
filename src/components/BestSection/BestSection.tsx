import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import "./BestSection.css";
import { ReactComponent as HeroIcon } from "../../assets/creation.svg";

interface BestSectionProps {
    scenarios: string[];
}

/*
TODO!!! 
1. Add a toggle arrow up/arrow down icon to show/hide the scenario details.
*/

const BestSection: React.FC<BestSectionProps> = ({ scenarios }) => {
    return (
        <section className="best-scenario">
            <h1 className="scenario-title"><HeroIcon className="vector-image" /> Best Scenario Results</h1>
            {scenarios.map((scenario, index) => (
                <p key={index} className="scenario"> {scenario} <button className="action-btn"> <HiDotsHorizontal /> </button> </p>
            ))}
        </section>
    );
};

export default BestSection;
