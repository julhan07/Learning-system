import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
});

instance.defaults.headers.common[
    "Authorization"
] = `Bearer ${localStorage.getItem("access_token")}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
