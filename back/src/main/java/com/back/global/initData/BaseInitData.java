package com.back.global.initData;

import com.back.domain.item.service.ItemService;
import com.back.domain.order.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

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
        };
    }

    @Transactional
    public void work1() {
        if (orderService.count() > 0 || itemService.count() > 0) return;
    }
}