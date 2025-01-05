package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer>
{
    Optional<User> findByEmailid(String emailid);

    boolean existsByEmailid(String emailid);
}
