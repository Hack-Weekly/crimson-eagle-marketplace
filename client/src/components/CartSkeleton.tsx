const Row = () => (
    <div className="w-full px-4 py-2 flex space-x-8 items-center border-b border-zinc-500">
        <div className="h-16 w-16 bg-zinc-500"></div>
        <div className="h-8 grow bg-zinc-500"></div>
        <div className="h-8 w-8 bg-zinc-500"></div>
        <div className="h-8 w-12 bg-zinc-500"></div>
    </div>
)

const CartSkeleton = () => (
    <div className="animate-pulse flex flex-col space-y-4 my-6" aria-hidden="true">
        <div className="h-10 w-full bg-zinc-500"></div>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <div className="h-10 w-full flex space-x-8 justify-end items-center">
            <div className="h-10 w-16 bg-zinc-500"></div>
            <div className="h-10 w-32 bg-zinc-500"></div>
        </div>
    </div>
)

export default CartSkeleton