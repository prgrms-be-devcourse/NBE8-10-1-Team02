package com.back.domain.order.admin.controller;

import com.back.domain.order.admin.dto.OrderAdminResponse;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class ApiV1AdminOrderController {
    private final OrderService orderService;

    @GetMapping("/orders")
    public List<OrderAdminResponse> getAdminOrders() {
        List<Order> orders = orderService.findAll();

        return orders
                .stream()
                .map(OrderAdminResponse::new) // OrderResponse로 변환
                .toList();
    }
}
