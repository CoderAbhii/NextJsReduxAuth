import axios from "axios";
import Cookies from "js-cookie";

export const commonRequest = async (methods, url, body, header) => {
    let config = {
        method: methods,
        url,
        headers: header ? header : {
            "Content-Type": "application/json",
            "token": Cookies.get("x-http-core")
        },
        data: body
    }
    return axios(config).then((data) => {
        return data
    }).catch((error) => {
        return error.response
    })
}