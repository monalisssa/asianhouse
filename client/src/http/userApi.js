import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (username, password, role_id) => {
    const {data} =  await $host.post('users/registration', {username, password}, {
        params: { role_id }})
    if(role_id === 2) localStorage.setItem('token', data.token)
    return jwtDecode(data.token)

}

export const login = async (username, password) => {

    const {data} =  await $host.post('users/authenticate', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const fetchAllUsers = async () => {

    const {data} = await $authHost.get(`users/all`)
    return data
}

export const fetchUser = async (id) => {

    const {data} = await $authHost.get(`users`, {
        params: { id }})
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('users/refresh_token' )
    if(data.token !== "") {
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
    else return null
}

export const editStatusUser = async (user_id, status) => {
    console.log(status);
    const { data } = await $authHost.put(`users/edit_status/${user_id}?status=${status}`);
    return data;
};

export const addUserInfo = async (formData, user_id) => {


    const { data } = await $authHost.put('users/add_user_info', formData, {
        params: { user_id },
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}


export const editAvatar = async (formData, user_id) => {


    const { data } = await $authHost.put('users/edit_avatar/' + user_id, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}


export const editInfo = async (formData, user_id) => {


    const { data } = await $authHost.put('users/edit_info/' + user_id, formData);
    return data;
}