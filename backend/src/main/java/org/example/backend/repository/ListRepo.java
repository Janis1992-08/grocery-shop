package org.example.backend.repository;

import org.example.backend.model.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepo extends MongoRepository<ShoppingList, String> {

}
