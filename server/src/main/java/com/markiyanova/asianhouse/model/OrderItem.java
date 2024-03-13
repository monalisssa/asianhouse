package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.order.OrderItemEntity;
import lombok.Getter;
import lombok.Setter;

public class OrderItem {

    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private MenuItem menu_item;

    @Getter
    @Setter
    private int quantity;

    public static OrderItem toModel(OrderItemEntity orderItem) {
        OrderItem model = new OrderItem();
        model.setId(orderItem.getId());
        model.setMenu_item(MenuItem.toModel(orderItem.getMenuItem()));
        model.setQuantity(orderItem.getQuantity());
        return model;
    }
}
