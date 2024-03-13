package com.markiyanova.asianhouse.controllers;


import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.service.BasketService;
import com.markiyanova.asianhouse.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {


    private final OrderService orderService;

    @PostMapping("/{user_id}")
    public ResponseEntity create(@PathVariable long user_id, @RequestBody OrderEntity order) {
        try {
            return ResponseEntity.ok(orderService.createOrder(user_id, order));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @GetMapping("/{user_id}")
    public ResponseEntity getOrders(@PathVariable long user_id) {
        try {
            return ResponseEntity.ok(orderService.getAllUserOrders(user_id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @PutMapping("/edit_status/{order_id}")
    public ResponseEntity editStatus(@PathVariable long order_id, @RequestParam String status) {
        try {
            return ResponseEntity.ok(orderService.editStatus(order_id,status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @PutMapping("/edit_comment/{order_id}")
    public ResponseEntity editComment(@PathVariable long order_id, @RequestParam String comment) {
        try {
            return ResponseEntity.ok(orderService.editComment(order_id,comment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/all")
    public ResponseEntity getAllOrders() {
        try {
            return ResponseEntity.ok(orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/statistics/{user_id}")
    public ResponseEntity getStatistics(@PathVariable long user_id) {
        try {
            return ResponseEntity.ok(orderService.getOrderMenuCategoryStatistics(user_id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/month_statistics")
    public ResponseEntity getMonthStatistics() {
        try {
            return ResponseEntity.ok(orderService. getOrderMonthStatistics());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

}
