current_sum_of_calories = 0
totals = []

with open('input.txt', encoding="utf-8") as input:
    for line in input:
        calories = line.strip()

        if (calories == ''):
            totals.append(current_sum_of_calories)
            current_sum_of_calories = 0
        else:
            current_sum_of_calories += int(calories)

totals.sort()
print(sum(totals[-3:]))