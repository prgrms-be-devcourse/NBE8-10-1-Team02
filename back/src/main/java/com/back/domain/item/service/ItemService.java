package com.back.domain.item.service;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.entity.Item;
import com.back.domain.item.repository.ItemRepository;
import com.back.global.file.FileStorage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
    private final FileStorage fileStorage;

    public List<ItemResponse> findAll() {
        return itemRepository.findAll().stream().map(ItemResponse::new).toList();
    }

    public ItemResponse findById(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));
        return new ItemResponse(item);
    }

    @Transactional
    public ItemResponse create(String itemName, int price, MultipartFile image) {
        if (itemRepository.existsByItemNameIgnoreCase(itemName)) {
            throw new DataIntegrityViolationException("이미 존재하는 상품명입니다.");
        }
        String imageUrl = fileStorage.saveItemImage(image);
        Item item = new Item(itemName, price, imageUrl);
        Item saved = itemRepository.save(item);

        return new ItemResponse(saved);
    }

    public ItemResponse createWithImageUrl(String name, int price, String imageUrl) {
        Item item = new Item(name, price, imageUrl);
        return new ItemResponse(itemRepository.save(item));
    }

    @Transactional
    public ItemResponse modify(int id, String itemName, int price, MultipartFile image) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));

        String oldImageUrl = item.getImageUrl();

        // 이미지가 새로 들어온 경우에만 저장/교체
        String newImageUrl = fileStorage.saveItemImage(image);
        if (newImageUrl != null) {//이미지가 있을 때
            item.modify(itemName, price, newImageUrl);
            fileStorage.deleteByImageUrl(oldImageUrl);
        } else {
            item.modify(itemName, price, oldImageUrl);
        }

        return new ItemResponse(item);
    }

    @Transactional
    public ItemResponse delete(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("%d번 상품이 없습니다.".formatted(id)));
        itemRepository.delete(item);

        return new ItemResponse(item);
    }

    public long count() {
        return itemRepository.count();
    }
}
