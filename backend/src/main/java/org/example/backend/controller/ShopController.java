package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.ShoppingList;
import org.example.backend.service.ShopService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping()
    public List<ShoppingList> getAllList() {
        return shopService.getAllList();
    }

    @PutMapping("/{id}")
    public void updateList(@PathVariable String id, @RequestBody ShoppingList shoppingList) {
        shopService.updateList(id, shoppingList);
    }
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable String id) {
        shopService.deleteList(id);
    }
}
