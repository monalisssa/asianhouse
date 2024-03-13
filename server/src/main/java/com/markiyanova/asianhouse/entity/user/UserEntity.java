package com.markiyanova.asianhouse.entity.user;

import com.markiyanova.asianhouse.entity.menu.MenuItemInfoEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user")
public class UserEntity implements UserDetails {


    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;


    @Getter
    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private BasketEntity basket;

    @Getter
    @Setter
    private String status;

    @Setter
    @Getter
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_info_id", referencedColumnName = "id")
    private UserInfoEntity userInfo;

    public UserEntity() {}

    public void setId(long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getName()));
    }


    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = password;
    }



}
