package com.markiyanova.asianhouse.entity.user;

import com.markiyanova.asianhouse.entity.menu.MenuItemEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Entity
@Table(name = "user_info")
public class UserInfoEntity {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    public UserInfoEntity(){};

    @Getter
    @OneToOne(mappedBy = "userInfo", cascade = CascadeType.ALL)
    private UserEntity user;


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
    private Date birth_date;

    @Getter
    @Setter
    @Lob
    @Column(name = "image", columnDefinition="longblob")
    private byte[] image;

    public UserInfoEntity(long id, UserEntity user, String email, String tel, String firstname,
                          String lastname, Date birth_date, byte[] image) {
        this.id = id;
        this.user = user;
        this.email = email;
        this.tel = tel;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birth_date = birth_date;
        this.image = image;
    }


}
