package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class Order {
    @Setter
    @Getter
    private long id;

    @Setter
    @Getter
    private long basket_id;

    @Getter
    @Setter
    private BigDecimal sum;

    @Getter
    @Setter
    private String deliveryType;

    @Getter
    @Setter
    private String paymentType;

    @Getter
    @Setter
    private Date date;

    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    private String comment;

    @Getter
    @Setter
    private String status;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String tel;

    @Getter
    @Setter
    private List<OrderItem> orderItemList;


    public static Order toModel(OrderEntity order) {
        Order model = new Order();

        model.setId(order.getId());
        model.setAddress(order.getAddress());
        model.setDate(order.getDate());
        model.setDeliveryType(order.getDelivery_type());
        model.setPaymentType(order.getPayment_type());
        model.setStatus(order.getStatus());
        model.setSum(order.getSum());
        model.setName(order.getName());
        model.setTel(order.getTel());
        model.setComment(order.getComment());
        model.setOrderItemList(order.getOrderItems().stream().map(OrderItem::toModel).toList());
        return model;
    }
}
