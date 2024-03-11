package com.example.isbd.Repositories;


import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.AutopartEntity;
import com.example.isbd.Enteties.CarEntity;
import java.util.List;



public interface AutopartRepo extends JpaRepository<AutopartEntity, Long> {
    AutopartEntity findByIdOrderByPriceDesc(Integer id);
    AutopartEntity findTopByOrderByIdDesc();
}