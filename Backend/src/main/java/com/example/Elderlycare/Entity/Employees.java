package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

@Entity
@Getter
@Setter
public class Employees
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer empid;
    private String empname;
    private String phoneno;
    private String emailid;
    private String qualification;
    private String password;
    private String photo;
    private String status;

    public Employees()
    {
        generateemppaswd();
    }

    public void generateemppaswd() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder passwordBuilder = new StringBuilder(4);

        for (int i = 0; i < 4; i++) { // Generate an 8-character password
            int index = random.nextInt(chars.length());
            passwordBuilder.append(chars.charAt(index));
        }
        this.password = passwordBuilder.toString();
    }


    public Employees(Integer empid, String empname, String phoneno, String emailid, String qualification, String password, String photo, String status, Workstatus workstatus, List<Feedback> feedback, Area area1, List<DeliveryServicesinfo> deliveryServicesinfo3) {
        this.empid = empid;
        this.empname = empname;
        this.phoneno = phoneno;
        this.emailid = emailid;
        this.qualification = qualification;
        this.password = password;
        this.photo = photo;
        this.status = status;
        this.workstatus = workstatus;
        this.feedback = feedback;
        this.area1 = area1;
        this.deliveryServicesinfo3 = deliveryServicesinfo3;
    }

    public Integer getEmpid() {
        return empid;
    }

    public void setEmpid(Integer empid) {
        this.empid = empid;
    }

    public String getEmpname() {
        return empname;
    }

    public void setEmpname(String empname) {
        this.empname = empname;
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

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Workstatus getWorkstatus() {
        return workstatus;
    }

    public void setWorkstatus(Workstatus workstatus) {
        this.workstatus = workstatus;
    }

    public List<Feedback> getFeedback() {
        return feedback;
    }

    public void setFeedback(List<Feedback> feedback) {
        this.feedback = feedback;
    }

    public Area getArea1() {
        return area1;
    }

    public void setArea1(Area area1) {
        this.area1 = area1;
    }

    public List<DeliveryServicesinfo> getDeliveryServicesinfo3() {
        return deliveryServicesinfo3;
    }

    public void setDeliveryServicesinfo3(List<DeliveryServicesinfo> deliveryServicesinfo3) {
        this.deliveryServicesinfo3 = deliveryServicesinfo3;
    }

    @OneToOne(mappedBy = "employees")
    @JsonIgnore
    private Workstatus workstatus;


    @OneToMany(mappedBy = "employees1")
    @JsonIgnore
    private List<Feedback> feedback;

    @ManyToOne
    @JoinColumn(name="areaid")
    private Area area1;

    @OneToMany(mappedBy = "employees3")
    @JsonIgnore
    private List<DeliveryServicesinfo> deliveryServicesinfo3;
}
