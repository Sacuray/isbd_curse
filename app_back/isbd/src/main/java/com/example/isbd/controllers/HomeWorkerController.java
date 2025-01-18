package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.example.isbd.Enteties.AutopartEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Repositories.AutopartRepo;
import com.example.isbd.Repositories.EmployeeRepo;
import com.example.isbd.Repositories.MyOrderRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/home_worker")
@CrossOrigin
public class HomeWorkerController {
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private MyOrderRepo myOrderRepo;
    @Autowired
    private AutopartRepo autopartRepo;
    @PostMapping("/get_worker")
    @CrossOrigin
    public EmployeeEntity getClient(@RequestBody EmployeeEntity client) {
        String email = client.getEmail();
        EmployeeEntity employeeEntity = employeeRepo.findByEmail(email);
        return employeeEntity;
    }
    @PostMapping("/get_autoparts")
    @CrossOrigin
    public List<AutopartEntity> getAutoparts(@RequestBody EmployeeEntity e) {
        return autopartRepo.findAll();
    }
    @PostMapping("/update_autoparts")
    @CrossOrigin
    public List<AutopartEntity> apdateAutopart(@RequestBody AutopartEntity autopartEntity) {
        AutopartEntity autopart = autopartRepo.findByIdOrderByPriceDesc(autopartEntity.getId());
        autopart.setCount(autopart.getCount()+10);
        autopartRepo.save(autopart);
        autopartRepo.flush();
        return autopartRepo.findAll();
    }
    @PostMapping("/get_orders")
    @CrossOrigin
    public List<MyOrderEntity> getOrders(@RequestBody EmployeeEntity employeeEntity) {
        EmployeeEntity employee = employeeRepo.findByEmail(employeeEntity.getEmail());
        List <MyOrderEntity> myOrders;
        myOrders = myOrderRepo.findByEmployeeId(employee);
        return myOrders;
    }
    
}