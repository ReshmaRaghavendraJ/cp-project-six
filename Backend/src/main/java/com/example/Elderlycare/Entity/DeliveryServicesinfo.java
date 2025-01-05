package com.example.Elderlycare.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DeliveryServicesinfo
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deliveryserviceid;
    private String pickupaddress;
    private String deliveryaddress;
    private String status;

    public DeliveryServicesinfo()
    {
    }

    public DeliveryServicesinfo(Integer deliveryserviceid, String pickupaddress, String deliveryaddress, String status, Area area2, User user1, Employees employees3, Services services4) {
        this.deliveryserviceid = deliveryserviceid;
        this.pickupaddress = pickupaddress;
        this.deliveryaddress = deliveryaddress;
        this.status = status;
        this.area2 = area2;
        this.user1 = user1;
        this.employees3 = employees3;
        this.services4 = services4;
    }

    public Integer getDeliveryserviceid() {
        return deliveryserviceid;
    }

    public void setDeliveryserviceid(Integer deliveryserviceid) {
        this.deliveryserviceid = deliveryserviceid;
    }

    public String getPickupaddress() {
        return pickupaddress;
    }

    public void setPickupaddress(String pickupaddress) {
        this.pickupaddress = pickupaddress;
    }

    public String getDeliveryaddress() {
        return deliveryaddress;
    }

    public void setDeliveryaddress(String deliveryaddress) {
        this.deliveryaddress = deliveryaddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Area getArea2() {
        return area2;
    }

    public void setArea2(Area area2) {
        this.area2 = area2;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public Employees getEmployees3() {
        return employees3;
    }

    public void setEmployees3(Employees employees3) {
        this.employees3 = employees3;
    }

    public Services getServices4() {
        return services4;
    }

    public void setServices4(Services services4) {
        this.services4 = services4;
    }

    @ManyToOne
    @JoinColumn(name="areaid")
    private Area area2;

    @ManyToOne
    @JoinColumn(name="userid")
    private User user1;

    @ManyToOne
    @JoinColumn(name="empid")
    private Employees employees3;

    @ManyToOne
    @JoinColumn(name="serviceid")
    private Services services4;
}
