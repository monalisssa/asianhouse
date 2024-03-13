package com.markiyanova.asianhouse.controllers;


import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.exception.MenuCategoryWithThisNameAlreadyExistException;
import com.markiyanova.asianhouse.exception.UserNotFoundException;
import com.markiyanova.asianhouse.service.MenuCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/menu_category")
@RequiredArgsConstructor
public class MenuCategoryController {

    private final MenuCategoryService menuCategoryService;


    @PostMapping
    public ResponseEntity create(@RequestPart("name") String name, @RequestPart("image") MultipartFile image) {
        try {
            return ResponseEntity.ok(menuCategoryService.createMenuCategory(name, image));
        }
        catch (MenuCategoryWithThisNameAlreadyExistException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @GetMapping("/all")
    public ResponseEntity getMenuCategories()
    {
        try{
            return ResponseEntity.ok(menuCategoryService.getAll());
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem(@PathVariable long id)
    {

        try{
            return ResponseEntity.ok(menuCategoryService.deleteCategory(id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity editCategory(@PathVariable long id, @RequestParam String name)
    {
        try{
            return ResponseEntity.ok(menuCategoryService.editCategory(id, name));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

}
