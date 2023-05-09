import { useState, type FormEvent, MouseEvent } from "react"

const PaymentForm = ({ payment, onSave, onCancel }: {
    payment?: string,
    onSave: (payment: string) => void
    onCancel: () => void
}) => {

    const [temporaryPayment, setTemporaryPayment] = useState<string>(payment ?? '')

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSave(temporaryPayment)
    }

    const onClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const radio = event.currentTarget.firstChild as HTMLInputElement
        radio.checked = true
        setTemporaryPayment(radio.value)
    }

    return (
        <form className="w-full p-2 border border-zinc-500" onSubmit={ onSubmit }>
            <div className="w-full flex items-center group">
                <button className="mr-4 p-2 bg-zinc-500 rounded-t"
                    onClick={ onClick }>
                    <input className="peer hidden"
                        type="radio" name="payment" id="blood"
                        value="Blood" checked={ temporaryPayment == 'Blood' }
                        onChange={ e => setTemporaryPayment(e.target.value) } />
                    <div className="w-12 h-6 rounded bg-transparent peer-checked:bg-orange-500 group-hover:bg-orange-500/50"></div>
                </button>
                <label htmlFor="blood" className="px-4 self-center text-right">Blood</label>
            </div>
            <div className="w-full flex items-center group">
                <button className="mr-4 p-2 bg-zinc-500"
                    onClick={ onClick }>
                    <input className="peer hidden"
                        type="radio" name="payment" id="servitude"
                        value="Eternal Servitude" checked={ temporaryPayment == 'Eternal Servitude' }
                        onChange={ e => setTemporaryPayment(e.target.value) } />
                    <div className="w-12 h-6 rounded bg-transparent peer-checked:bg-orange-500 group-hover:bg-orange-500/50"></div>
                </button>
                <label htmlFor="servitude" className="px-4 self-center text-right">Eternal Servitude</label>
            </div>
            <div className="w-full flex items-center group">
                <button className="mr-4 p-2 bg-zinc-500 rounded-b"
                    onClick={ onClick }>
                    <input className="peer hidden"
                        type="radio" name="payment" id="child"
                        value="Your first child" checked={ temporaryPayment == 'Your first child' }
                        onChange={ e => setTemporaryPayment(e.target.value) } />
                    <div className="w-12 h-6 rounded bg-transparent peer-checked:bg-orange-500 group-hover:bg-orange-500/50"></div>
                </button>
                <label htmlFor="child" className="px-4 self-center text-right">Your first child</label>
            </div>
            <div className="flex justify-end my-4">
                <div className="w-3/4">
                    <button className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600"
                        type="submit">Save</button>
                    <button className="ml-4 underline text-orange-100 hover:text-orange-400" onClick={ onCancel }>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default PaymentForm