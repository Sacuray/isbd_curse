package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;

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
