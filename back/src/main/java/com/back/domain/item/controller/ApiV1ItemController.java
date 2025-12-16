package com.back.domain.item.controller;

import com.back.domain.item.dto.ItemDto;
import com.back.domain.item.entity.Item;
import com.back.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ApiV1ItemController {
    private ItemService itemService;


}
