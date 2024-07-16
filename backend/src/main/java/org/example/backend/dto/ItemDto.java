package org.example.backend.dto;

import org.example.backend.model.Amount;

public record ItemDto(String name, Amount amount) {
}
