package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import com.example.isbd.enumerations.Status_order_enum;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "my_order")
public class MyOrderEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name="datetime_order")
    @CreationTimestamp
    private java.sql.Timestamp datetime_order;
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::status_order_enum")
    @Column(name = "status_order", columnDefinition = "status_order_enum", nullable = false)
    private Status_order_enum status_order;
    @Column(name="start_time")
    @CreationTimestamp
    private java.sql.Timestamp start_time;
    @Column(name="end_time")
    @CreationTimestamp
    private java.sql.Timestamp end_time;
    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceEntity service_id;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private EmployeeEntity employeeId;
    @OneToOne
    @JoinColumn(name = "car_id")
    private CarEntity carId;

    
}
