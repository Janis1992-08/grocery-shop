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
                    Classify the provided text into one of these classes:
                    BUSINESS, SPORT, TECHNOLOGY, OTHER.
                    """)
                .user(text)
                .call()
                .content();
    }

}