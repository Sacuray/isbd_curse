package com.example.isbd.Repositories;


import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.CarEntity;




public interface CarRepo extends JpaRepository<CarEntity, Long> {
    @Query("select c from car c where c.id = ?1")
    CarEntity findById(Integer id);

    CarEntity findTopByOrderByIdDesc();
}