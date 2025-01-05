package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Workstatus
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer workstatusid;
    private String workstatus;
    @JsonFormat(pattern="dd-MM-yyyy hh:mm a",timezone="Asia/Kolkata")
    private LocalDateTime posteddate;

    public Workstatus() {
    }

    public Workstatus(Integer workstatusid, String workstatus, LocalDateTime posteddate, Employees employees, User user6) {
        this.workstatusid = workstatusid;
        this.workstatus = workstatus;
        this.posteddate = posteddate;
        this.employees = employees;
        this.user6 = user6;
    }

    public Integer getWorkstatusid() {
        return workstatusid;
    }

    public void setWorkstatusid(Integer workstatusid) {
        this.workstatusid = workstatusid;
    }

    public String getWorkstatus() {
        return workstatus;
    }

    public void setWorkstatus(String workstatus) {
        this.workstatus = workstatus;
    }

    public LocalDateTime getPosteddate() {
        return posteddate;
    }

    public void setPosteddate(LocalDateTime posteddate) {
        this.posteddate = posteddate;
    }

    public Employees getEmployees() {
        return employees;
    }

    public void setEmployees(Employees employees) {
        this.employees = employees;
    }

    public User getUser6() {
        return user6;
    }

    public void setUser6(User user6) {
        this.user6 = user6;
    }

    @OneToOne
    @JoinColumn(name="empid")
    private Employees employees;

    @ManyToOne
    @JoinColumn(name="userid")
    private User user6;

}
