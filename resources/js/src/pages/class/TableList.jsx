import React, { useContext, useEffect, useState, Fragment } from "react";

import { ActionContext } from "../../context/actions";
import { Link } from "react-router-dom";

import BreadCrumb from "../../components/boostrap/breadcrumb";
import ReactParse from "html-react-parser";
import Loading from "../../components/boostrap/Loading";
import StoreNotification from "../../components/Notification";

import ImageIcon from "../../assets/icon.jpeg";

function TableList() {
    const actions = useContext(ActionContext);
    const [data, setData] = useState(null);
    const [idSelected, setIdSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const myAccess = actions.StatusAccess(actions.me, "Guru");

    useEffect(() => {
        GetList();
    }, []);

    const GetList = async (url = "/api/class_room/list") => {
        setLoading(true);
        const res = await actions.Get(url);
        if (res.code == 200) {
            setTimeout(() => {
                setLoading(false);
                setData(res.data);
            }, 1000);
        } else {
            alert(res.message);
        }
    };

    const confirmDelete = async () => {
        const res = await actions.Delete(`/api/class_room/${idSelected}`);

        if (res.code == 200) {
            StoreNotification({
                title: "Informasi",
                message: "Kelas Berhasil dihapus !",
                type: "success",
            });
            setTimeout(() => {
                GetList();
            }, 500);
        } else {
            return StoreNotification({
                title: "Warning",
                message: res.message,
                type: "warning",
            });
        }
    };

    return (
        <Fragment>
            <BreadCrumb
                main_label="Kelas"
                main_label_url="/dashboard/kelas"
                active_label="Table"
            />

            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-8">Daftar Kelas</div>
                        <div className="col-md-4">
                            {myAccess[0] &&
                                myAccess[0].indexOf("create") !== -1 && (
                                    <Link
                                        to="/dashboard/kelas?action=add"
                                        style={{ float: "right" }}
                                        className="btn btn-success btn-sm"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-plus-square-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                        </svg>{" "}
                                        Tambah Kelas Baru
                                    </Link>
                                )}
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="card-body">
                        <div className="row mb-3">
                            {data && data.data.length > 0 ? (
                                data.data.map((item, key) => {
                                    return (
                                        <div
                                            key={key}
                                            class={`col-md-4 ${
                                                key > 2 ? "mt-3" : ""
                                            }`}
                                        >
                                            <Link
                                                to={`/dashboard/kelas?action=detail&id=${item.id}`}
                                            >
                                                <div className="card p-0">
                                                    <div
                                                        class="card-body"
                                                        style={{
                                                            backgroundImage: `url(${ImageIcon})`,
                                                            height: 100,
                                                            width: "100%",
                                                            backgroundRepeat:
                                                                "no-repeat",
                                                            backgroundSize:
                                                                "cover",
                                                        }}
                                                    />

                                                    <div className="card-body">
                                                        <h5 class="card-title">
                                                            {item.name}
                                                        </h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">
                                                            Tahun Ajaran :{" "}
                                                            {item.school_year}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p style={{ textAlign: "center" }}>
                                    Data Kelas Belum ada
                                </p>
                            )}
                        </div>

                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {data &&
                                    data.data.length > 0 &&
                                    data.links.map((item, key) => {
                                        return (
                                            <li
                                                key={key}
                                                className={`page-item ${
                                                    item.active && "active"
                                                }`}
                                            >
                                                <Link
                                                    className="page-link"
                                                    onClick={() =>
                                                        GetList(item.url)
                                                    }
                                                    to=""
                                                >
                                                    {ReactParse(item.label)}
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default TableList;
