import React from "react";
import "./KPISection.css";
import { CiCircleQuestion } from "react-icons/ci";

interface KPI {
  title: string;
  description: string;
  value: string | number;
}

interface KPISectionProps {
  kpis: KPI[];
}
/*
TODO:
1. Add a Variables select option 
*/

const KPISection: React.FC<KPISectionProps> = ({ kpis }) => {
  return (
    <div className="kpi-section">
      <h3 className="header-title">Key Performance Indicators</h3>
      <div className="kpi-wrapper">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-content">
              <div className="kpi-title">
                <h4>{kpi.title}<span className="question-icon"><CiCircleQuestion /> </span></h4>
              </div>
              <div className="kpi-description">{kpi.description}</div>
            </div>
            <div className="kpi-value">{kpi.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KPISection;
