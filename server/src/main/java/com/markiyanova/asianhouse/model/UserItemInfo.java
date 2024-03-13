package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import com.markiyanova.asianhouse.entity.user.UserInfoEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class UserItemInfo {
    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String tel;

    @Getter
    @Setter
    private String firstname;

    @Getter
    @Setter
    private String lastname;

    @Getter
    @Setter
    private byte[] image;

    @Getter
    @Setter
    private Date birth_date;

    public static UserItemInfo toModel(UserInfoEntity userInfo)
    {
        UserItemInfo model = new UserItemInfo();
        model.setFirstname(userInfo.getFirstname());
        model.setLastname(userInfo.getLastname());
        model.setBirth_date(userInfo.getBirth_date());
        model.setTel(userInfo.getTel());
        model.setEmail(userInfo.getEmail());
        model.setImage(userInfo.getImage());
        return model;
    }
}
