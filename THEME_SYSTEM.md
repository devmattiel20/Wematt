# 🌙☀️ Sistema de Light/Dark Mode - Documentación Completa

## 📋 Resumen Ejecutivo

Se implementó un sistema robusto de Light/Dark Mode usando **React Context** y **CSS Custom Properties (Variables CSS)**. El sistema es:

- ✅ **Persistente**: Guarda la preferencia del usuario en localStorage
- ✅ **Automático**: Cambia toda la UI instantáneamente
- ✅ **Flexible**: Fácil de agregar nuevos temas o colores
- ✅ **Accesible**: Con buen contraste en ambos modos

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                      main.jsx                           │
│  (Envuelve todo con ThemeProvider)                      │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│            ThemeContext.jsx (Contexto)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │ useState() ──────────► isDark (true/false)      │   │
│  │ localStorage ────────► Persistencia             │   │
│  │ useEffect() ─────────► Aplica data-theme       │   │
│  │ toggleTheme() ───────► Invierte isDark         │   │
│  └─────────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────────┘
                   │
      ┌────────────┼────────────┐
      ▼            ▼            ▼
  ┌────────┐  ┌────────┐  ┌────────┐
  │Header  │  │App     │  │Footer  │
  │(.jsx)  │  │(.jsx)  │  │(.jsx)  │
  └────┬───┘  └────┬───┘  └────┬───┘
       │ useTheme()   │ useTheme()   │ useTheme()
       ▼            ▼            ▼
  ┌─────────────────────────────────────────────────────┐
│              index.css (Variables CSS)                │
│  :root[data-theme="dark"]   ──────► --bg-primary    │
│  :root[data-theme="light"]  ──────► --bg-primary    │
│                                   (valores diferentes)│
└─────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────┐
│    CSS en Header.css, App.css, etc.          │
│  Usa var(--bg-primary), var(--text-primary)  │
│  Los valores cambian automáticamente         │
└──────────────────────────────────────────────┘
```

---

## 📁 Archivos Principales

### 1️⃣ **src/context/ThemeContext.jsx** - El Cerebro del Sistema

```javascript
// Crea un contexto (una "caja global")
const ThemeContext = createContext();

// ThemeProvider: Proporciona el contexto a todos los componentes
export function ThemeProvider({ children }) {
  // Estado: true = dark mode, false = light mode
  const [isDark, setIsDark] = useState(() => {
    // Recupera del localStorage cuando se monta el componente
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Efecto: Se ejecuta cuando isDark cambia
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // IMPORTANTE: Aplica el atributo data-theme al HTML
    // Esto es lo que hace que los estilos CSS cambien
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      // HTML se convierte en: <html data-theme="dark">
    } else {
      html.setAttribute('data-theme', 'light');
      // HTML se convierte en: <html data-theme="light">
    }
  }, [isDark]);

  // Función para cambiar de tema
  const toggleTheme = () => {
    setIsDark(!isDark);
    // Esto activa el useEffect arriba, que lo hace todo automáticamente
  };

  // Proporciona isDark y toggleTheme a todos los componentes hijos
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para usar el contexto en cualquier componente
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
}
```

**¿Cómo funciona?**
1. `useState()` guarda si estamos en dark o light mode
2. `useEffect()` se ejecuta cuando `isDark` cambia y:
   - Guarda en localStorage
   - Aplica `data-theme="dark"` o `data-theme="light"` al HTML
3. `toggleTheme()` invierte el estado
4. Cualquier componente puede usar `useTheme()` para acceder

---

### 2️⃣ **src/index.css** - Las Variables CSS

```css
/* DARK MODE - Se aplica cuando HTML tiene data-theme="dark" */
:root[data-theme="dark"] {
  /* Fondos */
  --bg-primary: linear-gradient(...);
  --bg-secondary: rgba(13, 71, 161, 0.95);
  --bg-tertiary: rgba(255, 255, 255, 0.1);
  
  /* Textos */
  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  
  /* Colores especiales */
  --accent-color: #64b5f6;
  --shadow-color: rgba(0, 0, 0, 0.2);
  /* ... más variables */
}

/* LIGHT MODE - Se aplica cuando HTML tiene data-theme="light" */
:root[data-theme="light"] {
  /* Fondos */
  --bg-primary: linear-gradient(...);
  --bg-secondary: linear-gradient(...);
  --bg-tertiary: rgba(33, 150, 243, 0.08);
  
  /* Textos - Más oscuros para contraste */
  --text-primary: #0d47a1;
  --text-secondary: #1565c0;
  
  /* Colores especiales */
  --accent-color: #2196f3;
  --shadow-color: rgba(13, 71, 161, 0.1);
  /* ... más variables */
}

/* Body usa estas variables */
body {
  background: var(--bg-primary);  /* Cambia según el tema */
  color: var(--text-primary);     /* Cambia según el tema */
  transition: background 0.3s ease, color 0.3s ease;
}
```

**¿Cómo funciona?**
1. Definimos dos conjuntos de variables CSS
2. Un conjunto se activa con `:root[data-theme="dark"]`
3. El otro se activa con `:root[data-theme="light"]`
4. Cuando `data-theme` cambia en el HTML, CSS automáticamente usa las nuevas variables
5. La `transition` hace que los cambios sean suaves

---

### 3️⃣ **src/Componentes/Header.jsx** - Usando el Sistema

```javascript
import { useTheme } from "../context/ThemeContext";

function Header() {
  // Obtenemos el estado y la función para cambiar de tema
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      {/* ... */}
      <button onClick={toggleTheme}>
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
```

**¿Cómo funciona?**
1. `useTheme()` devuelve `{ isDark, toggleTheme }`
2. Al hacer clic, llamamos `toggleTheme()`
3. Esto cambia `isDark` en el contexto
4. `useEffect` en ThemeContext se ejecuta
5. `data-theme` cambia en HTML
6. Todos los CSS reaccionan instantáneamente

---

### 4️⃣ **src/Componentes/Header.css** - Usando Variables CSS

```css
.navbar {
  background: var(--bg-secondary);    /* Usa variable */
  border: 1px solid var(--border-color);  /* Usa variable */
  box-shadow: 0 4px 30px var(--shadow-color);  /* Usa variable */
  transition: background 0.3s ease;  /* Anima cambios */
}

.theme-toggle {
  background: var(--bg-tertiary);
  border-color: var(--border-color-hover);
  color: var(--text-primary);
  /* Cuando data-theme cambia, todas estas variables se actualizan */
}

.theme-toggle:hover {
  box-shadow: 0 0 20px var(--accent-light);  /* También es variable */
}
```

**¿Cómo funciona?**
1. Usamos `var(--bg-secondary)` en lugar de un color hardcodeado
2. Cuando `data-theme` cambia, el valor de `--bg-secondary` cambia
3. El navegador automáticamente re-renderiza el elemento con el nuevo color
4. La `transition` anima el cambio suavemente

---

## 🎯 Flujo Completo: Qué Pasa Cuando Hace Clic en el Botón

```
1. Usuario hace clic en el botón "☀️" o "🌙"
   ↓
2. Se ejecuta onClick={toggleTheme}
   ↓
3. toggleTheme() invierte isDark (true → false o false → true)
   ↓
4. React detecta que isDark cambió
   ↓
5. useEffect en ThemeContext se ejecuta (porque isDark está en el array de dependencias)
   ↓
6. localStorage.setItem('theme', isDark ? 'dark' : 'light')
   - Se guarda la preferencia para la próxima vez que abra la app
   ↓
7. document.documentElement.setAttribute('data-theme', 'dark' o 'light')
   - Se cambia el atributo en <html>
   ↓
8. CSS reacciona al cambio de data-theme
   - :root[data-theme="dark"] o :root[data-theme="light"] cambia
   - Todas las variables --bg-primary, --text-primary, etc. se actualizan
   ↓
9. Todos los elementos que usan var(--bg-primary), var(--text-primary), etc. se redibujan
   - Con la transition, el cambio es suave (0.3s ease)
   ↓
10. Header cambia el emoji del botón:
    isDark ? "☀️" : "🌙"
   ↓
11. ¡LISTO! Toda la app cambió de tema instantáneamente
```

---

## 🎨 Variables CSS Disponibles

| Variable | Dark Mode | Light Mode | Uso |
|----------|-----------|-----------|-----|
| `--bg-primary` | Gradiente azul oscuro | Gradiente azul claro | Fondo principal |
| `--bg-secondary` | `rgba(13, 71, 161, 0.95)` | Gradiente | Navbar, Footer |
| `--bg-tertiary` | `rgba(255, 255, 255, 0.1)` | `rgba(33, 150, 243, 0.08)` | Cards internas |
| `--text-primary` | `#fff` | `#0d47a1` | Textos principales |
| `--text-secondary` | `rgba(255, 255, 255, 0.8)` | `#1565c0` | Textos secundarios |
| `--accent-color` | `#64b5f6` | `#2196f3` | Color destacado |
| `--shadow-color` | `rgba(0, 0, 0, 0.2)` | `rgba(13, 71, 161, 0.1)` | Sombras |

**Uso en CSS:**
```css
.mi-elemento {
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: 0 4px 20px var(--shadow-color);
}
```

---

## 🔄 Flujo de Persistencia

```
PRIMERA VEZ QUE ABRE LA APP:
├─ localStorage está vacío
├─ isDark = true (valor por defecto)
├─ data-theme = "dark"
└─ Se muestra en dark mode

USUARIO CAMBIA A LIGHT MODE:
├─ localStorage.setItem('theme', 'light')
└─ localStorage ahora tiene: { theme: 'light' }

CIERRA LA APP Y LA ABRE DE NUEVO:
├─ localStorage.getItem('theme') devuelve 'light'
├─ isDark = false
├─ data-theme = "light"
└─ Se muestra en light mode (recordó la preferencia)
```

---

## 💡 Ventajas de Este Sistema

| Ventaja | Descripción |
|---------|------------|
| **No invasivo** | No necesita cambiar componentes existentes |
| **Dinámico** | Cambia toda la app sin recargar |
| **Persistente** | Recuerda la preferencia del usuario |
| **Flexible** | Agregar nuevos temas es solo agregar más variables CSS |
| **Performant** | CSS variables son muy rápidas, sin JavaScript overhead |
| **Accesible** | Buen contraste en ambos modos |
| **Animado** | Transiciones suaves entre temas |

---

## 🚀 Cómo Agregar un Nuevo Color o Tema

### Opción 1: Agregar una nueva variable

En `src/index.css`:
```css
:root[data-theme="dark"] {
  --mi-nuevo-color: #ff5722;
}

:root[data-theme="light"] {
  --mi-nuevo-color: #ff9100;
}
```

Luego en cualquier CSS:
```css
.mi-elemento {
  background: var(--mi-nuevo-color);
}
```

### Opción 2: Agregar un nuevo tema completo

1. En `src/index.css`, agregar:
```css
:root[data-theme="alto-contraste"] {
  --bg-primary: #000;
  --text-primary: #fff;
  /* ... todas las variables */
}
```

2. En `src/context/ThemeContext.jsx`, cambiar a soportar 3 valores:
```javascript
const [theme, setTheme] = useState('dark'); // 'dark', 'light', o 'alto-contraste'
```

---

## 🐛 Solución de Problemas

### Problema: El color no cambia cuando cambio de tema
**Solución:** Asegúrate de usar `var(--variable)` en el CSS, no hardcodear colores.

```javascript
// ❌ INCORRECTO
.navbar {
  background: #0d47a1;  // Hardcodeado, no cambia
}

// ✅ CORRECTO
.navbar {
  background: var(--bg-secondary);  // Usa variable
}
```

### Problema: El tema no se guarda al cerrar la app
**Solución:** Verifica que `localStorage` no esté deshabilitado en el navegador.

```javascript
// En ThemeContext.jsx, esto guarda en localStorage:
localStorage.setItem('theme', isDark ? 'dark' : 'light');
```

### Problema: El cambio es abrupt, no hay animación
**Solución:** Agregar `transition` en los elementos:

```css
body {
  transition: background 0.3s ease, color 0.3s ease;
}
```

---

## 📝 Checklist para Nuevo CSS

Cuando hagas un archivo CSS nuevo, sigue estos pasos:

- [ ] ¿Necesita background? → Usa `var(--bg-primary/secondary/tertiary)`
- [ ] ¿Necesita texto? → Usa `var(--text-primary/secondary/tertiary)`
- [ ] ¿Necesita bordes? → Usa `var(--border-color)`
- [ ] ¿Necesita sombras? → Usa `var(--shadow-color)`
- [ ] ¿Necesita un color destacado? → Usa `var(--accent-color)`
- [ ] ¿Es un gradiente? → Usa `var(--gradient-primary/button)`
- [ ] ¿Tiene botones? → Usa `var(--gradient-button)` y `var(--gradient-button-hover)`
- [ ] ¿Puede tener hover? → Agregar `transition: all 0.3s ease`

---

## 🎓 Resumen para Recordar

```
ThemeContext.jsx:    Maneja el estado (isDark, toggleTheme)
                    Guarda en localStorage
                    Cambia data-theme en HTML

index.css:          Define las variables CSS para cada tema
                    --bg-primary, --text-primary, etc.

Otros CSS files:    Usan var(--bg-primary) en lugar de hardcodear colores

Header.jsx:         Usa useTheme() para acceder a isDark y toggleTheme
                    Muestra el botón que permite cambiar de tema

Cuando hace clic:   isDark se invierte
                    useEffect se ejecuta
                    data-theme cambia
                    Variables CSS se actualizan
                    ¡Toda la app cambia instantáneamente!
```

---

¡Eso es todo! 🎉 Ahora tienes un sistema de Light/Dark Mode profesional y flexible.
