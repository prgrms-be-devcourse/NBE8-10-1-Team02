package com.back.domain.order.service;

import com.back.domain.order.dto.OrderDetailResponse;
import com.back.domain.order.dto.OrderItemResponseDto;
import com.back.domain.order.entity.Order;
import com.back.domain.order.repository.OrderItemRepository;
import com.back.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;


    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findAllByEmail(email);
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    //주문 상세 조회 api/v1/orders/{orderId}에서 사용
    public OrderDetailResponse getOrderDetail(int orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("주문이 없습니다."));

        List<OrderItemResponseDto> items = orderItemRepository.findAllByOrderId(orderId)
                .stream()
                .map(OrderItemResponseDto::from)
                .toList();

        return new OrderDetailResponse(order, items);
    }
}
