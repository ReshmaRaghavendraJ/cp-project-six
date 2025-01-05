package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Area;
import com.example.Elderlycare.Repository.AreaRepo;
import com.example.Elderlycare.Repository.CityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AreaController
{
    @Autowired
    AreaRepo areaRepo;

    @Autowired
    CityRepo cityRepo;

    /* Add Area based on city */
    @PostMapping("/addarea/{cityid}")
    public ResponseEntity<?> addarea(@PathVariable Integer cityid, @RequestBody Area obj)
    {
        var cityinfo=cityRepo.findById(cityid).orElseThrow(()->new RuntimeException("City id not found"));
        obj.setCity(cityinfo);
        if(areaRepo.existsByArea(obj.getArea()))
        {
            return new ResponseEntity<>("Area already added",HttpStatus.CONFLICT);
        }
        areaRepo.save(obj);
        return new ResponseEntity<>("Area Added Successfully", HttpStatus.OK);
    }

    /* Get All Areas - display areaslist and Employee dashboard (drop down area list)*/
    @GetMapping("/getallareas")
    public ResponseEntity<?> getallareas()
    {
        List<Area> arealist=areaRepo.findAll();
        return new ResponseEntity<>(arealist,HttpStatus.OK);
    }
}
