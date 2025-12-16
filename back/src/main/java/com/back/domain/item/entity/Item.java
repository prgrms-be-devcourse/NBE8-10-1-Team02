package com.back.domain.item.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@Getter
public class Item extends BaseEntity {
    private String itemName;
    private int price;
}
