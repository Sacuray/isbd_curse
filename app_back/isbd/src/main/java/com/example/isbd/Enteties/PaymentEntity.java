package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.example.isbd.enumerations.Model_car;
import com.example.isbd.enumerations.Status_order_enum;

import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "payment")
public class PaymentEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name="sum_price")
    Integer sum_price;
    @Column(name="datetime_payment")
    private java.sql.Timestamp datetime_payment;
    @Column(name="description_payment")
    String description_payment;
    @OneToOne
    @JoinColumn(name = "order_id")
    private MyOrderEntity order_id;


    
}
