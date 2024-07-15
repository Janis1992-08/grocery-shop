package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ShoppingListDto;
import org.example.backend.model.ShoppingList;
import org.example.backend.service.ShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @GetMapping()
    public List<ShoppingList> getAllList() {
        return shopService.getAllList();
    }
    @PostMapping()
    public void addList(@RequestBody ShoppingListDto shoppingList) {
        shopService.addList(shoppingList);
    }
    @PutMapping("/{id}")
    public void updateList(@PathVariable String id, @RequestBody ShoppingListDto shoppingList) {
        shopService.updateList(id, shoppingList);
    }
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable String id) {
        shopService.deleteList(id);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getListById(@PathVariable String id) {
        Optional<ShoppingList> list = shopService.getListById(id);
        return list.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/stats/{id}")
    public String getToDoListsWithStats(@PathVariable String id) {
        return shopService.getToDoListsWithStats(id);
    }

}
