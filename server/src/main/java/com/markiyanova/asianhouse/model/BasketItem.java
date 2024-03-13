package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import lombok.Getter;
import lombok.Setter;

public class BasketItem {

    @Setter
    @Getter
    private long id;

    @Getter
    @Setter
    private MenuItem menu_item;

    @Getter
    @Setter
    private int quantity;

    public static BasketItem toModel(BasketItemEntity basketItem) {
        BasketItem model = new BasketItem();
        model.setId(basketItem.getId());
        model.setMenu_item(MenuItem.toModel(basketItem.getMenuItem()));
        model.setQuantity(basketItem.getQuantity());
        return model;
    }
}
