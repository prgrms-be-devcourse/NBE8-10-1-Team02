package com.back.domain.order.order.dto.request;

import com.back.domain.order.orderItem.dto.OrderItemRequest;
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

