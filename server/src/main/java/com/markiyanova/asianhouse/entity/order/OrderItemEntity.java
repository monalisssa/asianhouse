package com.markiyanova.asianhouse.entity.order;


import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Entity
@Table(name = "order_item")
public class OrderItemEntity {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public OrderItemEntity(){};


    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "menu_item_id")
    private MenuItemEntity menuItem;


    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    @Getter
    @Setter
    private int quantity;


    public OrderItemEntity(MenuItemEntity menuItem, OrderEntity order, int quantity) {
        this.menuItem = menuItem;
        this.order = order;
        this.quantity = quantity;
    }

    public OrderItemEntity(long id, MenuItemEntity menuItem, OrderEntity order, int quantity) {
        this.id = id;
        this.menuItem = menuItem;
        this.order = order;
        this.quantity = quantity;
    }
}
