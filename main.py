from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle


def manage_suggestions():

    def suggest_product(products, rules):
        """
        This function filters rules based on product presence and value.

        Args:
            products: A list of products.
            rules: A list of sublists with products and a value.

        Returns:
            A list containing the sublist from rules with the most products 
            present in products and a length of len(products) + 1.
        """

        # Filter rules with length of len(products)+1
        filtered_rules = [result for result in rules if len(
            result[0]) == len(products) + 1]

        # Filter rules where all products are present
        product_set = set(products)
        filtered_rules = [
            result for result in filtered_rules if product_set.issubset(result[0])]

        # Return the result with the highest value if multiple rules remain
        if filtered_rules:
            return max(filtered_rules, key=lambda x: x[1])
        else:
            return None

    def products_in_cart(products):
        cart_list = []
        for name in products.keys():
            if products[name]["added_to_cart"] == True:
                cart_list.append(name.lower())
        return cart_list

    for product in products.keys():
        products[product]["suggested"] = False
    cart_list = products_in_cart(products)
    if len(cart_list) > 0:
        rule = suggest_product(cart_list, rules)
        if rule:
            suggested_product = list(set(rule[0]) - set(cart_list))[0]
            products[suggested_product]["suggested"] = True


products = {
    "mineral water": {
        "name": "Mineral Water",
        "description": "Pure mineral water for hydration.",
        "quantity": 1,
        "price": 1.99,
        "added_to_cart": False,
        "suggested": False
    },
    "eggs": {
        "name": "Eggs",
        "description": "Fresh brown eggs, perfect for breakfast or baking.",
        "quantity": 1,
        "price": 2.49,
        "added_to_cart": False,
        "suggested": False
    },
    "spaghetti": {
        "name": "Spaghetti",
        "description": "Dried spaghetti pasta for a delicious meal.",
        "quantity": 1,
        "price": 1.79,
        "added_to_cart": False,
        "suggested": False
    },
    "french fries": {
        "name": "French Fries",
        "description": "Frozen french fries for a quick side dish.",
        "quantity": 1,
        "price": 3.99,
        "added_to_cart": False,
        "suggested": False
    },
    "chocolate": {
        "name": "Chocolate",
        "description": "Delicious milk chocolate bar for a sweet treat.",
        "quantity": 1,
        "price": 2.99,
        "added_to_cart": False,
        "suggested": False
    },
    "green tea": {
        "name": "Green Tea",
        "description": "Premium green tea bags for a refreshing drink.",
        "quantity": 1,
        "price": 5.49,
        "added_to_cart": False,
        "suggested": False
    },
    "milk": {
        "name": "Milk",
        "description": "Whole milk, great for drinking or cooking.",
        "quantity": 1,
        "price": 3.49,
        "added_to_cart": False,
        "suggested": False
    },
    "ground beef": {
        "name": "Ground Beef",
        "description": "Lean ground beef for burgers or tacos.",
        "quantity": 1,
        "price": 6.99,
        "added_to_cart": False,
        "suggested": False
    },
    "frozen vegetables": {
        "name": "Frozen Vegetables",
        "description": "Mixed frozen vegetables for a convenient and healthy side.",
        "quantity": 1,
        "price": 4.49,
        "added_to_cart": False,
        "suggested": False
    },
    "pancakes": {
        "name": "Pancakes",
        "description": "Pancake mix for a delicious breakfast option.",
        "quantity": 1,
        "price": 3.99,
        "added_to_cart": False,
        "suggested": False
    },
    "burgers": {
        "name": "Burgers",
        "description": "Frozen beef burgers for a quick and easy meal.",
        "quantity": 1,
        "price": 7.99,
        "added_to_cart": False,
        "suggested": False
    },
    "cake": {
        "name": "Cake",
        "description": "Delicious chocolate cake for a special occasion.",
        "quantity": 1,
        "price": 12.99,
        "added_to_cart": False,
        "suggested": False
    },
    "cookies": {
        "name": "Cookies",
        "description": "Soft chocolate chip cookies for a satisfying snack.",
        "quantity": 1,
        "price": 3.49,
        "added_to_cart": False,
        "suggested": False
    },
    "escalope": {
        "name": "Escalope",
        "description": "Thinly sliced breaded veal for a classic dish.",
        "quantity": 1,
        "price": 9.99,
        "added_to_cart": False,
        "suggested": False
    },
    'low fat yogurt': {
        "name": "Low Fat Yogurt",
        "description": "Healthy low-fat yogurt for breakfast or snacks.",
        "quantity": 1,
        "price": 3.99,
        "added_to_cart": False,
        "suggested": False
    },
}


file_name = "sample.pkl"
open_file = open(file_name, "rb")
rules = pickle.load(open_file)
open_file.close()


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/AddToCart/{productName}/{quantity}")
async def AddToCart(productName: str, quantity: int):
    if quantity > 0:
        products[productName.lower()]["added_to_cart"] = True
        products[productName.lower()]["quantity"] = quantity
        manage_suggestions()
    return products


@app.get("/RemoveFromCart/{productName}")
async def RemoveFromCart(productName: str):
    products[productName.lower()]["added_to_cart"] = False
    products[productName.lower()]["quantity"] = 1
    manage_suggestions()
    return products


@app.get("/GetProducts")
async def GetProducts():
    return products


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
