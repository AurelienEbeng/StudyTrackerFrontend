import axios from "axios";
import { baseUrl } from "../constants/url.contants";

const httpModule = axios.create({
    baseURL: baseUrl,
});

export default httpModule;