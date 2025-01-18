package com.example.isbd.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;

import java.util.List;




public interface EmployeeRepo extends JpaRepository<EmployeeEntity, Long> {
    @Query("select e from employee e where e.email = ?1")
    EmployeeEntity findByEmail(String email);

    EmployeeEntity findTopByOrderByIdDesc();
}