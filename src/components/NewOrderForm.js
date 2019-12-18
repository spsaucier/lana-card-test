import React from 'react'

const NewOrderForm = ({recipes, items, createOrder}) => {
    const isDisabled = recipeItems => {
        let isDisabled = false;
        recipeItems.some(recipeItem => {
            const matchingItems = items.filter(item => item.id === recipeItem.id);
            if (
                !matchingItems.length
                || parseInt(matchingItems[0].qty, 10) < recipeItem.quntity
            ) {
                isDisabled = true;
                return true;
            }
            return false;
        })
        return isDisabled;
    }
    return <div className="new-order">
        <label>Select a recipe to create an order for:</label>
        {recipes.map(recipe => 
            <button
                onClick={() => createOrder(recipe.id)}
                key={`recipe-create-${recipe.id}`}
                disabled={isDisabled(recipe.items)}
            >
                {recipe.name}
            </button>
        )}
    </div>;
}

export default NewOrderForm;