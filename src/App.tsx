import React, {useEffect, useState} from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Dashboard from './components/Dashboard';
import NewOrderModal from './components/NewOrderModal';

interface Item {
  name: String,
  qty: String,
  colors: Array<String>,
  id: Number,
};
interface Order {
  recipe: Number,
  pending?: boolean,
  cancelled?: boolean,
  id?: Number,
  cancel?: any
}
interface Recipe {
  id: Number,
  name: String,
  items: {
    id: Number,
    quntity: Number, //sic
  },
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
    delete order.cancel;
    delete order.id;
    delete order.pending;
    setOrders([...orders, {...order, cancelled: true }]);
  }

  const createOrder = (e: { target: { value: string; }; }) => {
    let newOrder: Order = {
      id: nextOrderId,
      recipe: parseInt(e.target.value, 10),
      pending: true,
    }
    newOrder.cancel = () => cancelOrder(nextOrderId, newOrder);
    setOrders([...orders, newOrder]);
    setNextOrderId(nextOrderId + 1);
    ordersPending[nextOrderId.toString()] = window.setTimeout(() => {
      saveOrder(formatOrderForApi({...newOrder}))
      .then(() => setOrders([
        ...orders,
        {
          recipe: newOrder.recipe,
          pending: newOrder.pending,
        }
      ]));
    }, 180000); // 3 minutes to cancel. Will not save if page is not still up at that point, so preferably, handle this on the backend.
  }

  useEffect(() => {
    async function getItems() {
      const items = await fetch('https://demo5544737.mockable.io/items')
        .then(r => r.json())
        .then(r => r.itens); //sic
      setItems(items);
    }
    getItems();
    async function getRecipes() {
      const recipes = await fetch('https://demo5544737.mockable.io/recipes')
        .then(r => r.json())
        .then(r => r.recipes);
      setRecipes(recipes);
    }
    getRecipes();
    async function getOrders() {
      const orders = await fetch('https://demo5544737.mockable.io/orders')
        .then(r => r.json())
        .then(r => r.orders);
      setOrders(orders);
    }
    getOrders();
    return () => {};
  }, [])
  return (
    <div className="App">
      <StatusBar orders={orders} />
      <Dashboard orders={orders} items={items} recipes={[...recipes]} />
      <NewOrderModal items={items} recipes={recipes} createOrder={createOrder} />
    </div>
  );
}

export default App;
