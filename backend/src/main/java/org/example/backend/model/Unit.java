package org.example.backend.model;



public enum Unit {
    PIECES("pcs"),
    KILOGRAM("kg"),
    GRAM("g"),
    LITER("l"),
    MILLILITERS("ml");

    private final String unit;

    Unit(String unit){
        this.unit = unit;
    }

    @Override
    public String toString() {
        return unit;
    }
}
