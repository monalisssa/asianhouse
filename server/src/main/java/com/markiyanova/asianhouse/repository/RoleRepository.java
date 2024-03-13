package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.user.RoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
}
