package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Repositories.CarRepo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/test")
@CrossOrigin
public class TestController {
    @Autowired
    private CarRepo carRepo;
    @GetMapping
    public List<CarEntity> getCars() {
        return carRepo.findAll();
    }
    
}
