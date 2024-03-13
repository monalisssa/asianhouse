import {makeAutoObservable} from "mobx";


export default class BasketStore {

    constructor() {
        this._basketItems = []
        makeAutoObservable(this)
    }

    setBasketItems(basketItems) {
        this._basketItems = basketItems
    }

    setIsOpen(isOpen) {
        this._isOpen = isOpen
    }


    get basketItems() {
        return this._basketItems
    }


    // eslint-disable-next-line getter-return
    get sum() {
        return this._basketItems.basketItemList.reduce((sum, item) => sum + item.menu_item.price * item.quantity, 0).toFixed(2)

    }


}