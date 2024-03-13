package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

public class MenuItemInfo {

    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String ingredients;

    private boolean is_spicy;

    public boolean getIs_spicy() {
        return is_spicy;
    }

    public void setIs_spicy(boolean is_spicy) {
        this.is_spicy = is_spicy;
    }

    @Getter
    @Setter
    private double calories;


    public static MenuItemInfo toModel(MenuItemInfoEntity menuItemInfoEntity)
    {
        MenuItemInfo model = new MenuItemInfo();
        model.setId(menuItemInfoEntity.getId());
        model.setIngredients(menuItemInfoEntity.getIngredients());
        model.setIs_spicy(menuItemInfoEntity.getIs_spicy());
        model.setCalories(menuItemInfoEntity.getCalories());
        return model;
    }
}
