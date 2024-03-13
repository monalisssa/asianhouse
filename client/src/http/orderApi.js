import {$authHost} from "./index";

export const addOrder = async (user_id, name, tel, payment, address, delivery, comment, sum) => {
    const { data } = await $authHost.post(`order/${user_id}`,
        {
            name: name,
            tel : tel,
            delivery_type: delivery,
            payment_type: payment,
            address: address,
            comment: comment,
            sum: sum
        }
    );
    return data;
};


export const fetchOrders = async (user_id) => {

    const {data} = await $authHost.get(`order/${user_id}`)
    return data
}
export const editStatusOrder = async (order_id, status) => {
    console.log(status);
    const { data } = await $authHost.put(`order/edit_status/${order_id}?status=${status}`);
    return data;
};

export const editComment = async (order_id, comment) => {
    const { data } = await $authHost.put(`order/edit_comment/${order_id}?comment=${comment}`);
    return data;
};

export const fetchAllOrders = async () => {

    const {data} = await $authHost.get(`order/all`)
    return data
}

export const fetchCategoryOrderStatistics = async (user_id) => {

    const {data} = await $authHost.get(`order/statistics/${user_id}`)
    return data
}

export const fetchDateOrderStatistics = async () => {

    const {data} = await $authHost.get(`order/month_statistics`)
    return data
}

