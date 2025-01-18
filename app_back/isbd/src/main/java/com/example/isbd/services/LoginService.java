package com.example.isbd.services;

import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class LoginService {

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private EmployeeRepo employeeRepo;


    public String newClient(ClientEntity clientEntity){
        ClientEntity lastClient = clientRepo.findTopByOrderByIdDesc();
        boolean isEmailValid = clientEntity.getEmail().contains("@") && clientEntity.getEmail().contains(".");
        boolean isNotNull = clientEntity.getFull_name() != null && clientEntity.getBirth_date() != null && clientEntity.getEmail() != null && clientEntity.getGender() != null && clientEntity.getPassword() != null && clientEntity.getPhone_number() != null;
        boolean isPhoneValid = true;
        for(int i = 0; i<clientEntity.getPhone_number().length(); i++){
            if (!Character.isDigit(clientEntity.getPhone_number().charAt(i))){
                isPhoneValid = false;
            }
        }
        String result = "ok";
        if(!isNotNull){
            result = "isnull";
            return result;
        }else if(!isEmailValid){
            result = "wrong email";
            return result;
        }
        else if(!isPhoneValid){
            result = "wrong phone";
            return result;
        }
        else{
            clientEntity.setId(lastClient.getId() + 1);
            clientRepo.save(clientEntity);
            clientRepo.flush();

        }
        return result;
    }

    public String selectClient(ClientEntity clientEntity){
        String email = "";
        email = clientEntity.getEmail();
        String pass = clientEntity.getPassword();
        if(email == "" || pass == ""){
            return "isnull";
        }
        if(clientRepo.findByEmail(email) == null){
            return "Wrong email or password";
        }
        String right_password = clientRepo.findByEmail(email).getPassword();
        if(right_password.equals(pass)){
            return "ok";
        }else{
            return "Wrong email or password";
        }
    }

    public String selectWorker(EmployeeEntity employeeEntity){
        String email = "";
        email = employeeEntity.getEmail();
        String pass = employeeEntity.getPasscode();
        if(email == "" || pass == ""){
            return "isnull";
        }
        if(employeeRepo.findByEmail(email) == null){
            return "Wrong email or password";
        }
        String right_password = employeeRepo.findByEmail(email).getPasscode();
        if(right_password.equals(pass)){
            return "ok";
        }else{
            return "Wrong email or password";
        }
    }
}
