import { apiInstance } from "~/services/base"

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    // LOCALE
    const app = useNuxtApp()
    apiInstance.defaults.params = {}

    apiInstance.defaults.params['locale'] = app.$i18n.locale.value

    return
})
