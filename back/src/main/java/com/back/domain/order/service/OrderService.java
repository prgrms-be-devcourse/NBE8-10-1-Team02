package com.back.domain.order.service;

import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import com.back.domain.order.dto.OrderCreateRequest;
import com.back.domain.order.dto.OrderDetailResponse;
import com.back.domain.order.dto.OrderItemResponseDto;
import com.back.domain.order.entity.Order;
import com.back.domain.order.entity.OrderItem;
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
    private final ItemRepository itemRepository;


    public List<Order> getOrdersByEmail(String email) {
        return orderRepository.findAllByEmail(email);
    }

    public Optional<Order> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
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

    //Order Create /api/v1/orders 에서 사용
    @Transactional
    public int createOrder(OrderCreateRequest req) {
        Order order = Order.builder()
                .email(req.email())
                .address(req.address())
                .postcode(req.postcode())
                .build();
        orderRepository.save(order);

        List<OrderItem> orderItems = req.orderItems().stream()
                .map(oiReq -> {
                    Item item = itemRepository.findById(oiReq.itemId())
                            .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다."));
                    return new OrderItem(order, item, oiReq.quantity());
                })
                .toList();

        orderItemRepository.saveAll(orderItems);

        return order.getId();
    }



}
