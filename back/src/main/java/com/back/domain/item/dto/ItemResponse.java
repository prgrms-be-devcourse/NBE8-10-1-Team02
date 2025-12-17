package com.back.domain.item.dto;

import com.back.domain.item.entity.Item;

import java.time.LocalDateTime;

public record ItemResponse(
        int id,
        LocalDateTime createDate,
        LocalDateTime modifyDate,
        String itemName,
        int price
) {
    public ItemResponse(Item item) {
        this(
                item.getId(),
                item.getCreateDate(),
                item.getModifyDate(),
                item.getItemName(),
                item.getPrice()
        );
    }
}
