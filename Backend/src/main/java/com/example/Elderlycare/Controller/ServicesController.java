package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Employees;
import com.example.Elderlycare.Entity.Services;
import com.example.Elderlycare.Repository.AreaRepo;
import com.example.Elderlycare.Repository.EmployeesRepo;
import com.example.Elderlycare.Repository.ServicesRepo;
import com.example.Elderlycare.Repository.UserRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")

public class ServicesController
{
    @Autowired
    ServicesRepo servicesRepo;

    /* Add Services */
    @PostMapping("/addservices")
    public ResponseEntity<?> addservices(@RequestBody Services obj)
    {
        servicesRepo.save(obj);
        return new ResponseEntity<>("Services Added Successfully", HttpStatus.OK);
    }

    /* Get all services as a radio -User Dashboard */
    @GetMapping("/getallservices")
    public ResponseEntity<?> getallservices()
    {
         List<Services>servicelist=servicesRepo.findAll();
         return new ResponseEntity<>(servicelist,HttpStatus.OK);
    }

}
