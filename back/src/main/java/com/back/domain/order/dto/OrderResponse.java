package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class OrderResponse {
    private final int id;
    private final LocalDateTime createDate;
    private final String email;

    public OrderResponse(Order order){
        this.id = order.getId();
        this.createDate = order.getCreateDate();
        this.email = order.getEmail();
    }
}
