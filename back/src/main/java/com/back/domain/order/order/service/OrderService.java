package com.back.domain.order.order.service;

import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import com.back.domain.order.order.dto.reponse.OrderUpdateResponse;
import com.back.domain.order.order.dto.request.OrderCreateRequest;
import com.back.domain.order.order.dto.reponse.OrderDetailResponse;
import com.back.domain.order.order.dto.request.OrderUpdateRequest;
import com.back.domain.order.orderItem.dto.OrderItemRequest;
import com.back.domain.order.orderItem.dto.OrderItemResponse;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.orderItem.entity.OrderItem;
import com.back.domain.order.orderItem.repository.OrderItemRepository;
import com.back.domain.order.order.repository.OrderRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ItemRepository itemRepository;

    public List<Order> getOrdersByEmail(String email) {
        List<Order> orders = orderRepository.findAllByEmail(email);
        if (orders.isEmpty()) {
            throw new NoSuchElementException("해당 이메일로 등록된 주문 내역이 없습니다: " + email);
        }
        return orders;
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

        List<OrderItemResponse> items = orderItemRepository.findAllByOrderId(orderId)
                .stream()
                .map(OrderItemResponse::from)
                .toList();

        return OrderDetailResponse.from(order, items);
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
    @Transactional
    public void orderDelete(int orderId){
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 주문이 존재하지 않습니다."));
        orderRepository.delete(order);
    }

    @Transactional
    public OrderUpdateResponse updateOrder(int orderId, OrderUpdateRequest reqBody) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 주문이 존재하지 않습니다."));

        // 1) 주문 기본정보 수정
        order.setEmail(reqBody.email());
        order.setAddress(reqBody.address());
        order.setPostcode(reqBody.postcode());

        // 2) 기존 orderItems를 itemId 기준 Map으로
        Map<Integer, OrderItem> existingByItemId = order.getOrderItems().stream()
                .collect(Collectors.toMap(oi -> oi.getItem().getId(), Function.identity()));

        // 3) 요청 itemId set(중복 방지 + 삭제 판단)
        Set<Integer> requestedItemIds = new HashSet<>();

        for (OrderItemRequest oiReq : reqBody.orderItems()) {
            int itemId = oiReq.itemId();
            int quantity = oiReq.quantity(); // @Min(1)로 1 이상만 들어옴

            if (!requestedItemIds.add(itemId)) {
                throw new IllegalArgumentException("orderItems에 같은 itemId가 중복되었습니다. itemId=" + itemId);
            }

            OrderItem existing = existingByItemId.get(itemId);

            if (existing != null) {
                // 4-A) 있던 줄이면 UPDATE (OrderItem PK 유지)
                existing.changeQuantity(quantity);
            } else {
                // 4-B) 없던 줄이면 INSERT
                Item item = itemRepository.findById(itemId)
                        .orElseThrow(() -> new IllegalArgumentException("상품이 없습니다. itemId=" + itemId));

                OrderItem newOrderItem = new OrderItem(order, item, quantity);
                order.getOrderItems().add(newOrderItem); // cascade=ALL이면 자동 persist
            }
        }

        // 5) 요청에 없는 기존 줄은 삭제 (orphanRemoval=true면 remove만으로 delete)
        order.getOrderItems().removeIf(oi -> !requestedItemIds.contains(oi.getItem().getId()));

        return new OrderUpdateResponse(orderId);
    }

    public long count() {
        return orderRepository.count();
    }
}
