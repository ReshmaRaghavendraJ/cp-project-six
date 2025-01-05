package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.City;
import com.example.Elderlycare.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CityController {
    @Autowired
    CityRepo cityRepo;

    /* Add City */
    @PostMapping("/addcity")
    public ResponseEntity<?> addcity(@RequestBody City obj) {
        if (cityRepo.existsByCity(obj.getCity())) {
            return new ResponseEntity<>("City Already Exists", HttpStatus.CONFLICT);
        } else {
            cityRepo.save(obj);
            return new ResponseEntity<>("City Added Successfully", HttpStatus.OK);
        }
    }

    /* Get All City list */
    @GetMapping("/gettallcity")
    public ResponseEntity<?> gettallcity()
    {
        List<City> citylist=cityRepo.findAll();
        return new ResponseEntity<>(citylist,HttpStatus.OK);
    }
}
