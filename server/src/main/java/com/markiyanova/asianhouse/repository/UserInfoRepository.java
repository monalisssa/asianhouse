package com.markiyanova.asianhouse.repository;

import com.markiyanova.asianhouse.entity.user.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfoEntity, Long>
{
}
