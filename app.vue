<script setup lang="ts">
import MainSkeleton from "@/components/shared/skeleton/MainSkeleton.vue";

const nuxtApp = useNuxtApp();
const { t } = useI18n();
const loading = useState("preloader", () => true);

const realScripts: any = [];

if (process.env.NODE_ENV == "production") {
	realScripts.push([
		//   <!-- Google tag (gtag.js) -->
		{
			src: "https://www.googletagmanager.com/gtag/js?id=G-6QZJTEBE7M",
			async: true,
		},
		{
			innerHTML:
				"window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-6QZJTEBE7M');",
		},
		// <!-- Yandex.Metrika counter -->
		{
			innerHTML:
				"(function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } } k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a) })(window, document, 'script', 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js', 'ym'); ym(96456767, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true, trackHash: true });",
		},
		{
			src: "//code-ya.jivosite.com/widget/LCNuTT52tQ",
			async: true,
		},
	]);
}

useServerHead({
	titleTemplate: (title?: string) =>
		title ? `${t("ssp_name") || "O'zbekiston Savdo-sanoat palatasi"} - ${title}` : t("ssp_name") || "O'zbekiston Savdo-sanoat palatasi",
	meta: [
		{ name: "title", content: t("ssp_name") },
		{ name: "description", content: t("ssp_name") },
		{ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
		{ name: "viewport", content: "width=device-width, initial-scale=1.0,maximum-scale = 6.0" },
		{ name: "keywords", content: "O&#x27;zbekiston Savdo-sanoat palatasi - Bosh sahifa, chamber, chamber.uz, ssp" },
		{ name: "yandex-verification", content: "5be3a3c0cc1728eb" },
	],
	bodyAttrs: {},
	link: [{ rel: "canonical", href: "https://old.chamber.uz/" }],
	script: [].concat(process.env.IS_REAL ? realScripts : []),
});

useServerSeoMeta({
	title: t("ssp_name"),
	description: t("ssp_name"),
	ogTitle: t("ssp_name"),
	ogDescription: t("ssp_name"),
	ogImage: "/favicon.png",
	twitterTitle: t("ssp_name"),
	twitterDescription: t("ssp_name"),
	twitterImage: "/favicon.png",
});

nuxtApp.hook("page:finish", () => {
	loading.value = false;
});
</script>

<template>
	<div class="h-screen">
		<MainSkeleton v-if="loading" class="fixed" style="z-index: 44444" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
