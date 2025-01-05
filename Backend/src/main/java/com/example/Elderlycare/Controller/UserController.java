package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Area;
import com.example.Elderlycare.Entity.Employees;
import com.example.Elderlycare.Entity.User;
import com.example.Elderlycare.Repository.AreaRepo;
import com.example.Elderlycare.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("*")
public class UserController
{
    @Autowired
    AreaRepo areaRepo;
    @Autowired
    UserRepo userRepo;

    /* User Register */
    @PostMapping("/userregister")
    public ResponseEntity<?> userregister(@RequestBody User obj)
    {
        // Check if the email already exists in the database
        if (userRepo.existsByEmailid(obj.getEmailid())) {
            return new ResponseEntity<>("Same Email ID is already registered,give other name", HttpStatus.BAD_REQUEST);
        }
        User userinfo=userRepo.save(obj);
        return new ResponseEntity<>("User Registered Successfully", HttpStatus.OK);
    }

    /* User Login check */
    @GetMapping("/userlogin/{emailid}/{password}")
    public ResponseEntity<?> userlogin(@PathVariable String emailid, @PathVariable String password) {
        try {
            // Find the user by email ID
            User userinfo = userRepo.findByEmailid(emailid).orElseThrow(() -> new RuntimeException("Email ID not found"));

            // Check if the password matches
            if (!userinfo.getPassword().equals(password)) {
                return new ResponseEntity<>("User Password is incorrect", HttpStatus.UNAUTHORIZED);
            } else {
                // Return user info if login is successful
                return new ResponseEntity<>(userinfo, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            // Handle errors gracefully
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }
    }
}
