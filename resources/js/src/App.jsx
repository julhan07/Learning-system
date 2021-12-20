import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/login";
import ActionContainer from "./context/actions";
import ReactNotification from "react-notifications-component";

function App() {
    return (
        <div className="App">
            <ReactNotification />
            <ActionContainer>
                <Routes>
                    <Route path="dashboard/*" element={<Dashboard />} />
                    <Route path="login" element={<LoginPage />} />
                </Routes>
            </ActionContainer>
        </div>
    );
}

export default App;
