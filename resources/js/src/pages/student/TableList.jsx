import React, { useContext, useEffect, useState, Fragment } from "react";

import { ActionContext } from "../../context/actions";
import { Link } from "react-router-dom";
import moment from "moment";

import BreadCrumb from "../../components/boostrap/breadcrumb";
import ReactParse from "html-react-parser";
import Modal from "../../components/boostrap/Modal";
import Loading from "../../components/boostrap/Loading";
import StoreNotification from "../../components/Notification";

function TableList() {
    const actions = useContext(ActionContext);
    const [data, setData] = useState(null);
    const [idSelected, setIdSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const myAccess = actions.StatusAccess(actions.me, "Siswa");

    useEffect(() => {
        GetList();
    }, []);

    const GetList = async (url = "/api/student/list") => {
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
        const res = await actions.Delete(`/api/student/${idSelected}`);

        if (res.code == 200) {
            StoreNotification({
                title: "Informasi",
                message: "Siswa Berhasil dihapus !",
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

    console.log("myaccess", myAccess);
    return (
        <Fragment>
            <BreadCrumb
                main_label="Siswa"
                main_label_url="/dashboard/siswa"
                active_label="Table"
            />
            <Modal id="delete-siswa" title="Konfirmasi">
                <p className="text-center">
                    Apakah yakin ingin menghapus data siswa ini ?
                </p>
                <center>
                    <button
                        type="button"
                        className="btn btn-info"
                        data-bs-dismiss="modal"
                        style={{ marginRight: 10 }}
                    >
                        Kambali
                    </button>
                    <button
                        onClick={confirmDelete}
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                    >
                        Hapus
                    </button>
                </center>
            </Modal>

            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-8">Daftar Siswa</div>
                        <div className="col-md-4">
                            {myAccess[0] &&
                                myAccess[0].indexOf("create") !== -1 && (
                                    <Link
                                        to="/dashboard/siswa?action=add"
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
                                        Tambah Siswa
                                    </Link>
                                )}
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NIS</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Nama </th>
                                    <th scope="col">Orang Tua Wali</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col" style={{ float: "right" }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.data.map((item, key) => {
                                        return (
                                            <tr key={key}>
                                                <th scope="row">{key + 1}</th>
                                                <td>{item.nis}</td>
                                                <td>{item.email}</td>
                                                <td>{item.name}</td>
                                                <td>{item.guardian_parent}</td>
                                                <td>{item.gender}</td>
                                                <td style={{ float: "right" }}>
                                                    {myAccess[0] &&
                                                        myAccess[0].indexOf(
                                                            "update"
                                                        ) !== -1 && (
                                                            <Link
                                                                className="btn btn-info btn-sm"
                                                                to={`/dashboard/siswa?action=edit&id=${item.id}`}
                                                            >
                                                                Ubah
                                                            </Link>
                                                        )}

                                                    {myAccess[0] &&
                                                        myAccess[0].indexOf(
                                                            "delete"
                                                        ) !== -1 && (
                                                            <Link
                                                                className="btn btn-danger btn-sm"
                                                                to="#"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#delete-siswa"
                                                                onClick={() =>
                                                                    setIdSelected(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                Hapus
                                                            </Link>
                                                        )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {data
                                    ? data.links.map((item, key) => {
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
                                      })
                                    : "-"}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default TableList;
