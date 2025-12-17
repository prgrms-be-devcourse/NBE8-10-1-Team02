package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;

import java.time.LocalDateTime;

public record OrderResponse(
        int id,
        LocalDateTime createDate,
        String email,
        String address,
        String postcode
) {
    public OrderResponse(Order order) {
        this(
                order.getId(),
                order.getCreateDate(),
                order.getEmail(),
                order.getAddress(),
                order.getPostcode()
        );
    }
}
