package com.back.domain.order.repository;


import com.back.domain.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findAllByOrderId(int orderId);
    void deleteAllByOrderId(int orderId);
}
