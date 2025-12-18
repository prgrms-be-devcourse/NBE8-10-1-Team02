package com.back.domain.order.order.dto.reponse;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.dto.OrderItemResponse;

import java.time.LocalDateTime;
import java.util.List;

public record OrderDetailResponse(
        int id,
        LocalDateTime createDate,
        String email,
        String address,
        String postcode,
        List<OrderItemResponse> orderItems
) {
    public static OrderDetailResponse from(Order order, List<OrderItemResponse> orderItems) {
        return new OrderDetailResponse(
                order.getId(),
                order.getCreateDate(),
                order.getEmail(),
                order.getAddress(),
                order.getPostcode(),
                orderItems
        );
    }
}
