package com.back.domain.order.admin.controller;

import com.back.domain.order.admin.dto.OrderAdminResponse;
import com.back.domain.order.order.dto.reponse.OrderResponse;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import com.back.global.rsData.RsData;
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
    public RsData<List<OrderAdminResponse>> getAdminOrders() {
        List<Order> orders = orderService.findAll();
        List<OrderAdminResponse> responseList = orders.stream()
                .map(OrderAdminResponse::new)
                .toList();

        return new RsData<>(
                "200",
                "모든 주문 목록 조회 성공",
                responseList
        );
    }
}
