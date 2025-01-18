package com.example.isbd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.isbd.Enteties.AutopartEntity;




public interface AutopartRepo extends JpaRepository<AutopartEntity, Long> {
    AutopartEntity findByIdOrderByPriceDesc(Integer id);
    AutopartEntity findTopByOrderByIdDesc();
}