package com.back.domain.item.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Item extends BaseEntity {
    private String itemName;
    private int price;

    public Item(String itemName, int price) {
        this.itemName = itemName;
        this.price = price;
    }
}
