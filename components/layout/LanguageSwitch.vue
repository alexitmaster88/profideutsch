<template>
	<client-only>
		<button
			type="button"
			data-dropdown-toggle="language-dropdown-menu"
			class="text-white sm:text-base text-sm font-semibold cursor-pointer hover:text-gray-300 duration-200 inline-flex whitespace-nowrap gap-3 items-center"
		>
			<img :src="globeImg" alt="" />
			<span>{{ activeLang.label }}</span>
		</button>
		<!-- Dropdown -->
		<div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="language-dropdown-menu">
			<ul class="py-2 font-medium" role="none">
				<nuxt-link
					v-for="lang in locales"
					:key="lang.code"
					:to="switchLocalePath(lang.code)"
					:class="{ 'bg-primary-100 text-primary': locale == lang.code }"
					class="block px-4 py-2 text-sm text-gray-700 duration-200 hover:bg-gray-100 cursor-pointer"
					role="menuitem"
				>
					<div class="inline-flex items-center">{{ lang.label }}</div>
				</nuxt-link>
			</ul>
		</div>
	</client-only>
</template>

<script setup lang="ts">
import { computed } from "vue";
import globeImg from "@/assets/icons/globe.svg";
import { apiInstanceMy } from "@/services/base";

const switchLocalePath = useSwitchLocalePath();
// Get active locale and supported locales
const { locale, locales } = useI18n();

// @ts-ignore
const activeLang = computed(() => locales.value.find((e) => e.code == locale.value) || locales.value[0]);

watch(
	() => locale.value,
	() => {
		setTimeout(() => {
			location.reload();
		}, 200);
	},
);

watch(
	() => locale.value,
	(newV) => {
		apiInstanceMy.defaults.params = {
			__lang: newV == "uz" ? "uz-latn" : newV == "ru" ? "ru" : newV == "en" ? "en" : "uz-latn",
		};
	},
	{
		immediate: true,
	},
);
</script>
