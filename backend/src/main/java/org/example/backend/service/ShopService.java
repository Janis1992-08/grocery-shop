package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.ShoppingList;
import org.example.backend.repository.ListRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService {

    private final ListRepo listRepo;


    public List<ShoppingList> getAllList() {
        return listRepo.findAll();
    }
}
