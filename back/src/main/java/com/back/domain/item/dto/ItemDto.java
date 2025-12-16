package com.back.domain.item.dto;

import com.back.domain.item.entity.Item;

import java.time.LocalDateTime;

public record ItemDto(
        int id,
        LocalDateTime createDate,
        LocalDateTime modifyDate,
        String itemName,
        int price
) {
    public ItemDto(Item item) {
        this(
                item.getId(),
                item.getCreateDate(),
                item.getModifyDate(),
                item.getItemName(),
                item.getPrice()
        );
    }
}
