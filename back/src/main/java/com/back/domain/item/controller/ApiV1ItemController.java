package com.back.domain.item.controller;

import com.back.domain.item.dto.ItemResponse;
import com.back.domain.item.service.ItemService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@Validated
@RequiredArgsConstructor
public class ApiV1ItemController {
    private final ItemService itemService;

    @GetMapping
    public List<ItemResponse> getItems() {
        return itemService.findAll();
    }

    @GetMapping("/{id}")
    public ItemResponse getItem(@PathVariable @Positive int id) {
        return itemService.findById(id);
    }

    record ItemCreateReqBody(
            @NotBlank
            @Size(min = 2, max = 100)
            String itemName,
            @Positive
            int price
    ) {}
    @PostMapping
    public RsData<ItemResponse> create(
            @Valid @RequestBody ItemCreateReqBody reqBody
    ) {
        ItemResponse itemResponse = itemService.create(reqBody.itemName(), reqBody.price());

        return new RsData<>(
                "201-1",
                "%d번 상품이 등록되었습니다.".formatted(itemResponse.id()),
                itemResponse
        );
    }

    record ItemModifyReqBody(
            @NotBlank
            @Size(min = 2, max = 100)
            String itemName,
            @Positive
            int price
    ) {}
    @PutMapping("/{id}")
    public RsData<ItemResponse> modify(
            @PathVariable @Positive int id,
            @Valid @RequestBody ItemModifyReqBody reqBody
    ) {
        ItemResponse modified = itemService.modify(id, reqBody.itemName(), reqBody.price());

        return new RsData<>(
                "200-1",
                "%d번 상품이 수정되었습니다.".formatted(id),
                modified
        );
    }

    @DeleteMapping("/{id}")
    public RsData<ItemResponse> delete(@PathVariable @Positive int id) {
        ItemResponse itemResponse = itemService.delete(id);

        return new RsData<>(
                "200-1",
                "%d번 상품이 삭제되었습니다.".formatted(id),
                itemResponse
        );
    }
}
