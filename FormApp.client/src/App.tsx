import { useState } from 'react';
import CreateOrderForm from './components/CreateOrderForm';
import Portal from './components/Portal';
import Modal from './components/Modal';
import OrderList from './components/OrderList';

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

  return (
    <main className='font-mono'>
      <header className=' bg-lime-200 flex flex-row justify-between px-10 py-4'>
            <p>My Orders</p>
            <button onClick={() => open()}>Make an order</button>
        </header>
      {loading ? <p>Loading...</p> : <OrderList orderList={orders}></OrderList>}

      <Portal>
        <Modal isOpen={isCreateFormOpen} close = {closeModal}>
          <CreateOrderForm close = {closeModal} submit={handleSubmit}></CreateOrderForm>
        </Modal>
      </Portal>
    </main>
  )
}

export default App
