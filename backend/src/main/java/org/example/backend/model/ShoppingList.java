package org.example.backend.model;

import org.springframework.data.annotation.Id;

public record ShoppingList(
        @Id
        String id,
        String listName,
        Item[] item

) {

}
