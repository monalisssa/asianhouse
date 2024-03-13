package com.markiyanova.asianhouse.model;



import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;
import java.util.List;

@Getter
public class MenuCategory
{
    @Setter
    private long id;

    @Setter
    private String name;

    @Getter
    @Setter
    private byte[] image;

    public static MenuCategory toModel(MenuCategoryEntity entity) {
        MenuCategory model = new MenuCategory();
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setImage(entity.getImage());
        return model;
    }

}
