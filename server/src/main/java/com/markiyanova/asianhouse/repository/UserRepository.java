package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findUserEntityByUsername(String username);
    UserEntity findUserEntityByPassword(String password);
}
