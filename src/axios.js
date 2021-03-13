import axios from "axios";

const instance =axios.create({
    baseURL:'http://localhost:5001/challenge-10e76/us-central1/api'// the API (cloud fn) URL
});
// wrote https instead of http ,wasted 4 hrs!!!!!!!!!!

export default instance;