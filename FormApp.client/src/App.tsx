import { useEffect, useState } from 'react';
import CreateOrderForm from './components/CreateOrderForm';
import Portal from './components/Portal';
import Modal from './components/Modal';
import OrderList from './components/OrderList';
import OrderInfo from './components/OrderInfo';

export type Order = {
    number: string,
    senderCity: string,
    senderAddress: string,
    recipientCity: string,
    recipientAddress: string,
    weight: number,
    date: string
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [order, setOrder] = useState<Order|null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/order')
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }
        const data = (await response.json()) as Order[];
        setOrders(data);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const open = () => {
    setCreateFormOpen(true);
    console.log(`is create form open ${isCreateFormOpen}`);
  }

  const closeModal = () => {
    setCreateFormOpen(false)
  }

  const handleSubmit = async (order: Order) => {
    setLoading(true);
    try {
      const response = await fetch('/api/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const createdOrder = await response.json();
      setOrders((prevOrders: Order[]) => [...prevOrders, createdOrder]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const closeOrder = () => {
    setOrder(null);
  }

  return (
    <main className='font-mono'>
      <header className=' bg-lime-200 flex flex-row justify-between px-10 py-4'>
            <p>My Orders</p>
            <button onClick={() => open()}>Make an order</button>
        </header>
      {loading ? <p>Loading...</p> :
        <div className={`flex justify-center items-start transition-all duration-400 ${order ? "gap-5" : "gap-0"}`}>
          <div className={`m-3 mx-auto transition-all duration-400`}>
            <OrderList orderList={orders} setOrder={setOrder}></OrderList>
          </div>
          <div className={`transition-all duration-400 overflow-auto ${order ? "w-md ml-auto" : "w-0"}`}>
            {order ? <OrderInfo order={order} close={closeOrder}></OrderInfo> : null}
          </div>
        </div>
      }

      <Portal>
        <Modal isOpen={isCreateFormOpen} close = {closeModal}>
          <CreateOrderForm close = {closeModal} submit={handleSubmit}></CreateOrderForm>
        </Modal>
      </Portal>
    </main>
  )
}

export default App
