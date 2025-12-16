package com.back.domain.item.controller;

import com.back.domain.item.dto.ItemDto;
import com.back.domain.item.entity.Item;
import com.back.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ApiV1ItemController {
    private ItemService itemService;

    @GetMapping
    @Transactional(readOnly = true)
    public List<ItemDto> getItems() {
        List<Item> items = itemService.findAll();

        return items.stream()
                .map(ItemDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ItemDto getItem(
            @PathVariable int id
    ) {
        Item item = itemService.findById(id).get();

        return new ItemDto(item);
    }

}
