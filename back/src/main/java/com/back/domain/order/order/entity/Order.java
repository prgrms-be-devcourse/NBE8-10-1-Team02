package com.back.domain.order.order.entity;

import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends BaseEntity {
    private String email;
    private String address;
    private String postcode;
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "order", fetch = LAZY, cascade = ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> orderItems = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }
}