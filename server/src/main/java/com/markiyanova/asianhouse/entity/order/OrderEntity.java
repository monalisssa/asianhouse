package com.markiyanova.asianhouse.entity.order;

import com.markiyanova.asianhouse.entity.user.BasketEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;



@Entity
@Table(name = "orders")
public class OrderEntity {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public OrderEntity(){};

    @Getter
    @Setter
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItemEntity> orderItems;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "basket_id")
    private BasketEntity basket;

    @Getter
    @Setter
    private BigDecimal sum;

    @Getter
    @Setter
    private String delivery_type;

    @Getter
    @Setter
    private String payment_type;

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


}
