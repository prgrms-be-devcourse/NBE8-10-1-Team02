package com.back.domain.order.controller;

import com.back.domain.order.dto.OrderResponse;
import com.back.domain.order.entity.Order;
import com.back.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class ApiV1AdminOrderController {
    private final OrderService orderService;

    @GetMapping
    @Transactional(readOnly = true)
    public List<OrderResponse> getItems() {
        List<Order> items = orderService.findAll();

        return items
                .stream()
                .map(OrderResponse::new) // OrderResponse로 변환
                .toList();
    }

}
