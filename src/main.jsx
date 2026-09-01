/**
 * main.jsx - Punto de entrada de la aplicación
 * 
 * Este archivo inicializa React y configura el proveedor de tema
 * que permite el sistema de light/dark mode en toda la aplicación.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'

/**
 * Estructura de la aplicación
 * ============================
 * 
 * createRoot(...)          ← Crea la raíz de React
 *   <StrictMode>           ← Modo estricto (validación de desarrollo)
 *     <ThemeProvider>      ← ✨ PROVEEDOR DE TEMA
 *       <App />            ← Componente principal
 *     </ThemeProvider>
 *   </StrictMode>
 * 
 * ThemeProvider es un "Context Provider" que envuelve toda la app.
 * Esto significa que CUALQUIER componente dentro puede usar useTheme()
 * para acceder a isDark y toggleTheme().
 * 
 * Sin ThemeProvider, si intentas usar useTheme() en un componente,
 * obtendrás un error: "useTheme debe ser usado dentro de ThemeProvider"
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
