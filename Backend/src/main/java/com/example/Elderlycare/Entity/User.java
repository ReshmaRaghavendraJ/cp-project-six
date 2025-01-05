package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Random;

@Entity
@Getter
@Setter
public class User
{
    @Id
    private Integer userid;
    private String username;
    private String phoneno;
    private String emailid;
    private String password;


    public User()
    {
        generateuserid();
    }

    public void generateuserid() {
        Random random = new Random();
        int randomValue = (random.nextInt(9000) + 1000); // Generate a random number between 1000 and 9999
        this.userid = randomValue;
    }

    public User(Integer userid, String username, String phoneno, String emailid, String password, List<Workstatus> workstatus6, List<Feedback> feeback4, List<DeliveryServicesinfo> deliveryServicesinfo1) {
        this.userid = userid;
        this.username = username;
        this.phoneno = phoneno;
        this.emailid = emailid;
        this.password = password;
        this.workstatus6 = workstatus6;
        this.feeback4 = feeback4;
        this.deliveryServicesinfo1 = deliveryServicesinfo1;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneno() {
        return phoneno;
    }

    public void setPhoneno(String phoneno) {
        this.phoneno = phoneno;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Workstatus> getWorkstatus6() {
        return workstatus6;
    }

    public void setWorkstatus6(List<Workstatus> workstatus6) {
        this.workstatus6 = workstatus6;
    }

    public List<Feedback> getFeeback4() {
        return feeback4;
    }

    public void setFeeback4(List<Feedback> feeback4) {
        this.feeback4 = feeback4;
    }

    public List<DeliveryServicesinfo> getDeliveryServicesinfo1() {
        return deliveryServicesinfo1;
    }

    public void setDeliveryServicesinfo1(List<DeliveryServicesinfo> deliveryServicesinfo1) {
        this.deliveryServicesinfo1 = deliveryServicesinfo1;
    }

    @OneToMany(mappedBy = "user6")
    @JsonIgnore
    private List<Workstatus> workstatus6;

    @OneToMany(mappedBy = "user7")
    @JsonIgnore
    private List<Feedback> feeback4;

    @OneToMany(mappedBy = "user1")
    @JsonIgnore
    private List<DeliveryServicesinfo> deliveryServicesinfo1;
}
