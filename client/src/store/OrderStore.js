import {makeAutoObservable} from "mobx";

export default class OrderStore {

    constructor() {
        this._orders = []
        this._all_orders = []
        this._isLoad = false;
        makeAutoObservable(this)
    }


    setOrders(orders) {
        this._orders = orders
    }

    setIsLoad(isLoad) {
        this._isLoad = isLoad
    }
    setAllOrders(all_orders) {
        this._all_orders = all_orders
    }

    get orders() {
        return this._orders
    }
    get all_orders() {
        return this._all_orders
    }


    get isLoad() {
        return this._isLoad
    }

}