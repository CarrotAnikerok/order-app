import { useState } from 'react';
import './App.css'
import CreateOrderForm from './components/CreateOrderForm';
import Portal from './components/Portal';
import Modal from './components/Modal';

function App() {
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);

  const headers = [
    "Sender City", "Sender Address", "Recipient City", 
    "Recipient Address", "Weight", "Date"
  ];

  const open = () => {
    setCreateFormOpen(true);
    console.log(`is create form open ${isCreateFormOpen}`);
  }

  const closeModal = () => {
    setCreateFormOpen(false)
  }

  return (
    <main className='font-mono'>
      <header className=' bg-lime-200 flex flex-row justify-between px-10 py-4'>
        <p>My Orders</p>
        <button onClick={() => open()}>Make an order</button>
      </header>
        <div className='flex justify-center items-center m-3'>
          <div className='border-pink-400 border-4 rounded-xl p-4'>
          <table>
          <thead>
            <tr>
              {headers.map((text) => (
                <th key={text} className='px-6 py-3 text-left'>{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
        </div>
      </div>

      <Portal>
        <Modal isOpen={isCreateFormOpen} close = {closeModal}>
          <CreateOrderForm close = {closeModal}></CreateOrderForm>
        </Modal>
      </Portal>
    </main>
  )
}

export default App
