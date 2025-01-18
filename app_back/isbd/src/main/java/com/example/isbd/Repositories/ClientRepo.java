package com.example.isbd.Repositories;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.isbd.Enteties.ClientEntity;




public interface ClientRepo extends JpaRepository<ClientEntity, Long> {
    @Query("select c from client c where c.email = ?1")
    ClientEntity findByEmail(String email);

    ClientEntity findTopByOrderByIdDesc();
}