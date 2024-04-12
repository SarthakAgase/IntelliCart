from itertools import chain
import pickle
from apyori import apriori
import pandas as pd

df = pd.read_csv('Market_Basket_Optimisation.csv', header=None)
df.fillna(0, inplace=True)

transactions = []
for i in range(0, len(df)):
    transactions.append([str(df.values[i, j])
                        for j in range(0, 20) if str(df.values[i, j]) != '0'])


def Top15(transactions):
    flatten_list = list(chain.from_iterable(transactions))
    item_counts = {}
    for item in flatten_list:
        if item in item_counts:
            item_counts[item] += 1
        else:
            item_counts[item] = 1

    # Sort the dictionary by value (count) in descending order
    sorted_items = sorted(item_counts.items(),
                          key=lambda x: x[1], reverse=True)

    # Get the top 10 most frequent items
    top_15 = sorted_items[:15]

    # Print the result
    top_15_list = [item[0] for item in top_15]

    return top_15_list


def common_elements(list_a, list_b):
    """
    This function keeps sublists from list_a that contain elements present in list_b.

    Args:
        list_a: A list of lists.
        list_b: A second list.

    Returns:
        A new list of lists containing sublists from list_a with common elements.
    """

    common_list = []
    for sublist in list_a:
        # Use set intersection to find common elements
        common_sublist = [item for item in sublist if item in set(list_b)]
        # Append sublists with at least one common element
        if common_sublist:
            common_list.append(common_sublist)
    return common_list


Top15Transactions = Top15(transactions)
transactions_modified = common_elements(transactions, Top15Transactions)


def inspect(rules):
    products = [list(rule[0]) for rule in rules]
    supports = [rule[1] for rule in rules]
    return [list(a) for a in zip(products, supports)]


rules = apriori(transactions=transactions_modified, min_support=0.001,
                min_confidence=0.05, min_lift=1, min_length=2, max_length=5)

rules = inspect(list(rules))

# print("Length: ", len(rules))
file_name = "sample.pkl"

open_file = open(file_name, "wb")
pickle.dump(rules, open_file)
open_file.close()
