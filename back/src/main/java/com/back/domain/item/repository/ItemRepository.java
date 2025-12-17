package com.back.domain.item.repository;

import com.back.domain.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {


    /**
     * select
     * case when count(*) > 0 then true else false end
     * from item
     * where item_name = ?
     */
    boolean existsByItemNameIgnoreCase(String itemName);

}
