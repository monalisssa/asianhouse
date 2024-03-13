package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuCategoryRepository extends JpaRepository<MenuCategoryEntity, Long> {

    MenuCategoryEntity findMenuCategoryEntityByName(String name);

}
