package org.example.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document(collection = "shoppingLists")
public record ShoppingList(
        @Id
        String id,
        String listName,
        Item[] item

) { }
