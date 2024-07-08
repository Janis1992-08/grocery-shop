package org.example.backend.repository;

import org.example.backend.model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ListRepo extends MongoRepository<ShoppingList, String> {

}
