import {$authHost} from "./index";


export const fetchBasketItems = async (user_id) => {

    const {data} = await $authHost.get(`basket/items`, {params: {
       user_id : user_id}})
    return data
}

export const deleteItem = async (item_id) => {

    const {data} = await $authHost.delete(`basket/items/${item_id}`)
    return data
}

export const deleteAll = async (user_id) => {

    const {data} = await $authHost.delete(`basket/${user_id}`)
    return data
}

export const addItem = async (user_id, item_id) => {
    const { data } = await $authHost.post(`basket/${user_id}/`, null, {
        params: { item_id: item_id, quantity: 1 }
    });
    return data;
};



export const editQuantity = async (item_id, quantity) => {
    const { data } = await $authHost.put(`basket/items/${item_id}`, null, {
        params: { quantity: quantity }
    });
    return data;
};