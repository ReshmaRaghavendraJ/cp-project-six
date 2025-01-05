package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Area
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer areaid;
    private String area;

    public Area()
    {
    }

    public Area(Integer areaid, String area, City city, List<Employees> employees, List<DeliveryServicesinfo> deliveryServicesinfo2) {
        this.areaid = areaid;
        this.area = area;
        this.city = city;
        this.employees = employees;
        this.deliveryServicesinfo2 = deliveryServicesinfo2;
    }

    public Integer getAreaid() {
        return areaid;
    }

    public void setAreaid(Integer areaid) {
        this.areaid = areaid;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Employees> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employees> employees) {
        this.employees = employees;
    }

    public List<DeliveryServicesinfo> getDeliveryServicesinfo2() {
        return deliveryServicesinfo2;
    }

    public void setDeliveryServicesinfo2(List<DeliveryServicesinfo> deliveryServicesinfo2) {
        this.deliveryServicesinfo2 = deliveryServicesinfo2;
    }

    @ManyToOne
    @JoinColumn(name="cityid")
    private City city;

    @OneToMany(mappedBy = "area1")
    @JsonIgnore
    private List<Employees>employees ;

    @OneToMany(mappedBy = "area2")
    @JsonIgnore
    private List<DeliveryServicesinfo> deliveryServicesinfo2;

}
