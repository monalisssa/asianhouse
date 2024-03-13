package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.sql.Blob;
import java.util.Base64;
import java.util.List;

public class MenuItem {

    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private double price;

    @Getter
    @Setter
    private int weight;

    @Getter
    @Setter
    private byte[] image;

    @Getter
    @Setter
    private MenuItemInfo menuItemInfo;

    @Getter
    @Setter
    private MenuCategory menuCategory;


    public static MenuItem toModel(MenuItemEntity menuItemEntity)
    {
        MenuItem model = new MenuItem();
        model.setId(menuItemEntity.getId());
        model.setName(menuItemEntity.getName());
        model.setPrice(menuItemEntity.getPrice());
        model.setWeight(menuItemEntity.getWeight());
        model.setImage(menuItemEntity.getImage());
        model.setMenuCategory(MenuCategory.toModel(menuItemEntity.getMenuCategory()));
        model.setMenuItemInfo(MenuItemInfo.toModel(menuItemEntity.getMenuItemInfo()));
        return model;
    }



}
