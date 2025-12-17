package com.back.domain.order.controller;


import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderCreateResponse;
import com.back.domain.order.dto.OrderDetailResponse;
import com.back.domain.order.service.OrderService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderController {

    private final OrderService orderService;

    //주문생성 POST /api/orders
    @PostMapping
    public RsData<OrderCreateResponse> createOrder(@Valid @RequestBody OrderCreateRequest reqBody) {
        int orderId = orderService.createOrder(reqBody); // 서비스가 orderId 반환
        return new RsData<>("201-1", "주문이 생성되었습니다.", new OrderCreateResponse(orderId));
    }

    //주문 내역 조회 (비회원 – 이메일 기준) GET /api/orders?email=test@example.com

    //주문 상세 조회 GET /api/orders/{orderId}
    @GetMapping("/{orderId}")
    public OrderDetailResponse getOrder(@PathVariable int orderId) {
        return orderService.getOrderDetail(orderId);
    }

    //주문 수정 PUT /api/orders/{orderId}

    //주문 삭제(전체 삭제)DELETE /api/orders/{orderId}

}
