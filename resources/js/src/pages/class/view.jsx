import React, { useContext, useState, useCallback, useEffect } from "react";
import { ActionContext } from "../../context/actions";
import StoreNotification from "../../components/Notification";
import FormItem from "../../components/boostrap/FormItem";
import BreadCrumb from "../../components/boostrap/breadcrumb";
import UserIcon from "../../assets/user-icon.png";
import Modal from "../../components/boostrap/Modal";
import { Link } from "react-router-dom";

function View(props) {
    const actions = useContext(ActionContext);
    const [field, setField] = useState({
        name: "",
        teacher_id: "",
    });
    const [searchField, setSearchField] = useState("");
    const [listSiswa, setListSiswa] = useState([]);
    const [listSiswaOfClass, setSiswaOfClass] = useState([]);
    const myAccess = actions.StatusAccess(actions.me, "Guru");

    useEffect(() => {
        GetListID();
        GetListSiswaOfClass();
    }, []);

    const saveSiswaToClass = (dataSelected) => {
        let newDataSelected = {
            student_id: dataSelected.id,
            class_room_id: props.id,
        };

        actions
            .Create(`/api/class_room_student/create`, newDataSelected)
            .then((res) => {
                if (res.code == 200) {
                    StoreNotification({
                        title: "Informasi",
                        message: "Siswa Berhasil ditambahkan ke kelas ini",
                        type: "success",
                    });
                    GetListSiswaOfClass();
                } else {
                    StoreNotification({
                        title: "Warning",
                        message: res.message,
                        type: "warning",
                    });
                }

                setListSiswa([]);
            });
    };

    const GetListSiswaOfClass = () => {
        actions.Get(`/api/class_room/${props.id}/students`).then((res) => {
            if (res.code == 200) {
                setSiswaOfClass(res.data.data);
            }
        });
    };

    const GetListSiswa = (search) => {
        actions
            .Get(`/api/student/list?limit=100&search=${searchField}`, {})
            .then((res) => {
                if (res.code == 200) {
                    setListSiswa(res.data.data);
                }
            });
    };

    const GetListID = useCallback(async () => {
        actions.Get(`/api/class_room/${props.id}`, {}).then((res) => {
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
                main_label="Siswa"
                main_label_url="/dashboard/kelas"
                active_label="Detail"
            />

            <Modal id="tambah-siswa" title="Tambah Siswa">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan NIS/Nama Siswa"
                        aria-describedby="basic-addon2"
                        aria-label="Recipient's username"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    />
                    <button
                        onClick={() => GetListSiswa()}
                        type="submit"
                        className="btn btn-success"
                    >
                        Search
                    </button>
                </div>

                {listSiswa && listSiswa.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {listSiswa.map((item) => {
                            return (
                                <li key={item.id} className="list-group-item">
                                    {item.nis} - {item.name}{" "}
                                    <a href="#">
                                        <span
                                            style={{ marginLeft: 10 }}
                                            class="badge bg-light text-dark"
                                            data-bs-dismiss="modal"
                                            onClick={() =>
                                                saveSiswaToClass(item)
                                            }
                                        >
                                            Tambahkan
                                        </span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    ""
                )}
            </Modal>

            <div className="col-md-12">
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h5>Rincian Kelas</h5>
                                <FormItem
                                    tipe="text"
                                    label="Nama Kelas"
                                    value={field.name}
                                    disabled={true}
                                />
                                <FormItem
                                    tipe="text"
                                    label="Tahun Ajaran"
                                    value={field.school_year}
                                    disabled={true}
                                />
                                <FormItem
                                    tipe="text"
                                    label="Nomor Induk Guru Kelas"
                                    value={field.nuptk}
                                    disabled={true}
                                />

                                <FormItem
                                    tipe="text"
                                    label="Guru Kelas"
                                    value={field.teacher_name}
                                    disabled={true}
                                />

                                <FormItem
                                    tipe="text"
                                    label="Email Guru Kelas"
                                    value={field.teacher_email}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-md-6">
                                <h5>Daftar siswa</h5>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            {listSiswaOfClass.length > 0 ? (
                                                listSiswaOfClass.map(
                                                    (item, key) => {
                                                        return (
                                                            <div
                                                                key={key}
                                                                className={`col-md-3 mt-2`}
                                                            >
                                                                <center>
                                                                    <img
                                                                        src={
                                                                            UserIcon
                                                                        }
                                                                        width={
                                                                            30
                                                                        }
                                                                        style={{
                                                                            borderRadius: 20,
                                                                            marginRight: 10,
                                                                        }}
                                                                        alt=""
                                                                    />
                                                                    <br />
                                                                    <span>
                                                                        {
                                                                            item.student_name
                                                                        }
                                                                    </span>
                                                                </center>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <p
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Tidak Ada siswa dikelas ini
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {myAccess[0] &&
                                    myAccess[0].indexOf("create") !== -1 && (
                                        <button
                                            className="btn btn-success btn-sm mt-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="#tambah-siswa"
                                        >
                                            Invite Siswa
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
