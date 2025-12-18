package com.back.domain.order.order.dto.reponse;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.dto.OrderItemResponse;
import jakarta.persistence.PrePersist;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OrderResponse {
    int id;
    LocalDateTime createDate;
    private final List<OrderItemResponse> items;

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.createDate = order.getCreateDate();
        this.items = order.getOrderItems().stream()
                .map(OrderItemResponse::from)
                .toList();
    }
}

