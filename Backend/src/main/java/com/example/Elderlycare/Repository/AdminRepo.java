package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,Integer>
{
    Optional<Admin> findByEmailid(String emailid);
}
