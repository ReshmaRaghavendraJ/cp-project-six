package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Area;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AreaRepo extends JpaRepository<Area,Integer>
{

    boolean existsByArea(String area);
}
