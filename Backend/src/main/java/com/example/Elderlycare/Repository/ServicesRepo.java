package com.example.Elderlycare.Repository;

import com.example.Elderlycare.Entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServicesRepo extends JpaRepository<Services,Integer>
{
}

