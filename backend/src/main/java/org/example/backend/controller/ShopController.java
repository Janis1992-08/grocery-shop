package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.ShoppingList;
import org.example.backend.service.ShopService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
