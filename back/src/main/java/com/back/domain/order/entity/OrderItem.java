package com.back.domain.order.entity;

import com.back.domain.item.entity.Item;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@Builder
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = LAZY, optional = false)
    @JoinColumn(name="order_id")
    private Order order;

    @ManyToOne(fetch = LAZY, optional = false)
    @JoinColumn(name="item_id")
    private Item item;

    @Column(nullable = false)
    private int quantity;

    public OrderItem(Order order, Item item, int quantity) {
        this.order = order;
        this.item = item;
        this.quantity = quantity;
    }


    public void changeQuantity(int quantity) {
        this.quantity = quantity;
    }


}
