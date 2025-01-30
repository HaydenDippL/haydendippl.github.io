import { TypewriteInstruction } from "./Typewriter";

const python_junior_code: string = 
`def word_frequency_analysis(text):
    # Normalize text and split into words
    words = []
    for word in text.split():
        words.append(word.lower())
    
    # Count word occurences
    word_counts = {}
    for word in words:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1

    # Ignore filler words in the count
    ignore_words = {"the", "and", "is", "in", "to", "a", "an"}
    filtered_counts = {}
    for word, count in word_counts.items():
        if word not in ignore_words:
            filtered_counts[word] = count
    
    return filtered_counts`;

export const instructions: TypewriteInstruction[] = [
    ["write", { row: 0, col: 0, text: python_junior_code, speed_ms: 1 }],
    ["delete-lines", { start: 3, end: 5 }],
    ["delete", { row: 2, col: 14, num_deletions: 2 }],
    ["write", { row: 2, col: 12, text: "(word.lower() for word in text.split())"}],
    ["write", { row: 1, col: 41, text: " (generator)" }],
    ["delete-lines", { start: 6, end: 11 }],
    ["delete", { row: 5, col: 20, num_deletions: 2 }],
    ["write", { row: 0, col: 0, text: "\n" }],
    ["write", { row: 0, col: 0, text: "from collections import Counter\n" }],
    ["write", { row: 7, col: 18, text: "Counter(words)" }],
    ["write", { row: 6, col: 6, text: "Use Counter to " }],
    ["delete", { row: 6, col: 21, num_deletions: 1, reverse: true }],
    ["write", { row: 6, col: 21, text: "c" }],
    ["delete-lines", { start: 12, end: 15 }],
    ["write", { row: 11, col: 23, text: "word: count for word, count in\n        word_counts.items() if word not in stopwords"}],
    ["delete", { row: 9, col: 6, num_deletions: 32, reverse: true }],
    ["write", { row: 9, col: 6, text: "Filter out common stopwords using dictionary comprehension" }]
];