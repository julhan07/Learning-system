import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import BreadCrumb from "../../components/boostrap/breadcrumb";
import { ActionContext } from "../../context/actions";
import Form from "./Form";
import StoreNotification from "../../components/Notification";

function Add(props) {
    const actions = useContext(ActionContext);
    const navigation = useNavigate();
    const [field, setField] = useState({
        name: "",
        email: "",
        nis: "",
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        address: "",
        guardian_parent: "",
    });
    const [error, setError] = useState(null);

    const handleFormItem = (name, val) => {
        let newField = field ? field : {};
        newField[name] = val;
        setField(newField);
    };

    const onSubmitForm = async () => {
        const res = await actions.Create("/api/student/create", field);
        if (res.code == 200) {
            StoreNotification({
                title: "Informasi",
                message: "Data Siswa Berhasil disimpan!",
                type: "success",
            });
            return navigation("/dashboard/siswa");
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

    return (
        <div className="row">
            <BreadCrumb
                main_label="Siswa"
                main_label_url="/dashboard/siswa"
                active_label="Tambah"
            />

            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card mt-3 mb-3">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-8">Tambah Data Siswa</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <Form
                            field={field}
                            onChange={handleFormItem}
                            onSubmit={onSubmitForm}
                            errors={error}
                            edit={false}
                            {...actions}
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}

export default Add;
