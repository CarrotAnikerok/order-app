import type { Order } from "../App";

type OrderInfoProps = {
    order: Order;
    close: () => void;
}


export default function OrderInfo({ order, close }: OrderInfoProps) {


  return (
    <div className='flex flex-col m-4 shadow-lg'>
        <div className='flex bg-linear-to-l from-pink-100 to-lime-100 p-3'>
            <h2 className="text-3xl">{order.number}</h2>
            <button className='ml-auto' onClick={close}>close</button>
        </div>
        <div className=' grid grid-cols-2 gap-y-2 p-5'>
            <b>Sender City:</b>
            <p>{order.senderCity}</p>
            <b>Sender Address</b>
            <p>{order.senderAddress}</p>
            <b>Recipient City:</b>
            <p>{order.recipientCity}</p>
            <b>Recipient Address:</b>
            <p>{order.recipientAddress}</p>
            <b>Weight:</b>
            <p>{order.weight}</p>
            <b>Date:</b>
            <p>{order.date}</p>
        </div>
    </div>
  )
}
