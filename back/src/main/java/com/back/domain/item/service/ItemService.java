package com.back.domain.item.service;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * dto로 모두 감싸서 반환
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {
    private ItemRepository itemRepository;

    public List<ItemResponse> findAll() {
        return itemRepository.findAll().stream().map(ItemResponse::new).toList();
    }

    public ItemResponse findById(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("%d번 상품이 없습니다.".formatted(id)));
        return new ItemResponse(item);
    }
}
