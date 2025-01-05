package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Employees;
import com.example.Elderlycare.Entity.Workstatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkstatusRepo extends JpaRepository<Workstatus,Integer>
{
    boolean existsByEmployees(Employees employees);

    Object findByUser6_userid(Integer userid);
//    List<Workstatus> findByUser6_userid(Integer userid);
}
