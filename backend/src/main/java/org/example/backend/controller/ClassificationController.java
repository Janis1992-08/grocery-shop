package org.example.backend.controller;

import org.example.backend.service.TextClassifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassificationController {
    private final TextClassifier textClassifier;

    ClassificationController(TextClassifier textClassifier) {
        this.textClassifier = textClassifier;
    }

    @PostMapping("/classify")
    String classify(@RequestBody String text) {
        return textClassifier.classify(text);
    }
}
