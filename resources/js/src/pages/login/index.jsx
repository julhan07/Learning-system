import React, { useContext, useState } from "react";
import "./style.css";

import { ActionContext } from "../../context/actions";
import { useNavigate } from "react-router-dom";

import StoreNotification from "../../components/Notification";
import FormItem from "../../components/boostrap/FormItem";

function Login() {
    const navigate = useNavigate();
    const actions = useContext(ActionContext);

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [laoding, setLoading] = useState(false);

    const handleForm = (name, e) => {
        let newFormData = formData ? formData : {};
        newFormData[name] = e.target.value;
        setFormData(newFormData);
    };

    const handleActLogin = () => {
        actions.Create("/api/login", formData).then((res) => {
            if (res.code == 400) {
                setError(res.data);
            }

            if (res.code == 401) {
                return StoreNotification({
                    title: "Informasi",
                    message: res.message,
                    type: "danger",
                });
            }

            if (res.code == 200) {
                setLoading(true);
                localStorage.setItem("access_token", res.data.access_token);
                window.location.reload(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate("/dashboard");
                }, 1000);
            }
        });
    };

    return (
        <div className="row ">
            <div className="col-md-12">
                <div className="card log-section">
                    <div className="card-header ">
                        <h4>Login Sistem</h4>
                    </div>
                    <div className="card-body ">
                        <FormItem
                            tipe="text"
                            label="Masukkan Email"
                            placeholder="Masukkan Email"
                            value={formData && formData.email}
                            onChange={(e) => handleForm("email", e)}
                            errorMsg={
                                error && error["email"] && error["email"][0]
                            }
                        />

                        <FormItem
                            tipe="password"
                            label="Masukkan Password"
                            placeholder="Masukkan Password"
                            value={formData && formData.password}
                            onChange={(e) => handleForm("password", e)}
                            errorMsg={
                                error &&
                                error["password"] &&
                                error["password"][0]
                            }
                        />

                        {laoding ? (
                            <div className="spinner-border m-5" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        ) : (
                            <div
                                className="btn btn-success"
                                onClick={handleActLogin}
                                style={{ width: "100%" }}
                            >
                                Masuk
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
