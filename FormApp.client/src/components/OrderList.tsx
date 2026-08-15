import type { Order } from "../App";

type OrderListProps = {
    orderList: Order[]
    setOrder: (order: Order) => void
};

export default function OrderList({orderList, setOrder}: OrderListProps) {
  const headers = [
    "Number", "Sender City", "Sender Address", "Recipient City", 
    "Recipient Address", "Weight", "Date"
  ];

  return (
        <table className="shadow-lg">
            <thead>
                <tr className="bg-linear-to-r from-pink-50 to-lime-50 border-b border-lime-200">
                {headers.map((text) => (
                    <th key={text} className='px-5 py-2 text-left'>{text}</th>
                ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
                {orderList.map(order => 
                    <tr key={order.number} onClick={() => setOrder(order)} className="hover:bg-lime-100 hover:cursor-pointer">
                        <td className="px-5 py-2 text-sm">{order.number}</td>
                        <td className="px-5 py-2 text-sm">{order.senderCity}</td>
                        <td className="px-5 py-2 text-sm">{order.senderAddress}</td>
                        <td className="px-5 py-2 text-sm">{order.recipientCity}</td>
                        <td className="px-5 py-2 text-sm">{order.recipientAddress}</td>
                        <td className="px-5 py-2 text-sm">{order.weight}</td>
                        <td className="px-5 py-2 text-sm">{order.date}</td>
                    </tr>
                )}
            </tbody>
        </table>
  )
}
