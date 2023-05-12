import { proxy, useSnapshot } from "valtio"

type User = {
	id: string,
    userName: string,
    email: string,
    fullName: string,
    addresses: string[],
}

const fetchUser = async (): Promise<User | null> => {
    const userJSON = localStorage.getItem('crimson-eagle-marketplace-user')

    if (userJSON) {
        const { email } = JSON.parse(userJSON)
        if (email) {
        // `https://[api]/user/${ email }`
        return fetch(`https://dummyjson.com/users/1`)
            .then(res => res.json())
        }
    }

    return Promise.resolve(null)
}

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

const fetchCart = async (user: User | null): Promise<CartWithImageType | null> => {
    // `https://[api]/cart/${ user.email }`
    return fetch('https://dummyjson.com/carts/1')
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
            return {
                ...data,
                products: products,
            }
        })
}

export type CartState = {
    user: User | null,
    cart: CartWithImageType | null,
    isLoading: boolean,
    hasError: boolean,
}

const cartState = proxy<CartState>({
    user: null,
    cart: null,
    isLoading: true,
    hasError: false,
})

fetchUser()
    .then(res => cartState.user = res)
    .then(async () => {
        if (!cartState.user) { // if (cartState.user) { when auth is working
            fetchCart(cartState.user)
                .then(res => cartState.cart = res)
        }
    })
    .then(() => {
        cartState.isLoading = false
    })
    .catch((err) => {
        console.log(err)
        cartState.hasError = true
    })

const login = async (email: string, password: string) => {
    cartState.isLoading = true
    
    return fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then(res => res.json())
        .then(data => {
            cartState.user = data
            cartState.isLoading = false
            
            localStorage.setItem('crimson-eagle-marketplace-user', JSON.stringify({ email: data.email }))
            return data
        })
        .catch(err => {
            cartState.isLoading = false
            cartState.hasError = true
            console.log(err)
        })
}

const updateCart = async (id: number, quantity: number) => {
    // cartState.isLoading = true when the api is live

    // `https://[api]/cart/${ 'email' }/${ id }/${ quantity}`
    return fetch('https://dummyjson.com/carts/1', { method: 'PUT' })
        .then(() => {
            // fetchCart() when the api is live
            let total = 0
            let discountedTotal = 0
            cartState.cart = cartState.cart ? {
                ...cartState.cart,
                products: cartState.cart.products.map(p => {
                    const t = (p.id != id) ? p.total : p.price * quantity
                    const dt = (p.id != id) ? p.discountedPrice : Math.round(p.price * (1 - p.discountPercentage / 100)) * quantity
                    total += t
                    discountedTotal += dt
                    return (p.id == id) ? {
                        ...p,
                        total: t,
                        discountedPrice: dt,
                        quantity,
                    } : p
                }),
                total,
                discountedTotal,
            } : null    
            cartState.isLoading = false
        })
        .catch(err => {
            cartState.isLoading = false
            cartState.hasError = true
            console.log(err)
        })
}

const deleteFromCart = async (id: number) => {
    // cartState.isLoading = true when the api is live
    
    // `https://[api]/cart/${ 'email' }/${ id }`
    return fetch('https://dummyjson.com/carts/1', { method: 'DELETE' })
        .then(() => {
            // fetchCart() when the api is live
            let total = 0
            let discountedTotal = 0
            cartState.cart = cartState.cart ? {
                ...cartState.cart,
                products: cartState.cart.products.filter(p => {
                    total += p.id == id ? 0 : p.total
                    discountedTotal += p.id == id ? 0 : p.discountedPrice
                    return p.id != id
                }),
                total,
                discountedTotal,
            } : null
            cartState.isLoading = false
        })
        .catch(err => {
            cartState.isLoading = false
            cartState.hasError = true
            console.log(err)
        })
}

export type UseCartStateType = {
    state: CartState,
    updateCart: (id: number, quantity: number) => Promise<void>,
    deleteFromCart: (id: number) => Promise<void>,
    login: (email: string, password: string) => Promise<void>,
}
const useCartState = () => {
    return {
        state: useSnapshot(cartState),
        updateCart,
        deleteFromCart,
        login,
    }
}

export default useCartState