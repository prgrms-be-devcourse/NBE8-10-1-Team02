package com.back.domain.item.controller;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ApiV1ItemController {
    private ItemService itemService;

    @GetMapping
    public List<ItemResponse> getItems() {
        return itemService.findAll();
    }

    @GetMapping("/{id}")
    public ItemResponse getItem(@PathVariable int id) {
        return itemService.findById(id);
    }

}
