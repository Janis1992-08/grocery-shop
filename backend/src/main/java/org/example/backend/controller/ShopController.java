package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ItemDto;
import org.example.backend.dto.ShoppingListDto;
import org.example.backend.model.ShoppingList;
import org.example.backend.model.Item;
import org.example.backend.model.UpdateRequest;
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

    @PostMapping("/{listId}/items/{itemName}/updateDone")
    public void updateItemDone(@PathVariable String listId, @PathVariable String itemName,@RequestBody UpdateRequest request) {
        shopService.updateItemDone(listId, itemName, request);
    }

    @GetMapping("/status/{id}")
    public String getListsWithStatus(@PathVariable String id) {
        return shopService.getListsWithStatus(id);
    }

    @PostMapping("/{listId}/items")
    public void addItem(@PathVariable String listId, @RequestBody ItemDto itemDto) {
        shopService.addItem(listId, itemDto);
    }
    @PutMapping("/{listId}/items/{itemName}")
    public ResponseEntity<ShoppingList> updateItem(
            @PathVariable String listId,
            @PathVariable String itemName,
            @RequestBody Item updatedItem) {

        Optional<ShoppingList> updatedList = shopService.updateItem(listId, itemName, updatedItem);
        return updatedList.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{listId}/items/{itemName}")
    public ResponseEntity<Void> deleteItem(@PathVariable String listId, @PathVariable String itemName) {
        boolean deleted = shopService.deleteItem(listId, itemName);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{listId}/uncheck")
    public void updateItemsToNotDone(@PathVariable String listId) {
        shopService.updateItemsToNotDone(listId);
    }
}
