current_sum_of_calories = 0
max_total_calories = 0

with open('input.txt', encoding="utf-8") as input:
    for line in input:
        calories = line.strip()

        if (calories == ''):
            max_total_calories = max(current_sum_of_calories, max_total_calories)
            current_sum_of_calories = 0
        else:
            current_sum_of_calories += int(calories)

print(max_total_calories)