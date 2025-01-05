package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Area;
import com.example.Elderlycare.Entity.DeliveryServicesinfo;
import com.example.Elderlycare.Entity.Services;
import com.example.Elderlycare.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DeliveryServicesinfoRepo extends JpaRepository<DeliveryServicesinfo,Integer>
{
   // List<DeliveryServicesinfo> findByUser1(User userinfo);

//    @Query("SELECT d FROM DeliveryServicesinfo d WHERE d.user1.userid = :userid ORDER BY d.id DESC")
//    List<DeliveryServicesinfo> findRecentDeliveryInfoByUserid(@Param("userid") Integer userid);

    List<DeliveryServicesinfo> findByUser1(User userinfo);


    DeliveryServicesinfo findByUser1_Userid(Integer userid);

    List<DeliveryServicesinfo> findByUser1AndServices4(User user, Services service);

    @Query("SELECT d FROM DeliveryServicesinfo d WHERE d.area2.areaid IN (SELECT e.area1.areaid FROM Employees e WHERE e.empid = :empid)")
    List<DeliveryServicesinfo> findByEmployeeArea(@Param("empid") Integer empid);

    Optional<Object> findByUser1AndDeliveryserviceid(User userinfo, Integer deliveryserviceid);
}
