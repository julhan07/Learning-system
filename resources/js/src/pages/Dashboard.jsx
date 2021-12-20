import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./dashboard.css";
import Home from "./home/Statistic";
import User from "./user/index";
import Teacher from "./teacher/index";
import Student from "./student/index";
import ClassIndex from "./class/index";

function Dashboard() {
    return (
        <div>
            <Navbar />

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="siswa" element={<Student />} />
                            <Route path="user" element={<User />} />
                            <Route path="guru" element={<Teacher />} />
                            <Route path="kelas" element={<ClassIndex />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
