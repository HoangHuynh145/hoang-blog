import { createContext, useContext, useState } from "react"
import { Children, ThemeInterface } from "../services/Interfaces"

const ThemeContext = createContext<ThemeInterface | undefined>(undefined)

const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({ children }: Children) => {
    const [theme, setTheme] = useState(() => {
        if ('theme' in localStorage) {
            const savedTheme = localStorage.getItem('theme')
            return savedTheme ? savedTheme : 'light'
        } else {
            return 'light'
        }
    })

    const values = {
        theme, setTheme
    }

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, useThemeContext }
