package com.back.domain.order.dto;

import com.back.domain.order.entity.OrderItem;
import java.util.Objects;

public record OrderItemResponseDto(
    int id,
    int productId,
    int quantity
) {
    public static OrderItemResponseDto from(OrderItem orderItem) {
        return new OrderItemResponseDto(
            orderItem.getId(),
            orderItem.getProductId(),
            orderItem.getQuantity()
        );
    }
}

