import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormItem from "../../components/boostrap/FormItem";

function Form(props) {
    const { field, onChange, onSubmit, errors, edit } = props;
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     props.Get("/api/user/role").then((res) => {
    //         if (res.code == 200) {
    //             let newItems = [];
    //             res.data.map((item) => {
    //                 newItems.push({
    //                     label: item.name,
    //                     value: item.id,
    //                 });
    //             });
    //             setItems(newItems);
    //         }
    //     });
    // }, []);

    return (
        <React.Fragment>
            <div className="row g-2">
                <div className="col-md">
                    <FormItem
                        tipe="text"
                        label="PegID"
                        placeholder="Masukkan PageID/NUPTK"
                        value={field.nuptk}
                        onChange={(e) => onChange("nuptk", e.target.value)}
                        errorMsg={
                            errors && errors["nuptk"] && errors["nuptk"][0]
                        }
                    />
                </div>
                <div className="col-md">
                    <FormItem
                        tipe="text"
                        label="Nama Lengkap"
                        placeholder="Masukkan Nama"
                        value={field.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        errorMsg={errors && errors["name"] && errors["name"][0]}
                    />
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <FormItem
                            tipe="email"
                            label="Email"
                            placeholder="Masukkan Email Valid"
                            value={field.email}
                            onChange={(e) => onChange("email", e.target.value)}
                            errorMsg={
                                errors && errors["email"] && errors["email"][0]
                            }
                        />
                    </div>
                    <div className="col-md">
                        <FormItem
                            tipe="text"
                            label="Tempat Lahir"
                            placeholder="Masukkan Tempat Lahir"
                            value={field.place_of_birth}
                            onChange={(e) =>
                                onChange("place_of_birth", e.target.value)
                            }
                            errorMsg={
                                errors &&
                                errors["place_of_birth"] &&
                                errors["place_of_birth"][0]
                            }
                        />
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <FormItem
                            tipe="date"
                            label="Tanggal Lahir"
                            placeholder="Masukkan Tgl Lahir"
                            value={field.date_of_birth}
                            onChange={(e) =>
                                onChange("date_of_birth", e.target.value)
                            }
                            errorMsg={
                                errors &&
                                errors["date_of_birth"] &&
                                errors["date_of_birth"][0]
                            }
                        />
                    </div>
                    <div className="col-md">
                        <FormItem
                            tipe="text"
                            label="Jenis Kelamin"
                            placeholder="Masukkan Jenis Kelamin"
                            value={field.gender}
                            onChange={(e) => onChange("gender", e.target.value)}
                            errorMsg={
                                errors &&
                                errors["gender"] &&
                                errors["gender"][0]
                            }
                        />
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-md-6">
                        <FormItem
                            tipe="text"
                            label="Posisi Jataban"
                            placeholder="Masukkan Posisi"
                            value={field.position}
                            onChange={(e) =>
                                onChange("position", e.target.value)
                            }
                            errorMsg={
                                errors &&
                                errors["position"] &&
                                errors["position"][0]
                            }
                        />
                    </div>
                </div>
                <div className="row g-1">
                    <div className="col-md">
                        <FormItem
                            tipe="textarea"
                            label="Alamat"
                            placeholder="Masukkan Alamat"
                            value={field.address}
                            onChange={(e) =>
                                onChange("address", e.target.value)
                            }
                            errorMsg={
                                errors &&
                                errors["address"] &&
                                errors["address"][0]
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Link to="/dashboard/guru" className="btn btn-danger">
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
