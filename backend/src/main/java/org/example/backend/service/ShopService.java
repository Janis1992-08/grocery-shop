package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ItemDto;
import org.example.backend.dto.ShoppingListDto;
import org.example.backend.model.Category;
import org.example.backend.model.Item;
import org.example.backend.model.ShoppingList;
import org.example.backend.model.UpdateRequest;
import org.example.backend.repository.ListRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ListRepo listRepo;
    private final IdService idService;
    private final TextClassifier textClassifier;

    public List<ShoppingList> getAllList() {
        return listRepo.findAll();
    }

    public void addList(ShoppingListDto shoppingListDto) {
        ShoppingList shoppingList = new ShoppingList(idService.generateUUID(), shoppingListDto.listName(), new ArrayList<>());
        listRepo.save(shoppingList);
    }

    public void updateList(String id, ShoppingListDto shoppingList) {
        Optional<ShoppingList> foundList = listRepo.findById(id);
        if (foundList.isPresent()) {
            ShoppingList updateList = foundList.orElseThrow().withListName(shoppingList.listName());
            listRepo.save(updateList);
        }

    }

    public void deleteList(String id) {
        listRepo.deleteById(id);
    }

    public Optional<ShoppingList> getListById(String id) {
        return listRepo.findById(id);
    }

    public void updateItemDone(String listId, String itemName, UpdateRequest updateRequest) {
        Optional<ShoppingList> optionalShoppingList = listRepo.findById(listId);
        if (optionalShoppingList.isPresent()) {
            ShoppingList shoppingList = optionalShoppingList.get();
            boolean itemFound = false;

            for (int i = 0; i < shoppingList.item().size(); i++) {
                Item item = shoppingList.item().get(i);
                if (item.name().equals(itemName)) {
                    item = item.withDone(updateRequest.done());
                    shoppingList.item().set(i, item);
                    itemFound = true;
                    break;
                }
            }
            if (!itemFound) {
                throw new RuntimeException("Item not found: " + itemName);
            }
            listRepo.save(shoppingList);
        } else {
            throw new RuntimeException("ShoppingList not found: " + listId);
        }
    }

    public long getTotalItems(String id) {
        return listRepo.findById(id)
                .map(list -> (long) list.item().size())
                .orElse(0L);
    }

    public long getCompletedItems(String id) {
        return listRepo.findById(id)
                .map(list -> list.item().stream().filter(Item::done).count())
                .orElse(0L);
    }

    public String getListsWithStatus(String id) {
        return getCompletedItems(id) +" / "+ getTotalItems(id);
    }

    public void addItem(String listId, ItemDto itemDto) {
        String classifiedCategory = textClassifier.classify(itemDto.name());
        Category itemCategory;

        try {
            itemCategory = Category.valueOf(classifiedCategory.trim().toUpperCase());
        } catch (IllegalArgumentException error) {
            itemCategory = Category.OTHER;
        }

        Optional<ShoppingList> shoppingListOptional = listRepo.findById(listId);

        if (shoppingListOptional.isEmpty()) return;

        ShoppingList shoppingList = shoppingListOptional.get();
        shoppingList.item().add(new Item(itemDto.name(), false, itemDto.amount(), itemCategory));
        listRepo.save(shoppingList);
    }
}
