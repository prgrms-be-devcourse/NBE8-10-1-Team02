package com.back.domain.order.controller;

import com.back.domain.order.admin.controller.ApiV1AdminOrderController;
import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test") // 테스트 환경에서는 test 프로파일을 활성화합니다.
@SpringBootTest // 스프링부트 테스트 클래스임을 나타냅니다.
@AutoConfigureMockMvc // MockMvc를 자동으로 설정합니다.
@Transactional // 각 테스트 메서드가 종료되면 롤백됩니다.
public class ApiV1AdminOrderControllerTest {
    @Autowired
    private MockMvc mvc; // MockMvc를 주입받습니다.
    @Autowired
    OrderService orderService;

    @Test
    @DisplayName("관리자 주문조회_다건")
    void t1() throws Exception {
        ResultActions resultActions = mvc
                .perform(
                        get("/api/v1/admin/orders")
                )
                .andDo(print());

        List<Order> orders = orderService.findAll();

        resultActions
                .andExpect(handler().handlerType(ApiV1AdminOrderController.class))
                .andExpect(handler().methodName("getAdminOrders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(orders.size()));

        for (int i = 0; i < orders.size(); i++) {
            Order order = orders.get(i);
            resultActions
                    .andExpect(jsonPath("$[%d].id".formatted(i)).value(order.getId()))
                    .andExpect(jsonPath("$[%d].createDate".formatted(i)).value(Matchers.startsWith(order.getCreateDate().toString().substring(0, 20))))
                    .andExpect(jsonPath("$[%d].email".formatted(i)).value(order.getEmail()))
                    .andExpect(jsonPath("$[%d].address".formatted(i)).value(order.getAddress()))
                    .andExpect(jsonPath("$[%d].postcode".formatted(i)).value(order.getPostcode()));
        }
    }


}
