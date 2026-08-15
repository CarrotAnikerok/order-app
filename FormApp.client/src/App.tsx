import { useEffect, useRef, useState } from 'react';
import CreateOrderForm from './components/CreateOrderForm';
import Portal from './components/Portal';
import Modal from './components/Modal';
import OrderList from './components/OrderList';
import OrderInfo from './components/OrderInfo';
import Pagination from './components/Pagination';

export type Order = {
    number: string,
    senderCity: string,
    senderAddress: string,
    recipientCity: string,
    recipientAddress: string,
    weight: number,
    date: string
}

export type ButtonBlocker = {
  hasNext: boolean;
  hasPrevious: boolean;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [order, setOrder] = useState<Order|null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [buttonBlocker, setButtonBlocker] = useState<ButtonBlocker>({hasNext: false, hasPrevious: false});
  const [page, setPage] = useState(() => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('page');
  });

  const limit = useRef<number>(10);
  const currentPage = parseInt(page || '1', 10);

  useEffect(() => {
    fetch(`/api/order?pageSize=${limit.current}&pageNumber=${currentPage}`)
      .then(async response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }
        const data = (await response.json());
        setOrders(data.items);
        console.log(`hasNest is ${data.hasNextPage} and hasPrev ${data.hasPreviousPage}`)
        setButtonBlocker({hasNext: data.hasNextPage, hasPrevious: data.hasPreviousPage})
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [currentPage])

  const open = () => {
    setCreateFormOpen(true);
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
      setOrders((prevOrders: Order[]) => [...prevOrders, createdOrder.items]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams();
    newParams.set('page', String(newPage));
    const newRelativePathQuery = `/?${newParams.toString()}`;
    window.history.pushState({}, '', newRelativePathQuery);
    setPage(newParams.get('page'));
    setLoading(true);
  }

  return (
    <div className='font-mono flex flex-col min-h-screen'>
      <main className='grow'>
      <header className=' bg-lime-200 flex flex-row justify-between px-10 py-4'>
            <p>My Orders</p>
            <button onClick={() => open()}>Make an order</button>
        </header>
      {loading ? <p>Loading...</p> :
        <div className={`flex justify-center items-start transition-all duration-400 ${order ? "gap-5" : "gap-0"}`}>
          <div className={`m-3 mx-auto transition-all duration-400 flex flex-col items-center gap-2`}>
            <OrderList orderList={orders} setOrder={setOrder}></OrderList>
            <Pagination currentPage={Number(page)} changePage={changePage} buttonBlocker={buttonBlocker}></Pagination>
          </div>
          <div className={`transition-all duration-400 overflow-auto ${order ? "w-md ml-auto" : "w-0"}`}>
            {order ? <OrderInfo order={order} close={() => setOrder(null)}></OrderInfo> : null}
          </div>
        </div>
      }

      <Portal>
        <Modal isOpen={isCreateFormOpen} close = {closeModal}>
          <CreateOrderForm close = {closeModal} submit={handleSubmit}></CreateOrderForm>
        </Modal>
      </Portal>
    </main>

    <footer className='bg-lime-100'>
      <div className='flex'>
        <p className='flex-1 p-3 text-sm'>A little fullstack order app with usage of .NET 10, React and SQLite</p>
        <p className='flex-1 text-right p-3'>© 2026 Anikerok</p>
      </div>
    </footer>
    </div>
  )
}

export default App
