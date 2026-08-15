import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [order, setOrder] = useState<Order|null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      number:'123456', senderCity: 'Moscow', senderAddress: 'st. Kolumkaeva 6', 
      recipientCity: 'Novosibirsk', recipientAddress: 'st. Karla Marksa',
      weight: 1000, date: '2025-07-12'
    },
    {
      number:'12s3K56', senderCity: 'Vladivostok', senderAddress: 'st. Kolumkaeva Mister White 6', 
      recipientCity: 'Novosibirsk', recipientAddress: 'st. Karla Marksa',
      weight: 300, date: '2026-06-13'
    }
  ])  

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
        return;
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
        <div className={`flex justify-center items-start transition-all duration-300 ${order ? "gap-5" : "gap-0"}`}>
          <div className={`my-3 mx-auto transition-all duration-300`}>
            <OrderList orderList={orders} setOrder={setOrder}></OrderList>
          </div>
          <div className={`transition-all duration-300 overflow-auto ${order ? "min-w-1/3 ml-auto" : "w-0"}`}>
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
