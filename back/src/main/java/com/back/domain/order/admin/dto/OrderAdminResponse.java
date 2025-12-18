package com.back.domain.order.admin.dto;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.dto.OrderItemResponse;

import java.time.LocalDateTime;
import java.util.List;

public record OrderAdminResponse(
        int id,
        LocalDateTime createDate,
        String email,
        List<OrderItemResponse> items
) {
    public OrderAdminResponse(Order order) {
        this(
                order.getId(),
                order.getCreateDate(),
                order.getEmail(),
                order.getOrderItems().stream()
                        .map(OrderItemResponse::from)
                        .toList()
        );
    }
}
