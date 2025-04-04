import AOS from "aos";

import "aos/dist/aos.css";


export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    nuxtApp.AOS = AOS.init({
        once: false,
    })
})