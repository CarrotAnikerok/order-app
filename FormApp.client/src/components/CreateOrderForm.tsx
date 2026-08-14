import { useForm } from "react-hook-form";
import type { Order } from "../App";

type FormProps = {
    close: () => void;
    submit: (order: Order) => void;
};

export default function CreateOrderForm({ close, submit }: FormProps) {
    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<Order>({mode: 'onChange',});

    const submitForm = (data: Order) => {
        console.log(data);
        submit(data);
        close();
    }

  return (
    <div className="font-mono">
        <form className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-xl mx-auto items-start" onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col">
                <label>
                    Sender City*
                    <input {...register('senderCity', { required: true })} />
                </label>
                <div className="min-h-5">
                    {errors.senderCity && <p className="text-xs text-pink-500 text-center">Sender City is required</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <label>
                    Sender Address*
                    <input {...register('senderAddress', { required: true })} />
                </label>
                <div className="min-h-5">
                    {errors.senderAddress && <p className="text-xs text-pink-500 text-center">Sender Address is required</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <label>
                    Recipient City*
                    <input {...register('recipientCity', { required: true })} />
                </label>
                <div className="min-h-5">
                {errors.recipientCity && <p className="text-xs text-pink-500 text-center">Recipient City is required</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <label>
                    Recipient Address*
                    <input {...register('recipientAddress', { required: true })} />
                </label>
                <div className="min-h-5">
                    {errors.recipientAddress && <p className="text-xs text-pink-500 text-center">Recipient Address is required</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <label>
                    Weight*
                    <input type="number" {...register('weight', { required: true })} />
                </label>
                <div className="min-h-5">
                    {errors.weight && <p className="text-xs text-pink-500 text-center">Weight is required</p>}
                </div>
            </div>

            <div className="flex flex-col">
                <label>
                    Date*
                <input type="date" {...register('date', { required: true })} />
                </label>
                <div className="min-h-5">
                    {errors.date && <p className="text-xs text-pink-500 text-center">Date is required</p>}
                </div>
            </div>

            <button 
                type="submit"  
                disabled={!isValid || isSubmitting} 
                className="col-span-2 p-2 mt-4"
            >
                Submit
            </button>
        </form>
    </div>
  )
}
