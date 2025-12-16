package com.back.domain.order.dto;

import com.back.domain.item.entity.Item;
import com.back.domain.order.entity.OrderItem;
import lombok.Getter;

@Getter
public class OrderItemDto{
    private final String itemName;
    private final int count;
    private final int price;

    public OrderItemDto(Item item, OrderItem orderItem) {
        this.itemName = item.getItemName();
        this.count = orderItem.getQuantity();
        this.price = item.getPrice();
    }
}
