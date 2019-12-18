import React, {useState} from 'react'

const Dashboard = ({orders, items, recipes}) => {
    const [colorFilter, setColorFilter] = useState('');
    const changeColorFilter = e => setColorFilter(e.target.value.toLowerCase());
    const recipeName = orderRecipe => {
        const filteredRecipes = recipes.filter(recipe => recipe.id === orderRecipe);
        if (filteredRecipes.length) {
            return filteredRecipes[0].name;
        }
        return '';
    };
    return (
        <div className="dashboard">
            <div className="dashboard__orders">
                <h3>Current Orders</h3>
                <div className="order legend"><div>#</div><div>Recipe included</div><div>Actions</div></div>
                { orders.map((order, i) => (
                    <div className="order" key={`order-${order.id || i}`}>
                        <div className={`order-number ${order.cancelled ? 'cancelled' : ''}`}>{order.id || i}</div>
                        <div className="order-recipe">{recipeName(order.recipe)}</div>
                        { order.id && <div className="order-actions"><button onClick={order.cancel}>&times;</button></div> }
                    </div>
                ))}
            </div>
            <div className="dashboard__items">
                <input className="item-color-filter" onChange={changeColorFilter} placeholder="Filter color"/>
                <h3>Items in inventory</h3>
                <div className="item legend"><div>ID</div><div>Name</div><div>Qty</div><div>Colors</div></div>
                {
                    items
                    .filter(item => (
                        colorFilter ?
                            item.colors
                            && item.colors.filter(
                                color => color
                                    .toLowerCase()
                                    .indexOf(colorFilter) > -1
                            ).length
                            : true
                    ))
                    .map((item, i) => (
                        <div className="item" key={`item-${item.id}`}>
                            <div className="item-number">{item.id}</div>
                            <div className="item-name">{item.name}</div>
                            <div className="item-qty">{item.qty}</div>
                            {
                                item.colors
                                && <div className="item-colors">{item.colors.join(', ')}</div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Dashboard;
