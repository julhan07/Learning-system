import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormItem from "../../components/boostrap/FormItem";

function Form(props) {
    const { field, onChange, onSubmit, errors, edit } = props;
    const [items, setItems] = useState([]);

    useEffect(() => {
        props.Get("/api/user/role").then((res) => {
            if (res.code == 200) {
                let newItems = [];
                res.data.map((item) => {
                    newItems.push({
                        label: item.name,
                        value: item.id,
                    });
                });
                setItems(newItems);
            }
        });
    }, []);

    return (
        <React.Fragment>
            <FormItem
                tipe="text"
                label="Nama Lengkap"
                placeholder="Masukkan Nama"
                value={field.name}
                onChange={(e) => onChange("name", e.target.value)}
                errorMsg={errors && errors["name"] && errors["name"][0]}
            />
            <FormItem
                tipe="email"
                label="Email"
                placeholder="Masukkan Email Valid"
                value={field.email}
                onChange={(e) => onChange("email", e.target.value)}
                errorMsg={errors && errors["email"] && errors["email"][0]}
            />

            {edit == false ? (
                <React.Fragment>
                    <FormItem
                        tipe="select"
                        label="Rule"
                        placeholder="Masukkan Rules"
                        value={field.role_id}
                        items={items}
                        onChange={(e) => onChange("role_id", e.target.value)}
                        errorMsg={
                            errors && errors["role_id"] && errors["role_id"][0]
                        }
                    />
                    <FormItem
                        tipe="password"
                        label="Password"
                        placeholder="Masukkan Password"
                        value={field.password}
                        onChange={(e) => onChange("password", e.target.value)}
                        errorMsg={
                            errors &&
                            errors["password"] &&
                            errors["password"][0]
                        }
                    />
                </React.Fragment>
            ) : (
                ""
            )}

            <div className="mt-4">
                <Link to="/dashboard/user" className="btn btn-danger">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-box-arrow-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                        />
                        <path
                            fill-rule="evenodd"
                            d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                        />
                    </svg>{" "}
                    Kembali
                </Link>
                <button
                    className="btn btn-success ml-3"
                    style={{ marginLeft: 10, float: "right" }}
                    onClick={onSubmit}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-save-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                    </svg>{" "}
                    Simpan
                </button>
            </div>
        </React.Fragment>
    );
}

export default Form;
