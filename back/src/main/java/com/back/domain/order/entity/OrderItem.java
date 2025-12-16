package com.back.domain.order.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = LAZY, optional = false)
    private Order order;
    private int productId;
    private int quantity;

    public OrderItem(Order order, int productId, int quantity) {
        this.order = order;
        this.productId = productId;
        this.quantity = quantity;
    }


    public void changeQuantity(int quantity) {
        this.quantity = quantity;
    }


}
