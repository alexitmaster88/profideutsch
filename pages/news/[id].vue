<template>
	<div v-if="News" class="container md:py-10 py-6 max-w-[62rem]">
		<div class="w-full rounded-3xl overflow-hidden">
			<img :src="API_URL + News.image?.url" alt="" class="max-h-96 w-full object-cover" />
		</div>

		<div class="text-title mt-3">
			{{ News.title }}
		</div>

		<client-only>
			<MarkdownCustom :source="News.content" html linkify />

			<!-- gallery -->
			<swiper
				v-if="News.gallery?.length"
				:centeredSlides="false"
				:spaceBetween="30"
				:loop="true"
				:pagination="{
					clickable: true,
				}"
				:style="{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#007aff',
					'--swiper-navigation-size': '2rem',
				}"
				:direction="'horizontal'"
				:modules="modules"
				class="md:mt-14"
				:navigation="true"
				:slidesPerView="'auto'"
				:breakpoints="{
					320: {
						slidesPerView: 1,
					},
					576: {
						slidesPerView: 2,
					},
				}"
			>
				<swiper-slide v-for="(p, i) in News.gallery" :key="p.id" class="mb-8 bg-stone-100 rounded-2xl overflow-hidden">
					<img
						:initIndex="i"
						:alt="p.label"
						:src="API_URL + p.url"
						class="mx-auto w-full md:h-[15rem] h-[12rem] object-cover cursor-pointer duration-200 hover:scale-105"
						@click="showImg(i)"
					/>
				</swiper-slide>
			</swiper>
		</client-only>

		<vue-easy-lightbox teleport="body" :visible="visibleRef" :imgs="imgs" :index="indexRef" @hide="onHide"></vue-easy-lightbox>

		<div class="text-gray-600 text-xs font-bold flex gap-3 items-center mt-5">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
					stroke="#BFC4CE"
					stroke-width="1.5"
					stroke-miterlimit="10"
				/>
				<path d="M10 5.625V10H14.375" stroke="#BFC4CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>

			<span class="text-gray-600 text-xl font-bold">{{ formatDate(News.publishDate) }}</span>

			<svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 17 11" fill="none">
				<path
					d="M8.38629 10.9668C5.29572 10.9668 2.36392 9.17757 0.130951 5.92864C-0.0436503 5.67393 -0.0436503 5.31754 0.130951 5.06194C2.36512 1.81533 5.29691 0.0273438 8.38629 0.0273438C11.4769 0.0273438 14.4087 1.81661 16.6416 5.06554C16.817 5.32096 16.817 5.67772 16.6416 5.93314C14.4079 9.17917 11.4761 10.9668 8.38629 10.9668ZM8.38534 1.63744C8.30995 1.63744 8.2331 1.64016 8.15695 1.64554C6.39117 1.76614 4.97634 3.31381 4.86595 5.24554C4.7989 6.41798 5.2117 7.54446 5.9985 8.33614C6.65153 8.99487 7.50053 9.35764 8.38912 9.35764C8.46483 9.35764 8.54136 9.35492 8.61657 9.34954C10.378 9.22448 11.7924 7.67643 11.9066 5.74864C11.9737 4.57651 11.5609 3.4497 10.7741 2.65714C10.1214 1.99958 9.27302 1.63744 8.38534 1.63744ZM8.38649 7.57361C7.90688 7.57363 7.44893 7.37789 7.09696 7.02246C6.67471 6.59601 6.45425 5.991 6.4921 5.36254C6.55073 4.32377 7.31352 3.48919 8.26643 3.42124C8.30735 3.41841 8.34889 3.41697 8.38987 3.41697C8.86941 3.41697 9.32731 3.61268 9.67921 3.96805C10.1016 4.3946 10.3221 4.99997 10.2843 5.62894C10.2218 6.67089 9.45902 7.50508 8.50992 7.56934C8.46886 7.57217 8.42733 7.57361 8.38649 7.57361Z"
					fill="#BFC4CE"
				/>
			</svg>
			<span class="text-gray-600 text-xl font-bold">{{ News.viewCount }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { isValid, format } from "date-fns";
import { API_URL } from "@/services/base";

import NewsService from "@/services/news";
import { useRoute } from "vue-router";
import MarkdownCustom from "@/components/shared/MarkdownCustom.vue";
import VueEasyLightbox from "vue-easy-lightbox";
import "vue-easy-lightbox/external-css/vue-easy-lightbox.css";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";

const modules = [Autoplay, FreeMode, Navigation, Pagination];

const route = useRoute();
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { locale } = useI18n();
const { t } = useI18n();
const localePath = useLocalePath();
const visibleRef = ref(false);
const indexRef = ref(0);
const showImg = (index: number) => {
	indexRef.value = index;
	visibleRef.value = true;
};
const onHide = () => (visibleRef.value = false);

const { data: News } = await useAsyncData(
	"new" + route.params.id,
	async () => {
		const { data } = await NewsService.Get(+route.params.id, {
			params: {
				populate: "*",
			},
		});

		if (data.data?.locale == locale.value) {
			return data.data;
		} else if (Array.isArray(data.data?.localizations)) {
			const localizationItem = data.data?.localizations.find((e: any) => e.locale == locale.value);
			if (localizationItem) {
				await navigateTo(localePath("/news/" + localizationItem.id));
			} else {
				await navigateTo(localePath("/news"));
			}
			return {};
		}

		return {};
	},
	{
		watch: [route.params],
	},
);

const ogImage = News.value.image?.formats?.large ?? News.value.image;

useServerHead({
	title: News.value?.title,
	meta: [
		{
			name: "description",
			content: News.value?.title,
		},
	],
});

Meta.value = {
	title: "news",
	breadcrumbs: [
		{
			to: "/news",
			label: "news",
		},
	],
};

useServerSeoMeta({
	ogLocale: locale.value,
	ogType: "article",
	ogImageType: ogImage?.mime || "image/jpeg",
	ogUrl: route.fullPath,
	ogTitle: News.value?.title,
	ogDescription: News.value?.title,
	ogImageHeight: ogImage?.height,
	ogImageWidth: ogImage?.width,
	ogImage: API_URL + ogImage?.url,
	twitterTitle: News.value?.title,
	twitterDescription: News.value?.title,
	twitterImage: API_URL + News.value.image?.url,
	twitterCard: "summary_large_image",
});

const imgs = computed(() => News.value?.gallery?.map((e: any) => API_URL + e.url));

const updateViewCount = () => {
	NewsService.updateNewsViewCount(+route.params.id);
};

const formatDate = computed(() => {
	return (date: string, f = "dd.MM.yyyy") => (isValid(new Date(date)) ? format(new Date(date), f) : "");
});

try {
	updateViewCount();
} catch (e) {
	console.log(e);
}
</script>
