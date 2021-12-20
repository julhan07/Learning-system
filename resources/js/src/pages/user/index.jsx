import React from "react";
import { useLocation } from "react-router";
import qs from "query-string";
import Table from "./TableList";
import Add from "./Add";
import Edit from "./Edit";

function UserIndex() {
    const location = useLocation();

    const RenderSwitchPage = () => {
        const action = qs.parse(location.search);
        switch (action.action) {
            case "edit":
                return <Edit id={action.id} />;
            case "add":
                return <Add />;
            default:
                return <Table />;
        }
    };

    return <React.Fragment>{RenderSwitchPage()}</React.Fragment>;
}

export default UserIndex;
