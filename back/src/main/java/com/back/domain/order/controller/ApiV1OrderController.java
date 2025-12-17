package com.back.domain.order.controller;

import com.back.domain.order.dto.OrderDetailResponse;
import com.back.domain.order.dto.OrderItemResponseDto;
import com.back.domain.order.service.OrderService;
import com.back.global.rsData.RsData;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderController {

    private final OrderService orderService;

    //주문생성 POST /api/orders

    //주문 내역 조회 (비회원 – 이메일 기준) GET /api/orders?email=test@example.com

    //주문 상세 조회 GET /api/orders/{orderId}
    @GetMapping("/{orderId}")
    public OrderDetailResponse getOrder(@PathVariable int orderId) {
        return orderService.getOrderDetail(orderId);
    }

    //주문 수정 PUT /api/orders/{orderId}

    //주문 삭제(전체 삭제)DELETE /api/orders/{orderId}

}
