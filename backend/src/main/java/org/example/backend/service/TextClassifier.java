package org.example.backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.ChatOptionsBuilder;
import org.springframework.stereotype.Service;

@Service
public class TextClassifier {

    private final ChatClient chatClient;

    TextClassifier(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder
                .defaultOptions(ChatOptionsBuilder.builder()
                        .withTemperature(0.0f)
                        .build())
                .build();
    }

    public String classify(String text) {
        return chatClient
                .prompt()
                .system("""
                    Classify the provided item into one of these classes and respond with only the class word. No additional words or punctuation should be included in your response:
                    MEAT, DAIRY, BAKERY, FROZEN, BEVERAGE, SNACK, ELECTRONICS, BOOK, CLOTHING, TOY, JEWELRY, HOUSEHOLD, COSMETICS, SPORT, GIFT, OTHER
                    """)
                .user(text)
                .call()
                .content();
    }

}