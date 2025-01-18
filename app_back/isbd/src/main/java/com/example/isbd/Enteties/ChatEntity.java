package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "chat")
public class ChatEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientEntity client;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private EmployeeEntity employee;
}
