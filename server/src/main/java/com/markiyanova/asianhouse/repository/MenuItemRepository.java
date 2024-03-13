package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.model.MenuCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItemEntity, Long> {
    List<MenuItemEntity> findMenuItemEntitiesByMenuCategory(MenuCategoryEntity menuCategory);
}
