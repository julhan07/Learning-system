import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "../Axios";
import UserAccess from "../config/user_access.json";

export const ActionContext = createContext();

function ActionContainer(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [me, setMe] = useState([]);

    useEffect(() => {
        GetMe();
        checking();
    }, []);

    const GetMe = useCallback(() => {
        Axios.get("/api/user/me").then((res) => {
            if (res.data.code == 200) {
                let user = res.data.data;
                setMe(user);
            }
        });
    }, [location]);

    const checking = useCallback(() => {
        const status = statusLogin();
        if (!status) {
            return navigate("/login");
        }

        if (location.pathname == "/" || location.pathname == "/login") {
            return navigate("/dashboard");
        }

        return navigate(location.pathname);
    }, [location]);

    const statusLogin = () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.clear();
        return navigate("/login");
    };

    const Get = async (url, params = {}) => {
        try {
            const res = await Axios.get(url, params);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    const Create = async (url, body = {}, params = {}) => {
        try {
            const res = await Axios.post(url, body, params);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    const Update = async (url, body = {}, params = {}) => {
        try {
            const res = await Axios.put(url, body, params);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    const Delete = async (url, body = {}, params = {}) => {
        try {
            const res = await Axios.delete(url, body, params);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    const StatusAccess = (user, menu) => {
        let access = [];
        UserAccess.map((item) => {
            item.access_for.filter((new_item) => {
                if (new_item.role === user.role_id && menu == item.manu_name) {
                    access.push(new_item.access);
                }
            });
        });

        return access;
    };

    return (
        <ActionContext.Provider
            value={{
                Get,
                Create,
                Update,
                Delete,
                statusLogin,
                logout,
                UserAccess,
                StatusAccess,
                me,
            }}
        >
            <React.Fragment>{props.children}</React.Fragment>;
        </ActionContext.Provider>
    );
}

export default ActionContainer;
