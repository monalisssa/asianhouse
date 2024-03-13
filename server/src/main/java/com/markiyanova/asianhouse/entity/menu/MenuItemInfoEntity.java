package com.markiyanova.asianhouse.entity.menu;


import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "menu_item_info")
public class MenuItemInfoEntity {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    public MenuItemInfoEntity(){};

    @OneToOne(mappedBy = "menuItemInfo", cascade = CascadeType.ALL)
    private MenuItemEntity menuItem;

    @Getter
    @Setter
    @Column(name = "ingredients")
    private String ingredients;

    @Column(name = "is_spicy")
    private boolean is_spicy;

    public boolean getIs_spicy() {
        return is_spicy;
    }

    public void setIs_spicy(boolean is_spicy) {
        this.is_spicy = is_spicy;
    }

    @Getter
    @Setter
    @Column(name = "calories")
    private double calories;


}
