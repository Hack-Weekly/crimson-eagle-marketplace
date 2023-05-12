import type { ReactNode } from "react"
import ProductProvider from "./ProductContext"
import SidebarProvider from "./SidebarContext"

type FCWithChildren = ({ children }: {
        children: ReactNode
    }) => JSX.Element
const combineComponents = (...components: FCWithChildren[]): FCWithChildren => {
    return components.reduce((Accumulated, Current) => {
        return ({ children }: { children: ReactNode}): JSX.Element => (
            <Accumulated>
                <Current>{ children }</Current>
            </Accumulated>
        )
    },
    ({ children }) => <>{ children }</>,
    )
}

const AppContextProvider = combineComponents(
    ProductProvider,
    SidebarProvider,
)

export default AppContextProvider