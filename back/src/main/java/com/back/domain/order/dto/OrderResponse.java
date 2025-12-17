package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;

import java.time.LocalDateTime;

public class OrderResponse {
    int id;
    LocalDateTime createDate;
    String email;
    String address;
    String postcode;

    public OrderResponse(Order order) {
        this.id = order.getId();
        this.createDate = order.getCreateDate();
        this.email = order.getEmail();
        this.address = order.getAddress();
        this.postcode = order.getPostcode();
    }


}
