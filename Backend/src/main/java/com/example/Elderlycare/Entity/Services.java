package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Services
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceid;
    private String servicename;
    private Integer serviceamount;

    public Services()
    {
    }

    public Services(Integer serviceid, String servicename, Integer serviceamount, List<DeliveryServicesinfo> deliveryServicesinfo4) {
        this.serviceid = serviceid;
        this.servicename = servicename;
        this.serviceamount = serviceamount;
        this.deliveryServicesinfo4 = deliveryServicesinfo4;
    }

    public Integer getServiceid() {
        return serviceid;
    }

    public void setServiceid(Integer serviceid) {
        this.serviceid = serviceid;
    }

    public String getServicename() {
        return servicename;
    }

    public void setServicename(String servicename) {
        this.servicename = servicename;
    }

    public Integer getServiceamount() {
        return serviceamount;
    }

    public void setServiceamount(Integer serviceamount) {
        this.serviceamount = serviceamount;
    }

    public List<DeliveryServicesinfo> getDeliveryServicesinfo4() {
        return deliveryServicesinfo4;
    }

    public void setDeliveryServicesinfo4(List<DeliveryServicesinfo> deliveryServicesinfo4) {
        this.deliveryServicesinfo4 = deliveryServicesinfo4;
    }

    @OneToMany(mappedBy = "services4")
    @JsonIgnore
    private List<DeliveryServicesinfo> deliveryServicesinfo4;
}
