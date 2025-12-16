package com.back.domain.order.dto;

import com.back.domain.item.entity.Item;
import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderItem;
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
    private final List<OrderItemDto> orderItems;

    public OrderDetailResponse(Order order, List<OrderItemDto> orderItems){
        this.id = order.getId();
        this.createDate = order.getCreateDate();
        this.email = order.getEmail();
        this.address = order.getAddress();
        this.postcode = order.getPostcode();
        this.orderItems = orderItems;
    }

    @Getter
    public static class OrderItemDto{
        private final String itemName;
        private final int count;
        private final int price;

        public OrderItemDto(Item item, OrderItem orderItem) {
            this.itemName = item.getItemName();
            this.count = orderItem.getQuantity();
            this.price = item.getPrice();
        }
    }
}
