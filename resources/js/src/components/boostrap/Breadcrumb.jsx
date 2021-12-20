import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb({ main_label, main_label_url, active_label }) {
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={main_label_url}>{main_label}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {active_label}
                    </li>
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default BreadCrumb;
