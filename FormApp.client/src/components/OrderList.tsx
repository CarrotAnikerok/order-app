import type { Order } from "../App";

type OrderListProps = {
    orderList: Order[]
};

export default function OrderList({orderList}: OrderListProps) {
  const headers = [
    "Number", "Sender City", "Sender Address", "Recipient City", 
    "Recipient Address", "Weight", "Date"
  ];

  return (
    <>
        <div className='flex justify-center items-center m-3'>
            <table className="shadow-lg">
                <thead>
                    <tr className="bg-linear-to-r from-pink-50 to-lime-50 border-b border-lime-200">
                    {headers.map((text) => (
                        <th key={text} className='px-6 py-3 text-left'>{text}</th>
                    ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-pink-100">
                    {orderList.map(order => 
                        <tr key={order.number}>
                            <td className="px-6 py-3 text-sm">{order.number}</td>
                            <td className="px-6 py-3 text-sm">{order.senderCity}</td>
                            <td className="px-6 py-3 text-sm">{order.senderAddress}</td>
                            <td className="px-6 py-3 text-sm">{order.recipientCity}</td>
                            <td className="px-6 py-3 text-sm">{order.recipientAddress}</td>
                            <td className="px-6 py-3 text-sm">{order.weight}</td>
                            <td className="px-6 py-3 text-sm">{order.date}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>
  )
}
