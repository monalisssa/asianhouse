import {$authHost, $host} from "./index";


export const fetchCategories = async () => {
    const {data} = await $host.get('menu_category/all')
    return data
}

export const deleteItemFromMenu = async (item_id) => {

    const {data} = await $authHost.delete(`menu_item/${item_id}`)
    return data
}

export const deleteCategory = async (category_id) => {

    const {data} = await $authHost.delete(`menu_category/${category_id}`)
    return data
}

export const createMenuItem = async (formData, menu_category_id) => {


    const { data } = await $authHost.post('menu_item', formData, {
        params: { menu_category_id },
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}

export const editMenu = async (formData, item_id, menu_category_id) => {
    const { data } = await $authHost.put(`menu_item/${item_id}`, formData, {
        params: { menu_category_id }
    });
    return data;
};
export const fetchMenuItems = async (menu_category_id) => {

    let url = "menu_item"
    if(menu_category_id == null) url += "/"
    const {data} = await $host.get(url, {params: {
            menu_category_id : menu_category_id}})
    return data
}

export const createCategory = async (formData) => {


    const { data } = await $authHost.post('menu_category', formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}


export const editCategory = async (menu_category_id, name) => {
    const { data } = await $authHost.put(`menu_category/${menu_category_id}?name=${name} `);
    return data;
};