package com.back.global.initData;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.service.ItemService;
import com.back.domain.order.order.dto.request.OrderCreateRequest;
import com.back.domain.order.order.service.OrderService;
import com.back.domain.order.orderItem.dto.OrderItemRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;
    private final OrderService orderService;
    private final ItemService itemService;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {

        return args -> {
            self.work1();
        };
    }

    @Transactional
    public void work1() {
        if (orderService.count() > 0 || itemService.count() > 0) return;

        ItemResponse item1 = itemService.createWithImageUrl(
                "아메리카노",
                2000,
                "/images/americano.png"
        );

        ItemResponse item2 = itemService.createWithImageUrl(
                "커피콩",
                5000,
                "/images/coffeeBean.png"
        );

        ItemResponse item3 = itemService.createWithImageUrl(
                "카페라떼",
                3500,
                "/images/cafeLatte.png"
        );

        ItemResponse item4 = itemService.createWithImageUrl(
                "망고스무디",
                4500,
                "/images/mangoSmeethie.png"
        );

        List<OrderItemRequest> orderItems1 = new ArrayList<>();
        orderItems1.add(new OrderItemRequest(item1.id(), 1));
        orderItems1.add(new OrderItemRequest(item2.id(), 3));
        orderService.createOrder(new OrderCreateRequest("email1@gmail.com", "경기도", "11221", orderItems1));

        List<OrderItemRequest> orderItems2 = new ArrayList<>();
        orderItems2.add(new OrderItemRequest(item2.id(), 6));
        orderItems2.add(new OrderItemRequest(item1.id(), 2));
        orderItems2.add(new OrderItemRequest(item3.id(), 1));
        orderService.createOrder(new OrderCreateRequest("email1@gmail.com", "서울", "11211", orderItems2));

        List<OrderItemRequest> orderItems3 = new ArrayList<>();
        orderItems3.add(new OrderItemRequest(item2.id(), 2));
        orderItems3.add(new OrderItemRequest(item4.id(), 1));
        orderService.createOrder(new OrderCreateRequest("email2@gmail.com", "충남", "01444", orderItems3));

    }
}