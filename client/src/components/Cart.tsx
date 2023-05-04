import { FormEvent, useEffect, useState } from "react"

type CartProductType = {
    id: number,
    title: string,
    price: number,
    quantity: number,
    total: number,
    discountPercentage: number,
    discountedPrice: number,
}
type CartProductWithImageType = CartProductType & {
    image: string,
}
type CartWithImageType = {
    id: number,
    products: CartProductWithImageType[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number,
}

const Cart = ({ size = 'full' }: { size?: string }) => {

    const [cart, setCart] = useState<CartWithImageType | null>(null)
    const [beingModified, setModified] = useState<number | null>(null)
    const [quantity, setQuantity] = useState<number>(0)

    const fetchCart = () => {
        fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
            .then(async data => {
                // we should add the thumbnail on the backend instead of this
                const products: CartProductWithImageType[] = await Promise.all(data.products.map(async (p: CartProductType) => {
                    const result = await fetch('https://dummyjson.com/products/' + p.id)
                    const prod = await result.json()
                    return {
                        ...p,
                        image: prod.thumbnail,
                    }
                }))
                setCart({
                    ...data,
                    products: products,
                })
            })
            .catch(console.log)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const onDelete = (id: number) => {
        // `https://[api]/cart/${ 'email' }/${ id }`
        fetch('https://dummyjson.com/carts/1', { method: 'DELETE' })
            .then(() => {
                // fetchCart() ?
                cart && setCart({
                    ...cart,
                    products: cart.products.filter(p => p.id != id),
                })
            })
            .catch(console.log)
    }

    const onQuantityChange = (id: number, quantity: number) => {
        setQuantity(quantity)
        setModified(id)
    }

    const onQuantitySubmit = (event: FormEvent, id: number) => {
        event.preventDefault()
        if (quantity < 1) {
            onDelete(id)
            setModified(null)
        } else {
            // `https://[api]/cart/${ 'email' }/${ id }/${ quantity}`
            fetch('https://dummyjson.com/carts/1', { method: 'PUT' })
            .then(() => {
                // fetchCart() ?
                cart && setCart({
                    ...cart,
                    products: cart.products.map(p => (p.id == id) ? {...p, quantity } : p),
                })
                setModified(null)
            })
            .catch(console.log)
        }
    }

    return (
        <table className={ `table ${ size == 'full' ? ' full' : ''}` }>
            <thead>
                <tr>
                    <th colSpan={ 2 }>Product</th>
                    { size == 'full' &&
                        <th className="text-right">Price</th>
                    }
                    <th className="text-right">{ size == 'full' ? 'Quantity' : 'Qty.' }</th>
                    <th className="text-right">Sum</th>
                    <th>{ size == 'full' ? 'Remove' : '' }</th>
                </tr>
            </thead>
            <tbody>
                { cart && cart.products.map(product => (
                    <tr key={ product.id } className="border-t border-zinc-500">
                        <td>
                            <figure className="w-12 h-12 overflow-hidden">
                                <img className="object-cover" src={ product.image } alt="" />
                            </figure>
                        </td>
                        <td>{ product.title }</td>
                        { size == 'full' &&
                            <td className="text-right">{ product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</td>
                        }
                        <td className="text-right">
                            { beingModified == product.id ?
                                <form className="flex" onSubmit={ (e) => onQuantitySubmit(e, product.id) }>
                                    <input type="hidden" name="id" value={ product.id } />
                                    <input className="w-16 px-2 py-1 bg-zinc-500 text-zinc-50 border border-zinc-800"
                                        type="number" name="quantity" min="0" max="10"
                                        value={ quantity } onChange={ (e) => setQuantity(e.currentTarget.valueAsNumber) } />
                                    <button className="ml-2 p-1 rounded hover:bg-zinc-500" type="submit">
                                        <svg className="w-6 h-6 fill-none stroke-green-500"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            <title>Set quantity</title>
                                        </svg>
                                    </button>
                                </form>
                                : <button className="px-3 py-2 rounded hover:bg-zinc-500" onClick={ () => onQuantityChange(product.id, product.quantity) }>
                                    { product.quantity }
                                </button>
                            }                            
                        </td>
                        <td className="text-right">
                            { size == 'full' && product.discountedPrice != product.total 
                                ? <span className="mr-2 text-zinc-300 line-through text-xs lg:text-sm">{ product.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</span> 
                                : '' }
                            { product.discountedPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
                        </td>
                        <td className="text-right">
                            <button className="p-2 rounded-md bg-red-500" onClick={ () => { onDelete(product.id) }}>
                                <svg className="w-6 h-6 fill-none stroke-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                )) }
            </tbody>
            <tfoot className="text-right text-xl font-medium">
                <tr>
                    <td colSpan={ size == 'full' ? 3 : 2 }></td>
                    <td>Total:</td>
                    <td colSpan={ 2 }>
                        { cart && cart.total != cart.discountedTotal 
                            ? <span className="mr-2 text-zinc-300 line-through text-base lg:text-lg">{ cart.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</span> 
                            : '' }
                        { cart && cart.discountedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Cart