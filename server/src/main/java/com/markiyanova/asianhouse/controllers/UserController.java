package com.markiyanova.asianhouse.controllers;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import com.markiyanova.asianhouse.entity.user.UserInfoEntity;
import com.markiyanova.asianhouse.exception.UserAlreadyExistException;
import com.markiyanova.asianhouse.exception.UserIsBlockedException;
import com.markiyanova.asianhouse.exception.UserNotFoundException;
import com.markiyanova.asianhouse.security.auth.AuthenticationRequest;
import com.markiyanova.asianhouse.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody UserEntity user, @RequestParam long role_id)
    {
        try{
            return ResponseEntity.ok(userService.registration(user, role_id));
        }
        catch (UserAlreadyExistException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping ("/add_user_info")
    public ResponseEntity add_user_info(@RequestParam long user_id, @RequestPart("info") UserInfoEntity userInfo, @RequestPart(value = "avatar", required = false) MultipartFile avatar)
    {
        try{
            return ResponseEntity.ok(userService.add_user_info(user_id, userInfo, avatar));
        }

        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }
    @PostMapping("/authenticate")
    public ResponseEntity authenticate(
            @RequestBody AuthenticationRequest request) {
        try
        {
            return ResponseEntity.ok(userService.authenticate(request));
        }
        catch (UserIsBlockedException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Не верный пароль или логин!");
        }

    }

    @GetMapping("/refresh_token")
    public ResponseEntity refresh_token(HttpServletRequest request) {
        try
        {
            return ResponseEntity.ok(userService.refreshToken(request));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Токен не валидный!");
        }

    }

    @GetMapping("/all")
    public ResponseEntity getUsers()
    {
        try{

            return ResponseEntity.ok(userService.getAll());
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @GetMapping
    public ResponseEntity getOneUser(@RequestParam long id)
    {
        try{
            return ResponseEntity.ok(userService.getOne(id));
        }
        catch (UserNotFoundException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable long id)
    {
        try{
            return ResponseEntity.ok(userService.delete(id));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }
    }

    @PutMapping("/edit_status/{user_id}")
    public ResponseEntity editStatus(@PathVariable long user_id, @RequestParam String status) {
        try {
            return ResponseEntity.ok(userService.editStatus(user_id,status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/edit_avatar/{user_id}")
    public ResponseEntity editStatus(@PathVariable long user_id, @RequestPart("avatar") MultipartFile avatar) {
        try {
            return ResponseEntity.ok(userService.editAvatar(user_id,avatar));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }

    @PutMapping("/edit_info/{user_id}")
    public ResponseEntity editStatus(@PathVariable long user_id, @RequestPart("info") UserInfoEntity userInfo) {
        try {
            return ResponseEntity.ok(userService.editInfo(user_id, userInfo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Произошла ошибка!");
        }

    }
}
