package org.example.backend.model;

import lombok.With;

@With
public record Item(
        String name,
        boolean done,
        Amount amount,
        Category category
) {
}
