import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cart from "../components/Cart"
import CheckoutForm, { userAddressType } from "../components/CheckoutForm"
import PaymentForm from "../components/PaymentForm"
import useCartState, { type UseCartStateType } from "../contexts/cartState"

const Address = ({ address }: { address: userAddressType }) => (
    <p className="w-1/2 p-2 border border-zinc-500 truncate">
        <label className="inline-block w-28 mr-4 text-right">Name:</label> <span className="font-light">John Doe</span><br />
        <label className="inline-block w-28 mr-4 text-right">Address:</label> <span className="font-light">{ address.addressStr }</span><br />
        <label className="inline-block w-28 mr-4 text-right">City:</label> <span className="font-light">{ address.city }</span><br />
        <label className="inline-block w-28 mr-4 text-right">Postal Code:</label> <span className="font-light">{ address.postalCode }</span><br />
        <label className="inline-block w-28 mr-4 text-right">State:</label> <span className="font-light">{ address.state }</span><br />
        <label className="inline-block w-28 mr-4 text-right">Country:</label> <span className="font-light">{ address.country }</span><br />                                
    </p>
)

const CheckoutPage = () => {

    const { state: { cart } } = useCartState() as UseCartStateType

    const [address, setAddress] = useState<userAddressType | null>(null)
    const [isEditingAddress, setIsEditingAddress] = useState(false)
    const [payment, setPayment] = useState<string | null>(null)
    const [isEditingPayment, setIsEditingPayment] = useState(false)

    const onEditAddress = () => {
        setIsEditingAddress(true)
    }
    const onCancelEdit = () => {
        setIsEditingAddress(false)
    }

    const onSaveAddress = (newAddress: userAddressType) => {
        fetch('https://dummyjson.com/users/1', {
            method: 'PUT',
            body: JSON.stringify({
                address: newAddress,
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAddress(newAddress)
            setIsEditingAddress(false)
        })
        .catch(console.log)
    }

    const onEditPayment = () => {
        setIsEditingPayment(true)
    }
    const onCancelPayment = () => {
        setIsEditingPayment(false)
    }

    const onSavePayment = (newPayment: string) => {        
        setPayment(newPayment)
        setIsEditingPayment(false)
    }

    const navigate = useNavigate()

    const onPlacingOrder = () => {
        // `https://[api]/order/${ email }`
        fetch('https://dummyjson.com/users/1', {
            method: 'POST',
            body: JSON.stringify({
                cartId: cart?.id,
                address: address,
                payment: payment,
            })
        })
        .then(res => res.json())
        .then(data => {
            navigate(`/thankyou/${ data }`) // orderId
        })
        .catch(console.log)
    }

    return (
        <main className="py-16 px-6 font-primary">
            <h1 className="my-6 text-2xl font-medium">Checkout</h1>
            <div className="lg:-mx-4 flex lg:flex-row-reverse flex-wrap">
                <section className="w-full lg:w-1/2 lg:px-4">
                    <h2 className="my-4 text-lg font-medium">In Your Cart</h2>
                    <Cart size="checkout" />
                </section>
                <section className="w-full lg:w-1/2 lg:px-4">
                    <h2 className="my-4 text-lg font-medium">Billing Address</h2>
                    { isEditingAddress ?
                        <CheckoutForm address={ address ?? undefined } onSave={ onSaveAddress } onCancel={ onCancelEdit } />
                    : address ? 
                        <div className="flex items-center">
                            <Address address={ address } />
                            <div className="w-1/2 p-2">
                                <button className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600" onClick={ onEditAddress }>Edit Address</button>
                            </div>
                        </div>
                        :
                        <button className="my-2 px-6 py-3 rounded bg-orange-500 hover:bg-orange-600" onClick={ onEditAddress }>Add Address</button>
                    }
                    <h2 className="my-4 text-lg font-medium">Payment</h2>
                    { isEditingPayment ?
                        <PaymentForm payment={ payment ?? undefined } onSave={ onSavePayment } onCancel={ onCancelPayment } />
                    : payment ? 
                        <div className="flex items-center">
                            <p className="w-1/2 p-2 border border-zinc-500">{ payment }</p>
                            <div className="w-1/2 p-2">
                                <button className="px-6 py-3 rounded bg-orange-500 hover:bg-orange-600" onClick={ onEditPayment }>Edit Payment</button>
                            </div>
                        </div>
                        :
                        <button className="my-2 px-6 py-3 rounded bg-orange-500 hover:bg-orange-600" onClick={ onEditPayment }>Add Payment</button>
                    }
                    <h2 className="my-4 pt-4 border-t-2 border-zinc-400 text-lg font-medium">Place Order</h2>
                    { (address == null || payment == null || isEditingAddress || isEditingPayment) &&
                        <p>Please finish setting up Billing and Payment.</p>
                    }
                    <button className="my-2 px-6 py-3 rounded bg-orange-500 hover:bg-orange-600
                        disabled:bg-orange-500/50"
                        disabled={ (address == null || payment == null || isEditingAddress || isEditingPayment) ? true : false }
                        onClick={ onPlacingOrder }>Pay Now</button>
                </section>
            </div>
        </main>
    )
}

export default CheckoutPage