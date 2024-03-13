package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.menu.MenuCategoryEntity;
import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BasketItemRepository extends JpaRepository<BasketItemEntity, Long> {

    List<BasketItemEntity> findBasketItemEntitiesByBasket(BasketEntity basket);

    void deleteAllByBasketId(long basket_id);

    void deleteBasketItemEntitiesByMenuItemId(long id);

    BasketItemEntity findBasketItemEntityByBasketAndAndMenuItem(BasketEntity basket, MenuItemEntity menuItem);
}
