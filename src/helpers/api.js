import {config} from "../config";

export function callAPI(action, data, callback, callbackError) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                callback(JSON.parse(xmlHttp.responseText));
            } else {
                if (callbackError instanceof Function) {
                    callbackError(xmlHttp.statusText);
                }
            }
        }
    };
    xmlHttp.open('post', config.api_url + action);
    xmlHttp.send(data);
}

export function setCookie(name, val) {
    const date = new Date();
    const value = val;

    // Set it expire in 30 days
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString();
}

export function getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');

    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

export function deleteCookie(name) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + '=; expires=' + date.toUTCString();
}

export function quickCheckToken() {
    const currentURI = window.location.pathname.substr(1);
    if (!['login', 'signup','loginGoogle'].includes(currentURI)) {
        if (!getCookie(config.cookie_name)) {
            return false;
        }
    }
    return true;
}

export function checkTokenValid() {
    const currentURI = window.location.pathname.substr(1);
    if (!['login', 'signup','loginGoogle'].includes(currentURI)) {
        if (!getCookie(config.cookie_name)) {
            window.location.href = '/login';
        }else{
            const params = new FormData();
            params.append('token', getCookie(config.cookie_name));
            callAPI('checkToken', params, function (res) {
                if (!res.success) {
                    window.location.href = '/login';
                }
            });
        }
    }
}
