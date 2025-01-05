package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Feedback;
import com.example.Elderlycare.Repository.EmployeesRepo;
import com.example.Elderlycare.Repository.FeedbackRepo;
import com.example.Elderlycare.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class FeedbackController
{
    @Autowired
    FeedbackRepo feedbackRepo;

    @Autowired
    EmployeesRepo employeesRepo;

    @Autowired
    UserRepo userRepo;

    /* Post Feedback based on employee */
    @PostMapping("/addfeedback/{userid}/{empid}")
    public ResponseEntity<?> addfeedback(@PathVariable Integer userid,@PathVariable Integer empid,@RequestBody Feedback obj)
    {
        var userinfo=userRepo.findById(userid).orElseThrow(()->new RuntimeException("User id not Found"));
        var empinfo=employeesRepo.findById(empid).orElseThrow(()->new RuntimeException("Employee id not Found"));
        // Check if feedback already exists for this user and employee
        Optional<Feedback> existingFeedback = feedbackRepo.findByUser7AndEmployees1(userinfo, empinfo);
        if (existingFeedback.isPresent()) {
            return new ResponseEntity<>("User has already given feedback to this employee", HttpStatus.CONFLICT);
        }
        obj.setUser7(userinfo);
        obj.setEmployees1(empinfo);
        obj.setFeedbackdate(LocalDateTime.now());
        feedbackRepo.save(obj);
        return new ResponseEntity<>("Feedback posted Successfully", HttpStatus.OK);
    }

    /* Get Feedback - Employeedashboard*/
    @GetMapping("/getfeedback/{empid}")
    public ResponseEntity<?> getfeedback(@PathVariable Integer empid)
    {
      employeesRepo.findById(empid).orElseThrow(()->new RuntimeException("Employee id not found"));
        List<Feedback> feedbackList=feedbackRepo.findByEmployees1_Empid(empid);
        if (feedbackList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(feedbackList,HttpStatus.OK);
    }

    /* Display all Feedback - Admindashboard*/
    @GetMapping("getallfeedback")
    public ResponseEntity<?> getallfeedback()
    {
        List<Feedback>feedbackList=feedbackRepo.findAll();
        return new ResponseEntity<>(feedbackList,HttpStatus.OK);
    }

    /* Get particular feedback - userdashboard */
    @GetMapping("/getfeedbackuserid/{userid}")
    public ResponseEntity<?> getfeedbackuserid(@PathVariable Integer userid)
    {
        var userinfo=userRepo.findById(userid).orElseThrow(()->new RuntimeException("User id not found"));
        List<Feedback> feedbacklist=feedbackRepo.findByUser7(userinfo);
//        if(feedbacklist.isEmpty()) {
//            return new ResponseEntity<>("No feedback found", HttpStatus.NOT_FOUND);
//        }
        return new ResponseEntity<>(feedbacklist,HttpStatus.OK);
    }
}
