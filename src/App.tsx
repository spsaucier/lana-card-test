import React, {useEffect, useState} from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Dashboard from './components/Dashboard';
import NewOrderForm from './components/NewOrderForm';

interface Item {
  name: string,
  qty: string,
  colors: Array<string>,
  id: number,
};
interface Order {
  recipe: number,
  pending?: boolean,
  cancelled?: boolean,
  id?: number,
  cancel?: any
}
interface Recipe {
  id: number,
  name: string,
  items: {
    id: number,
    quntity: number, //sic
  }[],
}

async function saveOrder(order: Order) {
  const items = await fetch('https://demo5544737.mockable.io/orders', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(r => r.json());
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [nextOrderId, setNextOrderId] = useState<number>(1000000);
  const ordersPending:any = [];

  const formatOrderForApi = (order: Order) => {
    delete order.id;
    delete order.cancel;
    return order;
  }

  const cancelOrder = (id: Number, order: Order) => {
    window.clearTimeout(ordersPending[id.toString()]);
    setOrders(orders => orders.map(currentOrder => {
      if (currentOrder.id === order.id) {
        return {
          recipe: order.recipe,
          pending: order.pending,
          cancelled: true,
        };
      }
      return currentOrder;
    }));

    setItems(newItems => {
      const matchingRecipes = recipes.filter(recipe => recipe.id === order.recipe);
      matchingRecipes[0].items.forEach((recipeItem: { id: number; quntity: number; }) => {
        const itemIndex = newItems.findIndex(item => item.id === recipeItem.id);
        newItems[itemIndex].qty = (parseInt(newItems[itemIndex].qty) + recipeItem.quntity).toString();
      });
      return newItems;
    });
  }

  const createOrder = (recipeIdString: string) => {
    const recipeId = parseInt(recipeIdString);
    let newOrder: Order = {
      id: nextOrderId,
      recipe: recipeId,
      pending: true,
    }
    newOrder.cancel = () => cancelOrder(nextOrderId, newOrder);
    setOrders([...orders, newOrder]);
    setNextOrderId(nextOrderId => nextOrderId + 1);

    // Remove used items
    const matchingRecipes = recipes.filter(recipe => recipe.id === recipeId);
    const remainingItems = items;
    matchingRecipes[0].items.forEach((recipeItem: { id: number; quntity: number; }) => {
      const itemIndex = remainingItems.findIndex(item => item.id === recipeItem.id);
      remainingItems[itemIndex].qty = (parseInt(remainingItems[itemIndex].qty) - recipeItem.quntity).toString();
    });
    setItems(remainingItems);

    ordersPending[nextOrderId.toString()] = window.setTimeout(() => {
      saveOrder(formatOrderForApi({...newOrder}))
      .then(() => setOrders(orders => orders.map(order => {
        if (order.id === newOrder.id) {
          return {
            recipe: newOrder.recipe,
            pending: newOrder.pending,
          }
        }
        return order;
      })));
    }, 180000); // 3 minutes to cancel. Will not save if page is not still up at that point, so preferably, handle this on the backend.
  }

  useEffect(() => {
    async function getItems() {
      const remoteItems = await fetch('https://demo5544737.mockable.io/items')
        .then(r => r.json())
        .then(r => r.itens); //sic
      setItems(remoteItems);
    }
    getItems();
    async function getRecipes() {
      const remoteRecipes = await fetch('https://demo5544737.mockable.io/recipes')
        .then(r => r.json())
        .then(r => r.recipes);
      setRecipes(remoteRecipes);
    }
    getRecipes();
    async function getOrders() {
      const remoteOrders = await fetch('https://demo5544737.mockable.io/orders')
        .then(r => r.json())
        .then(r => r.orders);
      setOrders(remoteOrders);
    }
    getOrders();
    return () => {};
  }, [])
  return (
    <div className="App">
      <StatusBar orders={orders} />
      <Dashboard orders={orders} items={items} recipes={[...recipes]} />
      <NewOrderForm items={items} recipes={recipes} createOrder={createOrder} />
    </div>
  );
}

export default App;
