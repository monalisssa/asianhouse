package com.markiyanova.asianhouse.controllers;


import com.markiyanova.asianhouse.service.BasketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/basket")
@RequiredArgsConstructor
public class BasketController {

    private final BasketService basketService;

    @PostMapping("/{user_id}/")
    public ResponseEntity create(@PathVariable long user_id, @RequestParam long item_id, @RequestParam int quantity) {
        try {
            return ResponseEntity.ok(basketService.addItemToBasket(user_id,item_id,quantity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/items")
    public ResponseEntity getAllItems(@RequestParam long user_id) {
        try {
            return ResponseEntity.ok(basketService.getBasketItems(user_id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e);
        }

    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity deleteItem(@PathVariable long id)
    {

        try{
            return ResponseEntity.ok(basketService.deleteItemFromBasket(id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }


    @PutMapping ("/items/{id}")
    public ResponseEntity editQuantity(@PathVariable long id, @RequestParam int quantity)
    {

        try{
            return ResponseEntity.ok(basketService.editQuantity(id, quantity));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @DeleteMapping("/{user_id}")
    public ResponseEntity deleteAllItems(@PathVariable long user_id)
    {

        try{
            return ResponseEntity.ok(basketService.deleteAllItems(user_id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

}
