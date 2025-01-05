package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployeesRepo extends JpaRepository<Employees,Integer>
{
    boolean existsByEmailid(String emailid);


    Optional<Employees> findByEmailid(String emailid);
}
