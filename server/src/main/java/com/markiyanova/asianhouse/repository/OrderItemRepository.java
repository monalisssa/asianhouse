package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.entity.order.OrderItemEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
    List<OrderItemEntity> findOrderItemEntitiesByOrder(OrderEntity order);

    void deleteAllByMenuItemId(long id);
}
