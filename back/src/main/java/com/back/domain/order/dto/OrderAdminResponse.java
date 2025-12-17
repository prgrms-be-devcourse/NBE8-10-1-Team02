package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;

import java.time.LocalDateTime;

public record OrderAdminResponse(
        int id,
        LocalDateTime createDate,
        String email,
        String address,
        String postcode
) {
    public OrderAdminResponse(Order order) {
        this(
                order.getId(),
                order.getCreateDate(),
                order.getEmail(),
                order.getAddress(),
                order.getPostcode()
        );
    }
}
