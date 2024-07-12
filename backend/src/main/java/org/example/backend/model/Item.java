package org.example.backend.model;


public record Item(
        String name,
        boolean done,
        Amount amount,
        Category category
) {
}
