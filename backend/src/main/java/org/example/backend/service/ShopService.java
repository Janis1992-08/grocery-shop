package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ShoppingListDto;
import org.example.backend.model.Item;
import org.example.backend.model.ShoppingList;
import org.example.backend.repository.ListRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ListRepo listRepo;
    private final IdService idService;

    public List<ShoppingList> getAllList() {
        return listRepo.findAll();
    }

    public void addList(ShoppingListDto shoppingList) {
        ShoppingList list = new ShoppingList(idService.generateUUID(), shoppingList.listName(), new ArrayList<Item>());
        listRepo.save(list);
    }
}
