package com.markiyanova.asianhouse.model;

import com.markiyanova.asianhouse.entity.user.UserEntity;
import com.markiyanova.asianhouse.entity.user.UserInfoEntity;
import lombok.Getter;
import lombok.Setter;

public class User {
    @Getter
    private long id;
    @Getter
    private String username;

    @Getter
    private String role;

    @Getter
    @Setter
    private UserItemInfo userInfo;

    @Getter
    @Setter
    private String status;

    public static User toModel(UserEntity entity)
    {
         User model = new User();
         model.setId(entity.getId());
         model.setUsername(entity.getUsername());
         model.setRole(entity.getRole().getName());
         if(entity.getUserInfo() != null) model.setUserInfo(UserItemInfo.toModel(entity.getUserInfo()));
         model.setStatus(entity.getStatus());
         return model;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
