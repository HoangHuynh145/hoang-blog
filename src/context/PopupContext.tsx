import { createContext, useContext, useState } from 'react'
import { Children, PopupContext } from '../services/Interfaces'

const PopupContext = createContext<PopupContext | undefined>(undefined)

const usePopupContext = () => useContext(PopupContext)

const PopupProvider = ({ children }: Children) => {
    const [popupState, setPopupState] = useState({
        type: '',
        isOpen: false,
        id: '',
        name: '',
    })

    const values = { popupState, setPopupState }

    return (
        <PopupContext.Provider value={values}>
            {children}
        </PopupContext.Provider>
    )
}

export { PopupProvider, usePopupContext }
