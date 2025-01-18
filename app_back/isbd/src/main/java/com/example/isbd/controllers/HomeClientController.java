package com.example.isbd.controllers;

import com.example.isbd.services.HomeClientService;
import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Repositories.ClientRepo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/home_client")
@CrossOrigin
public class HomeClientController {

    @Autowired
    private HomeClientService homeClientService;
    @Autowired
    private ClientRepo clientRepo;
    @PostMapping("/get_client")
    @CrossOrigin
    public ClientEntity getClient(@RequestBody ClientEntity client) {
        String email = client.getEmail();
        return clientRepo.findByEmail(email);
    }
    @PostMapping("/get_cars")
    @CrossOrigin
    public List<CarEntity> getCars(@RequestBody ClientEntity client) {
        return homeClientService.getCars(client);
    }
    @PostMapping("/get_orders")
    @CrossOrigin
    public List<MyOrderEntity> getOrders(@RequestBody ClientEntity client) {
        return homeClientService.getOrders(client);
    }
    
}