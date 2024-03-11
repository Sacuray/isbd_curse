package com.example.isbd.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.PossessionEntity;
import com.example.isbd.Enteties.ServiceEntity;

import java.util.List;



public interface ServiceRepo extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByNameService(String nameService);

    ServiceEntity findTopByOrderByIdDesc();
}