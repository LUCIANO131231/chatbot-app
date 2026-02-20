import { onMounted, ref } from "vue"

export function useTheme() {
    const isDark = ref(false)

    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
        localStorage.setItem('theme', dark ? 'dark' : 'light')
    }

    const toggleTheme = () => {
        isDark.value = !isDark.value
        applyTheme(isDark.value)
    }

    onMounted(() => {
        const saved = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-colo-scheme: dark)').matches
        isDark.value = saved ? saved === 'dark' : prefersDark
        applyTheme(isDark.value)
    })

    return { isDark, toggleTheme }
}