import React, { useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import BreadCrumb from "../../components/boostrap/breadcrumb";
import { ActionContext } from "../../context/actions";
import StoreNotification from "../../components/Notification";
import Form from "./Form";

function Edit(props) {
    const actions = useContext(ActionContext);
    const navigation = useNavigate();
    const [field, setField] = useState({
        name: "",
        email: "",
        password: "",
        email_verified_at: "",
        role_id: "",
    });
    const [error, setError] = useState(null);

    const handleFormItem = (name, val) => {
        let newField = field ? field : {};
        newField[name] = val;
        setField(newField);
    };

    const onSubmitForm = async () => {
        const res = await actions.Update(`/api/user/${props.id}`, field);
        if (res.code == 200) {
            StoreNotification({
                title: "Informasi",
                message: "Data Berhasil update!",
                type: "success",
            });
            navigation("/dashboard/user");
            return;
        }
        if (res.code == 400 && res.data) {
            setError(res.data);
            return;
        }

        return StoreNotification({
            title: "Warning",
            message: res.message,
            type: "warning",
        });
    };

    useEffect(() => {
        GetListID();
    }, []);

    const GetListID = useCallback(() => {
        actions.Get(`/api/user/${props.id}`, {}).then((res) => {
            if (res.code == 200) {
                setField(res.data);
                return;
            }

            return StoreNotification({
                title: "Warning",
                message: res.message,
                type: "warning",
            });
        });
    }, [props]);

    return (
        <div className="row">
            <BreadCrumb
                main_label="Pengguna"
                main_label_url="/dashboard/user"
                active_label="Ubah"
            />
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card mt-3 mb-3">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-8">Ubah Pengguna</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <Form
                            field={field}
                            onChange={handleFormItem}
                            onSubmit={onSubmitForm}
                            errors={error}
                            edit={true}
                            {...actions}
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}

export default Edit;
