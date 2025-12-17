package com.back.domain.item.service;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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
    private final ItemRepository itemRepository;

    public List<ItemResponse> findAll() {
        return itemRepository.findAll().stream().map(ItemResponse::new).toList();
    }

    public ItemResponse findById(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));
        return new ItemResponse(item);
    }

    @Transactional
    public ItemResponse create(String itemName, int price) {
        if (itemRepository.existsByItemNameIgnoreCase(itemName)) {
            throw new DataIntegrityViolationException("이미 존재하는 상품명입니다.");
        }
        Item item = new Item(itemName, price);
        Item saved = itemRepository.save(item);

        return new ItemResponse(saved);
    }

    @Transactional
    public ItemResponse modify(int id, String itemName, int price) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));
        item.modify(itemName, price);

        return new ItemResponse(item);
    }

    @Transactional
    public ItemResponse delete(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));
        itemRepository.delete(item);

        return new ItemResponse(item);
    }
}
