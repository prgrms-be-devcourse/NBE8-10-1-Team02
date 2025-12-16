package com.back.domain.order.service;


import com.back.domain.order.entity.OrderItem;
import com.back.domain.order.repository.OrderItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    //orderId에 속한 주문상품 줄 전부 조회
    @Transactional
    public List<OrderItem> findByOrderId(int orderId) {
        return orderItemRepository.findAllByOrderId(orderId);
    }

    //orderId에 속한 주문상품 줄 전부 삭제
    @Transactional
    public void deleteByOrderId(int orderId) {
        orderItemRepository.deleteAllByOrderId(orderId);
    }

    //주문상품 줄 저장
    @Transactional
    public OrderItem OrderItemSave(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    //주문상품 줄 수정
    @Transactional
    public OrderItem OrderItemUpdate(OrderItem orderItem, int quantity) {
        orderItem.changeQuantity(quantity);
        return orderItemRepository.save(orderItem);
    }
}
