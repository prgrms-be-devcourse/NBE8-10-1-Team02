package com.back.domain.order.dto;

import com.back.domain.order.entity.OrderItem;

public record OrderItemResponseDto(
    int id,
    int orderId,
    int itemId,
    int quantity
) {
    public static OrderItemResponseDto from(OrderItem orderItem) {
        return new OrderItemResponseDto(
            orderItem.getId(),
            orderItem.getOrder().getId(),
            orderItem.getItem().getId(),
            orderItem.getQuantity()
        );
    }
}

