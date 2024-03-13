package com.markiyanova.asianhouse.service;


import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.entity.order.OrderItemEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import com.markiyanova.asianhouse.model.Order;
import com.markiyanova.asianhouse.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.*;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final MenuItemRepository menuItemRepository;
    private final BasketItemRepository basketItemRepository;
    private final BasketRepository basketRepository;
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    
    public Order createOrder(long user_id, OrderEntity orderEntity) {

        UserEntity user = userRepository.findById(user_id).get();
        BasketEntity basket = basketRepository.findBasketEntityByUser(user);
        orderEntity.setBasket(basket);
        orderEntity.setDate(new Date());
        orderEntity.setStatus("Оформлен");
        OrderEntity savedOrder = orderRepository.save(orderEntity);
        savedOrder.setOrderItems( addItemToOrder(orderEntity, basket));
        return Order.toModel(savedOrder);
    }


    public List<OrderItemEntity> addItemToOrder(OrderEntity order, BasketEntity basket) {

        List<OrderItemEntity> order_items = new ArrayList<>();
        List<BasketItemEntity> basket_items = basketItemRepository.findBasketItemEntitiesByBasket(basket);
        basket_items.forEach(basketItem ->
        {
            OrderItemEntity newOrderItem = OrderItemEntity.builder()
                    .menuItem(basketItem.getMenuItem())
                    .order(order)
                    .quantity(basketItem.getQuantity())
                    .build();
            order_items.add( orderItemRepository.save(newOrderItem));
        });

        return order_items;
    }


    public List<Order> getAllUserOrders(long user_id) {
        UserEntity user = userRepository.findById(user_id).get();
        BasketEntity basket = basketRepository.findBasketEntityByUser(user);
        return orderRepository.findOrderItemEntitiesByBasket(basket).stream().map(Order::toModel).toList();
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll().stream().map(Order::toModel).toList();
    }

    public Order editStatus(long id, String status) {

        OrderEntity order = orderRepository.findById(id).get();
        order.setStatus(status);
        return Order.toModel(orderRepository.save(order));
    }

    public Order editComment(long id, String comment) {

        OrderEntity order = orderRepository.findById(id).get();
        order.setComment(comment);
        return Order.toModel(orderRepository.save(order));
    }

    public HashMap<String, Integer> getOrderMenuCategoryStatistics(long user_id)
    {
        HashMap<String, Integer> statistics = new HashMap<>();

        UserEntity user = userRepository.findById(user_id).get();
        BasketEntity basket = basketRepository.findBasketEntityByUser(user);

        orderRepository.findOrderItemEntitiesByBasket(basket).forEach(order ->
                    {
                        orderItemRepository.findOrderItemEntitiesByOrder(order).forEach(orderItem ->
                                {
                                    MenuItemEntity menuItem = menuItemRepository.findById(orderItem.getMenuItem().getId()).get();

                                    if (statistics.get(menuItem.getMenuCategory().getName()) != null) {
                                        statistics.replace(menuItem.getMenuCategory().getName(), statistics.get(menuItem.getMenuCategory().getName()) + orderItem.getQuantity());
                                    } else statistics.put(menuItem.getMenuCategory().getName(), orderItem.getQuantity());

                                }
                        );
                    }

            );
        List<MenuCategoryEntity> categoryEntities = menuCategoryRepository.findAll();
        categoryEntities.forEach(category -> {
            statistics.putIfAbsent(category.getName(), 0);
        });
        return statistics;
    }


    public  ArrayList<Map.Entry<LocalDate, Long>> getOrderMonthStatistics()
    {

        HashMap<LocalDate, Long> statistics = new HashMap<>();
        List<OrderEntity> orders = orderRepository.findAll();
        LocalDate startDate = LocalDate.now().withDayOfMonth(1); // Начальная дата (первое число текущего месяца)
        LocalDate endDate = LocalDate.now().plusMonths(1).withDayOfMonth(1).minusDays(1); // Конечная дата (последний день текущего месяца)

        List<LocalDate> dateList = new ArrayList<>();

        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            dateList.add(currentDate);
            currentDate = currentDate.plusDays(1);
        }

        dateList.forEach(localDate ->
        {
            long count = orders.stream().filter(order-> order.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().toString().equals(localDate.toString())).count();
            statistics.put(localDate, count);
        });

        TreeMap<LocalDate, Long> sortedStatistics = new TreeMap<>(statistics);
        ArrayList<Map.Entry<LocalDate, Long>> dataList = new ArrayList<>(sortedStatistics.entrySet());
        return dataList;
    }


}
