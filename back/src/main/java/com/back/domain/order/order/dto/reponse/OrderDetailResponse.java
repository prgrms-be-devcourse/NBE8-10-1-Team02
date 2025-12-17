package com.back.domain.order.order.dto.reponse;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.dto.OrderItemResponse;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class OrderDetailResponse {
    private final int id;
    private final LocalDateTime createDate;
    private final String email;
    private final String address;
    private final String postcode;
    private final List<OrderItemResponse> orderItems;

    public OrderDetailResponse(Order order, List<OrderItemResponse> orderItems){
        this.id = order.getId();
        this.createDate = order.getCreateDate();
        this.email = order.getEmail();
        this.address = order.getAddress();
        this.postcode = order.getPostcode();
        this.orderItems = orderItems;
    }
}
