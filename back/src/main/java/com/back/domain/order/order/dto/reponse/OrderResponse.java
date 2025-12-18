package com.back.domain.order.order.dto.reponse;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.dto.OrderItemResponse;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        int id,
        LocalDateTime createDate,
        List<OrderItemResponse> items
) {
    public OrderResponse(Order order) {
        this(
                order.getId(),
                order.getCreateDate(),
                order.getOrderItems().stream()
                        .map(OrderItemResponse::from)
                        .toList()
        );
    }
}

