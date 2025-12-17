package com.back.domain.order.orderItem.dto;

import com.back.domain.order.orderItem.entity.OrderItem;

public record OrderItemResponse(
    int id,
    int itemId,
    String itemName,
    int price,
    int quantity
) {
    public static OrderItemResponse from(OrderItem orderItem) {
        return new OrderItemResponse(
            orderItem.getId(),
            orderItem.getItem().getId(),
            orderItem.getItem().getItemName(),
            orderItem.getItem().getPrice(),
            orderItem.getQuantity()
        );
    }
}

