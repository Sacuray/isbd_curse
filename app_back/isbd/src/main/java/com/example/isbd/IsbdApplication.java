package com.example.isbd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EnableJpaRepositories
@SpringBootApplication
public class IsbdApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(IsbdApplication.class, args);
		System.out.println("asvsdvd");
	}

}
