import { useState, type FormEvent } from "react"

import countryState from "../data/country_state.json"

export type userAddressType = {
    addressStr: string,
    city: string,
    postalCode: string,
    state?: string,
    country: string,
}
const CheckoutForm = ({ address, onSave, onCancel }: {
    address?: userAddressType,
    onSave: (address: userAddressType) => void
    onCancel: () => void
}) => {

    const [temporaryAddress, setTemporaryAddress] = useState<userAddressType>(address ?? {
        addressStr: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
    } as userAddressType)

    const onAddressChange = (key: string, value: string) => {
        setTemporaryAddress({
            ...temporaryAddress,
            [key]: value,
        })
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSave(temporaryAddress)
    }

    return (
        <form className="w-full p-2 border border-zinc-500" onSubmit={ onSubmit }>
            <div className="flex w-full my-4">
                <label htmlFor="addressStr" className="w-1/4 px-4 self-center text-right">Address</label>
                <input className="w-3/4 py-2 px-3 bg-zinc-500 text-zinc-50 border border-zinc-800"
                    onChange={ (e) => onAddressChange('addressStr', e.currentTarget.value) }
                    type="text"
                    name="addressStr"
                    value={ temporaryAddress.addressStr } required />
            </div>
            <div className="flex w-full my-4">
                <label htmlFor="city" className="w-1/4 px-4 self-center text-right">City</label>
                <input className="w-3/4 py-2 px-3 bg-zinc-500 text-zinc-50 border border-zinc-800"
                    onChange={ (e) => onAddressChange('city', e.currentTarget.value) }
                    type="text"
                    name="city"
                    value={ temporaryAddress.city } required />
            </div>
            <div className="flex w-full my-4">
                <label htmlFor="postalCode" className="w-1/4 px-4 self-center text-right">Postal Code</label>
                <input className="w-3/4 py-2 px-3 bg-zinc-500 text-zinc-50 border border-zinc-800"
                    onChange={ (e) => onAddressChange('postalCode', e.currentTarget.value) }
                    type="text"
                    name="postalCode"
                    value={ temporaryAddress.postalCode } required />
            </div>
            <div className="flex w-full my-4">
                <label htmlFor="state" className="w-1/4 px-4 self-center text-right">State</label>
                <select className="w-3/4 py-2 px-3 bg-zinc-500 text-zinc-50 border border-zinc-800"
                    onChange={ (e) => onAddressChange('state', e.currentTarget.value) }
                    value={ temporaryAddress.state }
                    name="state">
                    { countryState.find(country => country.name == temporaryAddress.country)?.stateProvinces?.map((state, i) => (
                        <option key={ i } value={ state.name }>{ state.name }</option>
                    ))}
                </select>
            </div>
            <div className="flex w-full my-4">
                <label htmlFor="country" className="w-1/4 px-4 self-center text-right">Country</label>
                <select className="w-3/4 py-2 px-3 bg-zinc-500 text-zinc-50 border border-zinc-800"
                    onChange={ (e) => onAddressChange('country', e.currentTarget.value) }
                    value={ temporaryAddress.country }
                    name="country">
                    { countryState.map(country => (
                        <option key={ country.countryCode } value={ country.name }>{ country.name }</option>
                    ))}
                </select>
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

export default CheckoutForm