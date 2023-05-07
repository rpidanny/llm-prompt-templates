export const RepeatCopyPrompt = `
Q: say java twice and data once, and then repeat all of this three times.

# solution using Python:

def solution():
    """Q: say java twice and data once, and then repeat all of this three times."""
    result = []
    tmp = ["java", "java", "data"]
    for i in range(3):
        result.extend(tmp)
    return " ".join(result)



Q: ask a group of insects in what family? four times. after the fourth time say The happy family

# solution using Python:

def solution():
    """Q: ask a group of insects in what family? four times. after the fourth time say The happy family"""
    result = []
    tmp = []
    for i in range(1, 5):
        tmp.append("a group of insects in what family?")
    tmp.append("The happy family")
    result.extend(tmp)
    return " ".join(result)



Q: Repeat the word duck four times, but halfway through also say quack

# solution using Python:

def solution():
    """Q: Repeat the word duck four times, but halfway through also say quack"""
    result = []
    for i in range(1, 5):
        result.append("duck")
        if i == 2:
            result.append("quack")
    return " ".join(result)



Q: Print boolean eleven times, but after the 3rd and 8th also say correct

# solution using Python:

def solution():
    """Q: Print boolean eleven times, but after the 3rd and 8th also say correct"""
    result = []
    for i in range(1, 12):
        result.append("boolean")
        if i == 3 or i == 8:
            result.append("correct")
    return " ".join(result)



Q: {question}

# solution using Python:
`;

export const ObjectCountingPrompt = `
Q: I have a drum, a flute, a clarinet, a violin, four accordions, a piano, a trombone, and a trumpet. How many musical instruments do I have?

# solution using Python:

def solution():
    """Q: I have a drum, a flute, a clarinet, a violin, four accordions, a piano, a trombone, and a trumpet. How many musical instruments do I have?"""
    musical_instruments_to_count = {
        'drum': 1,
        'flute': 1,
        'clarinet': 1,
        'violin': 1,
        'accordion': 4,
        'piano': 1,
        'trombone': 1,
        'trumpet': 1
    }
    num_musical_instruments = sum(musical_instruments_to_count.values())
    return num_instruments



Q: I have a chair, two ovens, and three tables. How many objects do I have?

# solution using Python:

def solution():
    """Q: I have a chair, two ovens, and three tables. How many objects do I have?
    """
    objects_to_count = {
        'chair': 1,
        'oven': 2,
        'table': 3
    }
    num_objects = sum(objects_to_count.values())
    return num_objects



Q: I have a chair, two potatoes, a cauliflower, a lettuce head, two tables, a cabbage, two onions, and three fridges. How many vegetables do I have?

# solution using Python:

def solution():
    """Q: I have a chair, two potatoes, a cauliflower, a lettuce head, two tables, a cabbage, two onions, and three fridges. How many vegetables do I have?
    """
    # note: I'm not counting the chair, tables, or fridges as vegetables
    vegetables_to_count = {
        'potato': 2,
        'cauliflower': 1,
        'lettuce head': 1,
        'cabbage': 1,
        'onion': 2
    }
    num_vegetables = sum(vegetables_to_count.values())
    return num_vegetables



Q: I have a raspberry, a cat, a rabbit, a mouse, a pig, two snails, a fish, two cows, a snake, a goat, and a duck. How many animals do I have?

# solution using Python:

def solution():
    """Q: I have a raspberry, a cat, a rabbit, a mouse, a pig, two snails, a fish, two cows, a snake, a goat, and a duck. How many animals do I have?
    """
    # note: I'm not counting the raspberry as an animal
    animals_to_count = {
        'cat': 1,
        'rabbit': 1,
        'mouse': 1,
        'pig': 1,
        'snail': 2,
        'fish': 1,
        'cow': 2,
        'snake': 1,
        'goat': 1,
        'duck': 1
    }
    num_animals = sum(animals_to_count.values())
    return num_animals



Q: {question}

# solution using Python:
`;
