package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Employees;
import com.example.Elderlycare.Entity.Feedback;
import com.example.Elderlycare.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepo extends JpaRepository<Feedback,Integer>
{


    List<Feedback> findByEmployees1_Empid(Integer empid);

    Optional<Feedback> findByUser7AndEmployees1(User userinfo, Employees empinfo);

    List<Feedback> findByUser7(User userinfo);
}
