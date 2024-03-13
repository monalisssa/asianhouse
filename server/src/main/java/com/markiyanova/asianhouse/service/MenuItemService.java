package com.markiyanova.asianhouse.service;

import com.fasterxml.jackson.databind.util.NativeImageUtil;
import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;

import com.markiyanova.asianhouse.model.MenuItem;
import com.markiyanova.asianhouse.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final MenuItemInfoRepository menuItemInfoRepository;
    private final OrderItemRepository orderItemRepository;
    private final BasketItemRepository basketItemRepository;

    public MenuItem createMenuItem(MenuItemEntity menuItem, long menuCategory_id, MultipartFile image) throws IOException {
        MenuItemInfoEntity savedInfo = menuItemInfoRepository.save(menuItem.getMenuItemInfo());
        MenuCategoryEntity menuCategory = menuCategoryRepository.findById(menuCategory_id).get();

        MenuItemEntity menuItemEntity = MenuItemEntity
                .builder()
                .price(menuItem.getPrice())
                .weight(menuItem.getWeight())
                .image(image.getBytes())
                .name(menuItem.getName())
                .menuItemInfo(savedInfo)
                .menuCategory(menuCategory)
                .build();

        return MenuItem.toModel(menuItemRepository.save(menuItemEntity));
    }


    public MenuItem editMenuItem(MenuItemEntity menuItem, long id, long menuCategory_id)
    {
        MenuItemEntity item = menuItemRepository.findById(id).get();
        MenuCategoryEntity menuCategory = menuCategoryRepository.findById(menuCategory_id).get();
        item.setName(menuItem.getName());
        item.setPrice(menuItem.getPrice());
        item.setWeight(menuItem.getWeight());
        item.setMenuCategory(menuCategory);
        item.setMenuItemInfo(menuItem.getMenuItemInfo());
        return MenuItem.toModel(menuItemRepository.save(item));
    }


    public List<MenuItem> getAll() {

        return menuItemRepository.findAll().stream().map(MenuItem::toModel).toList();
    }

    public List<MenuItem> getAllByMenuCategory(long id) {

        MenuCategoryEntity menuCategory = menuCategoryRepository.findById(id).get();
        return menuItemRepository.findMenuItemEntitiesByMenuCategory(menuCategory)
                .stream()
                .map(MenuItem::toModel)
                .toList();

    }

    public Long deleteItem(long id){

        long info_id = menuItemRepository.findById(id).get().getMenuItemInfo().getId();


        orderItemRepository.deleteAllByMenuItemId(id);
        basketItemRepository.deleteBasketItemEntitiesByMenuItemId(id);
        menuItemRepository.deleteById(id);
        menuItemInfoRepository.deleteById(info_id);
        return id;
    }

}
