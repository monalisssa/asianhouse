package com.markiyanova.asianhouse.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "role")
public class RoleEntity {
    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Getter
    @Setter
    @OneToMany(mappedBy = "role")
    private List<UserEntity> users;

    @Getter
    @Column(name = "name")
    private String name;

    public RoleEntity(){};

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }
}
