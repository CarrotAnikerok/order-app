import type { Order } from "../App";
import Loader from "./Loader";

type OrderListProps = {
    orderList: Order[]
    setOrder: (order: Order) => void
    isLoading: boolean;
};

export default function OrderList({orderList, setOrder, isLoading}: OrderListProps) {
  const headers = [
    "Number", "Sender City", "Sender Address", "Recipient City", 
    "Recipient Address", "Weight (kg)", "Date"
  ];

  return (
        <table className="shadow-lg">
            <thead>
                <tr className="bg-linear-to-r from-pink-50 to-lime-50 border-b border-lime-200">
                {headers.map((text) => (
                    <th key={text} className='px-4 py-2 text-left'>{text}</th>
                ))}
                </tr>
            </thead>
            {isLoading ? 
            <tbody>
                <tr>
                    <td colSpan={headers.length} className="py-10 text-center">
                        <div className="flex justify-center items-center w-full">
                            <Loader />
                        </div>
                    </td>
                </tr>
            </tbody> :
            <tbody className="divide-y divide-pink-100">
                {orderList.map(order => 
                    <tr key={order.number} onClick={() => setOrder(order)} className="hover:bg-lime-100 hover:cursor-pointer">
                        <td className="px-4 py-2 text-sm">{order.number}</td>
                        <td className="px-4 py-2 text-sm">{order.senderCity}</td>
                        <td className="px-4 py-2 text-sm">{order.senderAddress}</td>
                        <td className="px-4 py-2 text-sm">{order.recipientCity}</td>
                        <td className="px-4 py-2 text-sm">{order.recipientAddress}</td>
                        <td className="px-4 py-2 text-sm">{order.weight}</td>
                        <td className="px-4 py-2 text-sm">{order.date.slice(0, 10)}</td>
                    </tr>
                )}
            </tbody>}
        </table>
  )
}
