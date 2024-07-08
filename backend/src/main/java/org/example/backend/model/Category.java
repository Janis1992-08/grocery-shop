package org.example.backend.model;

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
    GIFT("Gift");

    private final String category;

    Category(String category){
        this.category = category;
    }

}
