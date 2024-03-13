package com.markiyanova.asianhouse.service;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.BasketItemEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import com.markiyanova.asianhouse.model.Basket;
import com.markiyanova.asianhouse.model.BasketItem;
import com.markiyanova.asianhouse.repository.BasketItemRepository;
import com.markiyanova.asianhouse.repository.BasketRepository;
import com.markiyanova.asianhouse.repository.MenuItemRepository;
import com.markiyanova.asianhouse.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BasketService {
    private final MenuItemRepository menuItemRepository;
    private final BasketItemRepository basketItemRepository;
    private final BasketRepository basketRepository;
    private final UserRepository userRepository;

    public Basket addItemToBasket(long user_id, long item_id, int quantity) {


        UserEntity user = userRepository.findById(user_id).get();
        BasketEntity basket = basketRepository.findBasketEntityByUser(user);
        MenuItemEntity menuItem = menuItemRepository.findById(item_id).get();
        BasketItemEntity basketItemInBasket = basketItemRepository.findBasketItemEntityByBasketAndAndMenuItem(basket, menuItem);

        if(basketItemInBasket!= null)
        {
            int quantity_basketItem = basketItemInBasket.getQuantity();
            basketItemInBasket.setQuantity(++quantity_basketItem);
            basketItemRepository.save(basketItemInBasket);
        }

        else{
            BasketItemEntity basketItem = BasketItemEntity
                    .builder()
                    .basket(basket)
                    .menuItem(menuItem)
                    .quantity(quantity)
                    .build();

            basketItemRepository.save(basketItem);
        }



        return Basket.toModel(basket);
    }

    public Basket getBasketItems(long user_id) {
        UserEntity user = userRepository.findById(user_id).get();
        return Basket.toModel(basketRepository.findBasketEntityByUser(user));
    }

    public Long deleteItemFromBasket(long id){
        basketItemRepository.deleteById(id);
        return id;
    }

    public BasketItem editQuantity(long id, int quantity){

        BasketItemEntity basketItem = basketItemRepository.findById(id).get();
        basketItem.setQuantity(quantity);

        return BasketItem.toModel(basketItemRepository.save(basketItem));
    }

    public long deleteAllItems(long user_id){

        UserEntity user = userRepository.findById(user_id).get();
        BasketEntity basket = basketRepository.findBasketEntityByUser(user);
        basketItemRepository.deleteAllByBasketId(basket.getId());
        return basket.getId();
    }

}
