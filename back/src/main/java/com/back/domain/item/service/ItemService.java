package com.back.domain.item.service;

import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private ItemRepository itemRepository;
}
