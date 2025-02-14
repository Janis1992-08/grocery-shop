package org.example.backend.model;

import lombok.Getter;

@Getter
public enum Category {
    MEAT("Meat"),
    DAIRY("Dairy"),
    BAKERY("Bakery"),
    FROZEN("Frozen"),
    BEVERAGE("Beverage"),
    SNACK("Snack"),
    ELECTRONICS("Electronics"),
    BOOK("Book"),
    CLOTHING("Clothing"),
    TOY("Toy"),
    JEWELRY("Jewelry"),
    HOUSEHOLD("Household"),
    COSMETICS("Cosmetics"),
    SPORT("Sport"),
    GIFT("Gift"),
    FRUITS("Fruits"),
    VEGETABLES("Vegetables"),
    OTHER("Other");

    private final String category;

    Category(String category){
        this.category = category;
    }
}
