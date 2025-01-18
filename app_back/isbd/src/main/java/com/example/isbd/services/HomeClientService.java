package com.example.isbd.services;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.MyOrderEntity;
import com.example.isbd.Enteties.PossessionEntity;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.MyOrderRepo;
import com.example.isbd.enumerations.Status_order_enum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class HomeClientService {

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private com.example.isbd.Repositories.PossessionRepo possessionRepo;

    @Autowired
    private MyOrderRepo myOrderRepo;

    public List<CarEntity> getCars (ClientEntity client) {
        String email = client.getEmail();
        ClientEntity clientEntity = clientRepo.findByEmail(email);
        List <PossessionEntity> possessions = possessionRepo.findPossessionsByclientId_Id(clientEntity.getId());
        List <CarEntity> cars = new ArrayList<>();
        for (PossessionEntity possession : possessions) {
            CarEntity car1 = possession.getCarId();
            cars.add(car1);
        }
        return cars;
    }

    public List<MyOrderEntity> getOrders(ClientEntity client) {
        String email = client.getEmail();
        ClientEntity clientEntity = clientRepo.findByEmail(email);
        List <PossessionEntity> possessions = possessionRepo.findPossessionsByclientId_Id(clientEntity.getId());
        List <MyOrderEntity> myOrders = new ArrayList<>();
        for (PossessionEntity possession : possessions) {
            CarEntity car1 = possession.getCarId();
            if (myOrderRepo.findByCarId_Id(car1.getId()) == null) {
                continue;
            }
            if (myOrderRepo.findByCarId_Id(car1.getId()).getStatus_order() == Status_order_enum.COMPLETED || myOrderRepo.findByCarId_Id(car1.getId()).getStatus_order() == Status_order_enum.CANCELLED) {
                myOrderRepo.delete(myOrderRepo.findByCarId_Id(car1.getId()));
            }
            myOrders.add(myOrderRepo.findByCarId_Id(car1.getId()));
        }

        return myOrders;
    }
}
