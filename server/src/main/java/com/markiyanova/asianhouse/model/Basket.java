package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.user.BasketEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class Basket {

    @Setter
    @Getter
    private long id;

    @Getter
    @Setter
    private List<BasketItem> basketItemList;

    public static Basket toModel(BasketEntity basket) {
        Basket model = new Basket();
        model.setId(basket.getId());
        model.setBasketItemList(basket.getBasketItems().stream().map(BasketItem::toModel).toList());
        return model;
    }

}
