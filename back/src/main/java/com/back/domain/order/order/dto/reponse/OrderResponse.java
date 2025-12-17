package com.back.domain.order.order.dto.reponse;

import com.back.domain.order.order.entity.Order;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
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
