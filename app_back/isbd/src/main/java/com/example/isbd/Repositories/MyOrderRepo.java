package com.example.isbd.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Enteties.MyOrderEntity;

import java.util.List;




public interface MyOrderRepo extends JpaRepository<MyOrderEntity, Long> {
    @Query("select m from MyOrderEntity m where m.carId.id = ?1")
    MyOrderEntity findByCarId_Id(Integer id);

    MyOrderEntity findTopByOrderByIdDesc();

    List<MyOrderEntity> findByEmployeeId(EmployeeEntity employee_id);
    MyOrderEntity findById(Integer id);
}