package com.back.domain.order.dto;

import com.back.domain.order.entity.OrderItem;

public record OrderItemResponseDto(
    int id,
    int itemId,
    String itemName,
    int price,
    int quantity
) {
    public static OrderItemResponseDto from(OrderItem orderItem) {
        return new OrderItemResponseDto(
            orderItem.getId(),
            orderItem.getItem().getId(),
            orderItem.getItem().getItemName(),
            orderItem.getItem().getPrice(),
            orderItem.getQuantity()
        );
    }
}

