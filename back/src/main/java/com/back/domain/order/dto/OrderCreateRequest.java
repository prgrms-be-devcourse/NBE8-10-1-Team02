package com.back.domain.order.dto;

import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderItem;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record OrderCreateRequest(
        @Email @NotBlank String email,
        @NotBlank String address,
        @NotBlank String postcode,
        @NotEmpty @Valid List<OrderItemRequest> orderItems
) { }

