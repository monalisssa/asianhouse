package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasketRepository extends JpaRepository<BasketEntity, Long> {

    BasketEntity findBasketEntityByUser(UserEntity user);
}
