package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import com.example.isbd.enumerations.Job_title_enum;
import org.hibernate.annotations.ColumnTransformer;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "employee")
public class EmployeeEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "full_name_employee", nullable = false)
    private String full_name_employee;
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::job_title_enum")
    @Column(name = "post", columnDefinition = "job_title_enum", nullable = false)
    private Job_title_enum post;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "passcode", nullable = false)
    private String passcode;
    @ManyToOne
    @JoinColumn(name = "car_dealership_id")
    private CarDealershipEntity car_dealership;
}
