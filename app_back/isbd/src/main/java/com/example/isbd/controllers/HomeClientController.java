package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Enteties.PossessionEntity;
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
@RequestMapping("/home_client")
@CrossOrigin
public class HomeClientController {
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private PossessionRepo PossessionRepo;
    @Autowired
    private MyOrderRepo myOrderRepo;
    @PostMapping("/get_client")
    @CrossOrigin
    public ClientEntity getClient(@RequestBody ClientEntity client) {
        String email = client.getEmail();
        System.out.println(email);
        ClientEntity clientEntity = clientRepo.findByEmail(email);
        return clientEntity;
    }
    @PostMapping("/get_cars")
    @CrossOrigin
    public List<CarEntity> getCars(@RequestBody ClientEntity client) {
        String email = client.getEmail();
        System.out.println(email);
        ClientEntity clientEntity = clientRepo.findByEmail(email);
        List <PossessionEntity> possessions = PossessionRepo.findPossessionsByclientId_Id(clientEntity.getId());
        List <CarEntity> cars = new ArrayList<>();
        for(int i = 0; i < possessions.size(); i++){
            CarEntity car1 = possessions.get(i).getCarId();
            cars.add(car1);
        }
        return cars;
    }
    @PostMapping("/get_orders")
    @CrossOrigin
    public List<MyOrderEntity> getOrders(@RequestBody ClientEntity client) {
        String email = client.getEmail();
        System.out.println(email);
        ClientEntity clientEntity = clientRepo.findByEmail(email);
        List <PossessionEntity> possessions = PossessionRepo.findPossessionsByclientId_Id(clientEntity.getId());
        List <MyOrderEntity> myOrders = new ArrayList<>();
        for(int i = 0; i < possessions.size(); i++){
            CarEntity car1 = possessions.get(i).getCarId();
            if(myOrderRepo.findByCarId_Id(car1.getId()) == null){
                continue;
            }
            if(myOrderRepo.findByCarId_Id(car1.getId()).getStatus_order() == Status_order_enum.COMPLETED || myOrderRepo.findByCarId_Id(car1.getId()).getStatus_order() == Status_order_enum.CANCELLED){
                myOrderRepo.delete(myOrderRepo.findByCarId_Id(car1.getId()));
            }
            myOrders.add(myOrderRepo.findByCarId_Id(car1.getId()));
            System.out.println("TEEEEEEEEEEEEEEEEEEEEEEEEEEST");
            System.out.println(myOrderRepo.findByCarId_Id(car1.getId()).getService_id().getNameService());
            System.out.println("TEEEEEEEEEEEEEEEEEEEEEEEEEEST");
        }
        
        return myOrders;
    }
    
}