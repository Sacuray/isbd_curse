package com.example.isbd.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.PossessionEntity;
import java.util.List;



public interface PossessionRepo extends JpaRepository<PossessionEntity, Long> {
    @Query("select p from possession p where p.client_id = ?1")
    List<PossessionEntity> findPossessionsByclientId_Id(Integer id);

    PossessionEntity findTopByOrderByIdDesc();
    PossessionEntity findByCarId(CarEntity car);
}