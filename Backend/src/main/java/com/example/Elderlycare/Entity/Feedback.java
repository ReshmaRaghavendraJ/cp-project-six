package com.example.Elderlycare.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Feedback
{
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer feedbackid;
    private Integer  feedback;
    @JsonFormat(pattern="dd-MM-yyyy hh:mm a",timezone="Asia/Kolkata")
    private LocalDateTime feedbackdate;

    public Feedback()
    {
    }

    public Feedback(Integer feedbackid, Integer feedback, LocalDateTime feedbackdate, Employees employees1, User user7) {
        this.feedbackid = feedbackid;
        this.feedback = feedback;
        this.feedbackdate = feedbackdate;
        this.employees1 = employees1;
        this.user7 = user7;
    }

    public Integer getFeedbackid() {
        return feedbackid;
    }

    public void setFeedbackid(Integer feedbackid) {
        this.feedbackid = feedbackid;
    }

    public Integer getFeedback() {
        return feedback;
    }

    public void setFeedback(Integer feedback) {
        this.feedback = feedback;
    }

    public LocalDateTime getFeedbackdate() {
        return feedbackdate;
    }

    public void setFeedbackdate(LocalDateTime feedbackdate) {
        this.feedbackdate = feedbackdate;
    }

    public Employees getEmployees1() {
        return employees1;
    }

    public void setEmployees1(Employees employees1) {
        this.employees1 = employees1;
    }

    public User getUser7() {
        return user7;
    }

    public void setUser7(User user7) {
        this.user7 = user7;
    }

    @ManyToOne
    @JoinColumn(name="empid")
    private Employees employees1;

    @ManyToOne
    @JoinColumn(name="userid")
    private User user7;
}
