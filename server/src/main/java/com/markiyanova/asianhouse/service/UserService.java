package com.markiyanova.asianhouse.service;

import com.markiyanova.asianhouse.entity.order.OrderEntity;
import com.markiyanova.asianhouse.entity.user.BasketEntity;
import com.markiyanova.asianhouse.entity.user.UserEntity;
import com.markiyanova.asianhouse.entity.user.UserInfoEntity;
import com.markiyanova.asianhouse.exception.UserAlreadyExistException;
import com.markiyanova.asianhouse.exception.UserIsBlockedException;
import com.markiyanova.asianhouse.exception.UserNotFoundException;
import com.markiyanova.asianhouse.model.Order;
import com.markiyanova.asianhouse.model.User;
import com.markiyanova.asianhouse.repository.BasketRepository;
import com.markiyanova.asianhouse.repository.RoleRepository;
import com.markiyanova.asianhouse.repository.UserInfoRepository;
import com.markiyanova.asianhouse.repository.UserRepository;
import com.markiyanova.asianhouse.security.auth.AuthenticationRequest;
import com.markiyanova.asianhouse.security.auth.AuthenticationUser;
import com.markiyanova.asianhouse.security.jwt.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final BasketRepository basketRepo;
    private final UserInfoRepository userInfoRepo;


    public AuthenticationUser registration(UserEntity user, long role_id) throws UserAlreadyExistException {
        if (userRepo.findUserEntityByUsername(user.getUsername()).isPresent() || userRepo.findUserEntityByPassword(user.getPassword()) != null) {
            throw new UserAlreadyExistException("Пользователь с таким именем или паролем уже существует!");
        }

        user.setRole(roleRepo.findById(role_id).get());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(role_id == 2) user.setStatus("Активный");
        else user.setStatus("Администратор");
        UserEntity savedUser = userRepo.save(user);


        BasketEntity basketEntity = BasketEntity
                .builder()
                .user(savedUser)
                .build();
        basketRepo.save(basketEntity);

        UserInfoEntity userInfoEntity = UserInfoEntity.builder().build();
        userInfoRepo.save(userInfoEntity);
        savedUser.setUserInfo(userInfoEntity);
        userRepo.save(savedUser);

        var jwtToken = jwtService.generateRefreshToken(user);
        return AuthenticationUser.builder()
                .token(jwtToken)
                .build();

    }

    public User add_user_info(long user_id, UserInfoEntity userInfo, MultipartFile image) throws IOException {
        UserEntity user = userRepo.findById(user_id).get();
        if(image!=null) userInfo.setImage(image.getBytes());
        user.setUserInfo(userInfoRepo.save(userInfo));
        return User.toModel(userRepo.save(user));

    }

    public AuthenticationUser authenticate(AuthenticationRequest request) throws UserIsBlockedException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        var findUser = userRepo.findUserEntityByUsername(request.getUsername())
                .orElseThrow();


        if(Objects.equals(findUser.getStatus(), "Заблокирован")) throw new UserIsBlockedException("Пользователь заблокирован!");
        var jwtToken = jwtService.generateRefreshToken(findUser);
        return AuthenticationUser.builder()
                .token(jwtToken)
                .build();

    }

    public List<User> getAll() {
        List<User> users = new ArrayList<>();
        userRepo.findAll().forEach(userEntity ->
        {
            users.add(User.toModel(userEntity));

        }

        );
        return users;
    }

    public User getOne(long id) throws UserNotFoundException {

        Optional<UserEntity> user = userRepo.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("Пользователь не найден!");
        }
        return User.toModel(user.get());
    }

    public Long delete(long id) {
        userRepo.deleteById(id);
        return id;
    }

    public AuthenticationUser refreshToken(
            HttpServletRequest request
    ) {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userName;
        AuthenticationUser authenticationUser = null;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        userName = jwtService.extractUsername(refreshToken);
        if (userName != null) {
            var user = userRepo.findUserEntityByUsername(userName)
                    .orElseThrow();

            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateRefreshToken(user);
                authenticationUser = AuthenticationUser.builder()
                        .token(accessToken)
                        .build();
            }
        }

        return authenticationUser;

    }

    public User editStatus(long id, String status) {

        UserEntity user = userRepo.findById(id).get();
        user.setStatus(status);
        return User.toModel(userRepo.save(user));
    }

    public User editAvatar(long id, MultipartFile image) throws IOException {

        UserEntity user = userRepo.findById(id).get();
        UserInfoEntity userInfo = userInfoRepo.findById(user.getUserInfo().getId()).get();
        userInfo.setImage(image.getBytes());
        userInfoRepo.save(userInfo);
        return User.toModel(userRepo.save(user));
    }


    public User editInfo(long id, UserInfoEntity userInfo) throws IOException {


        UserEntity userEntity = userRepo.findById(id).get();
        UserInfoEntity userInfoEntity = userInfoRepo.findById(userEntity.getUserInfo().getId()).get();
        userInfoEntity.setTel(userInfo.getTel());
        userInfoEntity.setEmail(userInfo.getEmail());
        userInfoEntity.setFirstname(userInfo.getFirstname());
        userInfoEntity.setLastname(userInfo.getLastname());
        userEntity.setUserInfo(userInfoRepo.save(userInfoEntity));
        return User.toModel(userRepo.save(userEntity));
    }
}




