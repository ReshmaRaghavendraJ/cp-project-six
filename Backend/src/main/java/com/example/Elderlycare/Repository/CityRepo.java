package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<City,Integer>
{

    boolean existsByCity(String city);
}
