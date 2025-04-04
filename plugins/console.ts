export default defineNuxtPlugin(() => {
    const originalConsoleWarn = console.warn

    console.warn = (...args) => {
        if (
            typeof args[0] === 'string' &&
            args[0].includes('[Vue Router warn]:')
        ) {
            return
        }

        originalConsoleWarn.apply(console, args)
    }
})