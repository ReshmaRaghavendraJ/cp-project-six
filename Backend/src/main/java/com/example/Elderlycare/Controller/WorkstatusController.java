package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Services;
import com.example.Elderlycare.Entity.Workstatus;
import com.example.Elderlycare.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class WorkstatusController
{
    @Autowired
    WorkstatusRepo workstatusRepo;

    @Autowired
    EmployeesRepo employeesRepo;

    @Autowired
    ServicesRepo servicesRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    DeliveryServicesinfoRepo deliveryServicesinfoRepo;

    /* Add Workstatus */
    @PostMapping("addworkstatus/{empid}/{userid}/{deliveryserviceid}")
    public ResponseEntity<?> addworkstatus(@PathVariable Integer empid,@PathVariable Integer userid,@PathVariable Integer deliveryserviceid)
    {
        var empinfo=employeesRepo.findById(empid).orElseThrow(()->new RuntimeException("Employee id not Found"));
        var deliveryinfo=deliveryServicesinfoRepo.findById(deliveryserviceid).orElseThrow(()->new RuntimeException("Deliveryserviceid not found"));
        var usrinfo=userRepo.findById(userid).orElseThrow(()->new RuntimeException("User id not Found"));
        boolean workStatusExists = workstatusRepo.existsByEmployees(empinfo);
//        if( workStatusExists)
//        {
//            return new ResponseEntity<>("Workstatus Already added",HttpStatus.CONFLICT);
//        }


        // Create a new Workstatus instance and set its properties
        Workstatus workStatus = new Workstatus();
        workStatus.setEmployees(empinfo);
        workStatus.setPosteddate(LocalDateTime.now());
        workStatus.setWorkstatus("Service Completed"); // Assuming there's a status field
        workStatus.setUser6(usrinfo);

        // Save the work status
        workstatusRepo.save(workStatus);

        // Update employee status if needed
        empinfo.setStatus("Service Completed");
        employeesRepo.save(empinfo);

        deliveryinfo.setStatus("Service Completed");
        deliveryServicesinfoRepo.save(deliveryinfo);
        return new ResponseEntity<>("Workstatus Added Successfully", HttpStatus.OK);
    }

    /* Get all Workstatus - AdminDashboard */
    @GetMapping("getallworkstatus")
    public ResponseEntity<?> getallworkstatus()
    {
        List<Workstatus> workstatuslist=workstatusRepo.findAll();
        return new ResponseEntity<>(workstatuslist,HttpStatus.OK);
    }

    /* Get particular employee Workstatus - User Dashboard */
    @GetMapping("getworkstatus/{userid}")
    public ResponseEntity<?> getworkstatus(@PathVariable Integer userid)
    {
       var ursinfo=userRepo.findById(userid).orElseThrow(()->new RuntimeException("User id not found"));
        var statusdetails=workstatusRepo.findByUser6_userid(userid);
        return new ResponseEntity<>(statusdetails,HttpStatus.OK);
    }
}
