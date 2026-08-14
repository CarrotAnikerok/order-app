import { useForm } from "react-hook-form";

type FormProps = {
    close: () => void;
};

export default function CreateOrderForm({ close }: FormProps) {
    const {register, handleSubmit} = useForm();

    async function submitForm() {
        close();
    }

  return (
    <div className="font-mono">
        <form className="flex flex-col gap-2 items-center justify-center" onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-row gap-3">
                <label>
                    Sender City
                    <input {...register('sender_city')}/>
                </label>

                <label>
                    Sender Address
                    <input {...register('sender_address')}/>
                </label>
            </div>
            <div className="flex flex-row gap-3">
                <label>
                    Recipient City
                    <input {...register('recipient_city')}/>
                </label>

                <label>
                    Recipient Address
                    <input {...register('recipient_address')}/>
                </label>
            </div>
            <div className="flex flex-row gap-3">
                <label>
                    Weight
                    <input type="number" {...register('weight')}/>
                </label>

                <label>
                    Date
                    <input type="date" {...register('date')}/>
                </label>
            </div>

            <button type="submit" className="p-2">
            Submit
            </button>
        </form>
    </div>
  )
}
