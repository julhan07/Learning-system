import React, { useContext } from "react";
import { ActionContext } from "../../context/actions";

function Home() {
    const actions = useContext(ActionContext);
    return (
        <div className="card">
            <div className="card-header">Dashboard</div>
            <div className="card-body">
                <p>Welcome {actions.me.name}</p>
            </div>
        </div>
    );
}

export default Home;
