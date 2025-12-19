package com.back.domain.item.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Item extends BaseEntity {
    @Column(unique = true)
    private String itemName;
    private int price;
    private String imageUrl;

    public Item(String itemName, int price, String imageUrl) {
        this.itemName = itemName;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    public void modify(String itemName, int price, String imageUrl) {
        this.itemName = itemName;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
