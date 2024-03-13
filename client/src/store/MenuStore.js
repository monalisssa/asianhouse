import {makeAutoObservable} from "mobx";

export default class MenuStore {
    constructor() {
        this._categories= []
        this._items = []
        this._all_items = []
        this._isSelected = false
        this._sortingOrder = "DESC"
        this._selectedCategory = {}

        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }

    setIsSelected(isSelected) {
        this._isSelected = isSelected
    }

    setSortingOrder() {
        if(this._sortingOrder === "DESC")
        this._sortingOrder = "ASC"
        else this._sortingOrder = "DESC"
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
        this._isSelected = true
    }


    setItems(items) {
        this._items = items
    }

    setAllItems(all_items) {
        this._all_items = all_items
    }

    get categories() {
        return this._categories
    }
    get items() {
        return this._items
    }

    get all_items() {
        return this._all_items
    }
    get selectedCategory() {
        return this._selectedCategory
    }

    get isSelected() {
        return this._isSelected
    }

    get sortingOrder() {
        return this._sortingOrder
    }

    get sortedItems() {
        if(this._sortingOrder === "DESC")
        return this._items.slice().sort((a, b) => a.price - b.price);
        else  return this._items.slice().sort((a, b) => b.price - a.price);
    }



}