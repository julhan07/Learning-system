import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ActionContext } from "../../context/actions";
import Form from "./Form";
import StoreNotification from "../../components/Notification";

function Add(props) {
    const actions = useContext(ActionContext);
    const navigation = useNavigate();
    const [field, setField] = useState({
        name: "",
        teacher_id: "",
    });
    const [error, setError] = useState(null);

    const handleFormItem = (name, val) => {
        let newField = field ? field : {};
        newField[name] = val;
        setField(newField);
    };

    const onSubmitForm = async () => {
        const res = await actions.Create("/api/class_room/create", field);
        if (res.code == 200) {
            StoreNotification({
                title: "Informasi",
                message: "Data Kelas Berhasil disimpan!",
                type: "success",
            });
            return navigation("/dashboard/kelas");
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
        <Form
            field={field}
            onChange={handleFormItem}
            onSubmit={onSubmitForm}
            errors={error}
            edit={false}
            {...actions}
        />
    );
}

export default Add;
