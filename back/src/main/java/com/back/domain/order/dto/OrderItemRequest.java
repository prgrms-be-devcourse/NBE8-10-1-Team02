package com.back.domain.order.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;


public record OrderItemRequest(
        @NotNull Integer itemId,
        @NotNull @Min(1) Integer quantity
) { }
