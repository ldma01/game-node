import { ExecutableGameFunctionResponse, GameFunction, ExecutableGameFunctionStatus } from "@virtuals-protocol/game"
import { restaurantInventory, restaurantBudget, ingredientPrices, updateRestaurantBudget } from "./worker"
import { getMoves, setAgentState } from "./agent"
export const getIngredients = new GameFunction({
    name: "get_ingredients",
    description: "Get the ingredients available in the kitchen",
    args: [
        {
            name: "ingredients",
            description: "The ingredients available in the kitchen"
        }
    ] as const,
    executable: async (args, logger) => {
        setAgentState({
            moves_left: getMoves() - 1
        })
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            JSON.stringify(restaurantInventory)
        )
    }
})

export const makeFood = new GameFunction({
    name: "make_food",
    description: "Make the food",
    args: [
        {
            name: "ingredients",
            description: "The ingredients available in the kitchen"
        }
    ] as const,
    executable: async (args, logger) => {
        setAgentState({
            moves_left: getMoves() - 1
        })
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            "return a dish based on the ingredients available: " + JSON.stringify(restaurantInventory)
        )
    }
})

export const buyIngredient = new GameFunction({
    name: "buy_ingredient",
    description: "Buy the ingredient",
    args: [
        { name: "currentBudget", description: "The current budget of the kitchen" },
        { name: "ingredient", description: "The ingredient to buy" },
        { name: "price", description: "The price of the ingredient" }
    ] as const,
    executable: async (args, logger) => {
        setAgentState({
            moves_left: getMoves() - 1
        })
        if (restaurantBudget! > Number(args.price!)) {
            const newBudget = restaurantBudget! - Number(args.price!);
            updateRestaurantBudget(newBudget);
            if (!restaurantInventory[args.ingredient!]) {
                restaurantInventory[args.ingredient!] = 0;
            }
            restaurantInventory[args.ingredient!] += 1;
        }
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            "return a dish based on the ingredients available: " + JSON.stringify(restaurantInventory)
        )
    }
})

export const getBudget = new GameFunction({
    name: "get_budget",
    description: "Get the budget",
    args: [] as const,
    executable: async (args, logger) => {
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            JSON.stringify(restaurantBudget)
        )
    }
})

export const getIngredientPrices = new GameFunction({
    name: "get_ingredient_prices",
    description: "Get the prices of the ingredients",
    args: [] as const,
    hint: "use this to get the prices of the ingredients",
    executable: async (args, logger) => {
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            JSON.stringify(ingredientPrices)
        )
    }
})

export const getMovesLeft = new GameFunction({
    name: "get_moves_left",
    description: "Get the moves left",
    args: [] as const,
    executable: async (args, logger) => {
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            JSON.stringify(getMoves())
        )
    }
})

export const doNothing = new GameFunction({
    name: "do_nothing",
    description: "Do nothing",
    args: [] as const,
    executable: async (args, logger) => {
        return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            "do nothing"
        )
    }
})
