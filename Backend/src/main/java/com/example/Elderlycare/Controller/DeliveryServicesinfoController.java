package com.example.Elderlycare.Controller;

import com.example.Elderlycare.Entity.Area;
import com.example.Elderlycare.Entity.DeliveryServicesinfo;
import com.example.Elderlycare.Entity.Services;
import com.example.Elderlycare.Entity.User;
import com.example.Elderlycare.Repository.AreaRepo;
import com.example.Elderlycare.Repository.DeliveryServicesinfoRepo;
import com.example.Elderlycare.Repository.ServicesRepo;
import com.example.Elderlycare.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@CrossOrigin("*")
public class DeliveryServicesinfoController {
    @Autowired
    DeliveryServicesinfoRepo deliveryServicesinfoRepo;

    @Autowired
    AreaRepo areaRepo;

    @Autowired
    ServicesRepo servicesRepo;

    @Autowired
    UserRepo userRepo;

    /* Add DeliveryServicesinfo details */
    @PostMapping("/adddeliveryservices/{areaid}/{serviceid}/{userid}")
    public ResponseEntity<?> adddeliveryservices(@PathVariable Integer areaid, @PathVariable Integer serviceid, @PathVariable Integer userid, @RequestBody
    DeliveryServicesinfo obj) {
        var areainfo = areaRepo.findById(areaid).orElseThrow(() -> new RuntimeException("Areaid not found"));
        var serviceinfo = servicesRepo.findById(serviceid).orElseThrow(() -> new RuntimeException("Service id not found"));
        var userinfo = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("Userid not found"));
        obj.setArea2(areainfo);
        obj.setServices4(serviceinfo);
        obj.setUser1(userinfo);
        obj.setStatus("Pending");
        deliveryServicesinfoRepo.save(obj);
        return new ResponseEntity<>("Delivery Services added Successfully", HttpStatus.OK);
    }

    /* Display particular users Deliveryserviecsinfo details */
    @GetMapping("/getdeliveryserviceinfo/{userid}")
    public ResponseEntity<?> getdeliveryserviceinfo(@PathVariable Integer userid) {
        var userinfo = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User id not found"));
        List<DeliveryServicesinfo> deliveryinfo = deliveryServicesinfoRepo.findByUser1(userinfo);
        return new ResponseEntity<>(deliveryinfo, HttpStatus.OK);
    }

    /* Get userid and check for Addres already stored or not */
    @GetMapping("/checkUserAddress/{userid}")
    public ResponseEntity<String> checkUserAddress(@PathVariable Integer userid) {
        // Retrieve the user information from the database
        User userinfo = userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User ID not found"));

        // Retrieve the latest DeliveryServicesinfo for the given user, assuming the pickup address is updated in the latest record
        List<DeliveryServicesinfo> deliveryInfoList = deliveryServicesinfoRepo.findByUser1(userinfo);

        // Check if there are any delivery services found
        if (deliveryInfoList.isEmpty()) {
            return ResponseEntity.status(204).build(); // No content if no delivery services are found
        }

        // Get the latest delivery service info based on some sorting criteria (e.g., the highest delivery service ID or a timestamp field)
        DeliveryServicesinfo latestDeliveryInfo = deliveryInfoList.stream()
                .max(Comparator.comparing(DeliveryServicesinfo::getDeliveryserviceid))
                .orElseThrow(() -> new RuntimeException("Failed to find the latest delivery service info"));

        // Check if the pickup address is set in the latest delivery info
        if (latestDeliveryInfo.getPickupaddress() == null || latestDeliveryInfo.getPickupaddress().isEmpty()) {
            return ResponseEntity.status(204).build(); // No content if the pickup address is not set
        }

        return ResponseEntity.ok(latestDeliveryInfo.getPickupaddress());
    }


    /* add only deliveryaddress for same user */
    @PutMapping("/adddeliveryaddress/{userid}")
    public ResponseEntity<?> adddeliveryaddress(@PathVariable Integer userid, @RequestBody DeliveryServicesinfo obj) {
        // Find the user by ID
        User userinfo = userRepo.findById(userid)
                .orElseThrow(() -> new RuntimeException("User ID not found"));

        // Retrieve all delivery information associated with the user
        List<DeliveryServicesinfo> deliveryInfoList = deliveryServicesinfoRepo.findByUser1(userinfo);

        // Check if there are any delivery services found
        if (deliveryInfoList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No existing delivery information found for the user. Cannot insert new delivery address.");
        }

        // Find the most recent delivery info with a non-null, non-empty pickup address
        DeliveryServicesinfo latestDeliveryInfo = deliveryInfoList.stream()
                .filter(info -> info.getPickupaddress() != null && !info.getPickupaddress().isEmpty())
                .max(Comparator.comparing(DeliveryServicesinfo::getDeliveryserviceid)) // Replace with a timestamp if available
                .orElseThrow(() -> new RuntimeException("No delivery info with a pickup address found"));

        // Check if the new delivery address is valid
        if (obj.getDeliveryaddress() == null || obj.getDeliveryaddress().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid delivery address provided. Delivery address cannot be null or empty.");
        }

        // Check if a new pickup address is provided, and use it if available
        String updatedPickupAddress = obj.getPickupaddress() != null && !obj.getPickupaddress().isEmpty()
                ? obj.getPickupaddress()  // Use the new pickup address if provided
                : latestDeliveryInfo.getPickupaddress(); // Otherwise, use the latest pickup address

        // Create a new DeliveryServicesinfo object with the updated delivery address and pickup address
        DeliveryServicesinfo newDeliveryInfo = new DeliveryServicesinfo();
        newDeliveryInfo.setUser1(userinfo);
        newDeliveryInfo.setPickupaddress(updatedPickupAddress); // Set the new or existing pickup address
        newDeliveryInfo.setDeliveryaddress(obj.getDeliveryaddress()); // Set the updated delivery address
        newDeliveryInfo.setStatus("Pending"); // Set status as needed
        newDeliveryInfo.setArea2(latestDeliveryInfo.getArea2()); // Retain the same area
        newDeliveryInfo.setServices4(latestDeliveryInfo.getServices4()); // Retain the same service

        // Save the new delivery information as a new row in the database
        deliveryServicesinfoRepo.save(newDeliveryInfo);

        // Return a response indicating success
        return new ResponseEntity<>("New delivery address created successfully with the updated pickup address.", HttpStatus.OK);
    }


    /*  Update both pickup address and delivery address */
    @PutMapping("/updatebothaddress/{userid}/{deliveryserviceid}")
    public ResponseEntity<?> updatebothaddress(@PathVariable Integer userid, @PathVariable Integer deliveryserviceid, @RequestBody DeliveryServicesinfo obj) {
        User userinfo = userRepo.findById(userid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User ID not found"));

        DeliveryServicesinfo deliveryinfo = (DeliveryServicesinfo) deliveryServicesinfoRepo.findByUser1AndDeliveryserviceid(userinfo, deliveryserviceid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery Service ID not found for the given user"));

        // Validate the input object
        if (obj.getDeliveryaddress() == null || obj.getPickupaddress() == null) {
            return ResponseEntity.badRequest().body("Both delivery and pickup addresses must be provided.");
        }

        if (obj.getArea2() != null && obj.getArea2().getAreaid() != null) {
            // Fetch the Area by areaid from the request object
            Area area = areaRepo.findById(obj.getArea2().getAreaid())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Area not found"));

            // Update the area in the DeliveryServicesinfo
            deliveryinfo.setArea2(area);
        }
        deliveryinfo.setStatus("Pending");
        deliveryinfo.setDeliveryaddress(obj.getDeliveryaddress());
        deliveryinfo.setPickupaddress(obj.getPickupaddress());
        deliveryServicesinfoRepo.save(deliveryinfo);

        return ResponseEntity.ok("Delivery and pickup addresses updated successfully");
    }

    /* Get pickup & delivery */
    @GetMapping("/getaddress/{deliveryserviceid}")
    public ResponseEntity<?> getaddress(@PathVariable Integer deliveryserviceid) {
        DeliveryServicesinfo deliveryinfo = deliveryServicesinfoRepo.findById(deliveryserviceid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery Service ID not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("pickupaddress", deliveryinfo.getPickupaddress());
        response.put("deliveryaddress", deliveryinfo.getDeliveryaddress());
        response.put("deliveryserviceid",deliveryinfo.getDeliveryserviceid());
        if (deliveryinfo.getArea2() != null) {
            response.put("areaId", deliveryinfo.getArea2().getAreaid());
        }
        response.put("areaId", deliveryinfo.getArea2() != null ? deliveryinfo.getArea2().getAreaid() : null);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

