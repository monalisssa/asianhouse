package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.entity.order.OrderItemEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    List<OrderEntity> findOrderItemEntitiesByBasket(BasketEntity basket);
    List<OrderEntity> findOrderItemEntitiesByDate(Date date);
}
