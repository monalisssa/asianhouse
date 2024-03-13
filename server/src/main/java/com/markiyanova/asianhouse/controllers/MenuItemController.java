package com.markiyanova.asianhouse.controllers;

import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import com.markiyanova.asianhouse.exception.MenuCategoryWithThisNameAlreadyExistException;
import com.markiyanova.asianhouse.service.MenuItemService;
import com.markiyanova.asianhouse.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/menu_item")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseEntity createMenuItem(@RequestParam long menu_category_id, @RequestPart("data") MenuItemEntity menuItem, @RequestPart("image") MultipartFile image) {
        try {
            System.out.println(menuItem.getName());
            return ResponseEntity.ok(menuItemService.createMenuItem(menuItem, menu_category_id, image));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/")
    public ResponseEntity getAllItems() {
        try {
            return ResponseEntity.ok(menuItemService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping
    public ResponseEntity getAllItemsByCategory(@RequestParam long menu_category_id) {
        try {
            return ResponseEntity.ok(menuItemService.getAllByMenuCategory(menu_category_id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem(@PathVariable long id)
    {

        try{
            return ResponseEntity.ok(menuItemService.deleteItem(id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity editItem(@PathVariable long id, @RequestParam long menu_category_id, @RequestPart("data") MenuItemEntity menuItem)
    {
        try{
            return ResponseEntity.ok(menuItemService.editMenuItem(menuItem, id, menu_category_id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }
}
