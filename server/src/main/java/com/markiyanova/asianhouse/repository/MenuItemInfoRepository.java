package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemInfoRepository extends JpaRepository <MenuItemInfoEntity, Long> {
}
