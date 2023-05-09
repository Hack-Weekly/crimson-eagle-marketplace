import { Link } from "react-router-dom"
import Cart from "../components/Cart"

const CartPage = () => (
    <main className="py-16 px-6 font-primary">
        <h1 className="my-6 text-2xl font-medium">Your Cart</h1>
        <Cart />
        <div className="w-full py-6 mt-6 border-t-2 border-zinc-500 text-right">
            <Link className="mr-6 underline text-orange-100 hover:text-orange-400" to="/">Continue shopping</Link>
            <Link to="/checkout" className="inline-block px-6 py-3 rounded bg-orange-500 hover:bg-orange-600">Checkout</Link>
        </div>
    </main>
)

export default CartPage