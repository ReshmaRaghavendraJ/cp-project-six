package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.*;
import com.example.Elderlycare.Repository.AreaRepo;
import com.example.Elderlycare.Repository.DeliveryServicesinfoRepo;
import com.example.Elderlycare.Repository.EmployeesRepo;
import com.example.Elderlycare.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class EmployeesController {
    @Autowired
    EmployeesRepo employeesRepo;

    @Autowired
    AreaRepo areaRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    DeliveryServicesinfoRepo deliveryServicesinfoRepo;

    /* Employees Register */
    @PostMapping("/registeremployees/{areaid}")
    public ResponseEntity<?> registeremployees(@PathVariable Integer areaid, @RequestBody Employees obj) {
        var areainfo = areaRepo.findById(areaid).orElseThrow(() -> new RuntimeException("Area id not found"));
        obj.setArea1(areainfo);
        obj.setStatus("Pending");
        if (employeesRepo.existsByEmailid(obj.getEmailid())) {
            return new ResponseEntity<>("Employee emailid already exists,give other name", HttpStatus.CONFLICT);
        }
        employeesRepo.save(obj);
        return new ResponseEntity<>("Employees Registered Successfully", HttpStatus.OK);
    }

    /* Employees Login check*/
    @GetMapping("/employeeLogin/{emailid}/{password}")
    public ResponseEntity<?> employeeLogin(@PathVariable String emailid, @PathVariable String password) {
        try {
            // Find the Employee by email ID
            Employees empinfo = employeesRepo.findByEmailid(emailid).orElseThrow(() -> new RuntimeException("Email ID not found"));

            // Check if the password matches
            if (!empinfo.getPassword().equals(password)) {
                return new ResponseEntity<>("Employee Password is incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                // Return Employee info if login is successful
                return new ResponseEntity<>(empinfo, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            // Handle errors gracefully
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }


    /* Admindashboard - get all Registered Employees */
    @GetMapping("/getallemployees")
    public ResponseEntity<?> getallemployees()
    {
        List<Employees> emplist=employeesRepo.findAll();
        return new ResponseEntity<>(emplist,HttpStatus.OK);
    }

    /* Get one employees details - employee dashboard(view serives->login ->to set session storage of areaid) */
    @GetMapping("/getareaidofemp/{empid}")
    public ResponseEntity<?> getareaidofemp(@PathVariable Integer empid)
    {
        var empinfo=employeesRepo.findById(empid).orElseThrow(()->new RuntimeException("Employee id not found"));
        return new ResponseEntity<>(empinfo,HttpStatus.OK);
    }

    /* Display particular areas pickup address and delivery address which matches with employee areaid */
    @GetMapping("/getdeliveryservicesbyemployee/{empid}")
    public ResponseEntity<?> getDeliveryServicesByEmployee(@PathVariable Integer empid) {
        // Find DeliveryServicesinfo based on the employee's area
        List<DeliveryServicesinfo> deliverylist = deliveryServicesinfoRepo.findByEmployeeArea(empid);

        if (deliverylist.isEmpty()) {
            return new ResponseEntity<>("No delivery services found for this employee's area.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(deliverylist, HttpStatus.OK);
    }

    @PutMapping("/updatestatus/{empid}/{deliveryserviceid}")
    public ResponseEntity<?> updatestatus(@PathVariable Integer empid,@PathVariable Integer deliveryserviceid)
    {
        var empinfo=employeesRepo.findById(empid).orElseThrow(()->new RuntimeException("Employee id not found"));
        var deliveryinfo=deliveryServicesinfoRepo.findById(deliveryserviceid).orElseThrow(()->new RuntimeException("Deliveryserviceid not found"));
        deliveryinfo.setStatus("Active");
        empinfo.setStatus("Active");
        deliveryinfo.setEmployees3(empinfo);
        employeesRepo.save(empinfo);
        deliveryServicesinfoRepo.save(deliveryinfo);
        return new ResponseEntity<>("Service Accepted",HttpStatus.OK);
    }

}
