package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.Enteties.AutopartEntity;
import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Enteties.PossessionEntity;
import com.example.isbd.Repositories.AutopartRepo;
import com.example.isbd.Repositories.CarRepo;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.EmployeeRepo;
import com.example.isbd.Repositories.MyOrderRepo;
import com.example.isbd.Repositories.PossessionRepo;
import com.example.isbd.enumerations.Status_order_enum;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/home_worker")
@CrossOrigin
public class HomeWorkerController {
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private PossessionRepo PossessionRepo;
    @Autowired
    private MyOrderRepo myOrderRepo;
    @Autowired
    private AutopartRepo autopartRepo;
    @PostMapping("/get_worker")
    @CrossOrigin
    public EmployeeEntity getClient(@RequestBody EmployeeEntity client) {
        String email = client.getEmail();
        System.out.println(email);
        EmployeeEntity employeeEntity = employeeRepo.findByEmail(email);
        System.out.println(employeeEntity.toString());
        return employeeEntity;
    }
    @PostMapping("/get_autoparts")
    @CrossOrigin
    public List<AutopartEntity> getAutoparts(@RequestBody EmployeeEntity e) {
        
        List<AutopartEntity> autopartEntities = autopartRepo.findAll();
        return autopartEntities;
    }
    @PostMapping("/update_autoparts")
    @CrossOrigin
    public List<AutopartEntity> apdateAutopart(@RequestBody AutopartEntity autopartEntity) {
        AutopartEntity autopart = autopartRepo.findByIdOrderByPriceDesc(autopartEntity.getId());
        autopart.setCount(autopart.getCount()+10);
        autopartRepo.save(autopart);
        autopartRepo.flush();
        List<AutopartEntity> autopartEntities = autopartRepo.findAll();
        return autopartEntities;
    }
    @PostMapping("/get_orders")
    @CrossOrigin
    public List<MyOrderEntity> getOrders(@RequestBody EmployeeEntity employeeEntity) {
        EmployeeEntity employee = employeeRepo.findByEmail(employeeEntity.getEmail());
        List <MyOrderEntity> myOrders = new ArrayList<>();
        myOrders = myOrderRepo.findByEmployeeId(employee);

        return myOrders;
    }
    
}