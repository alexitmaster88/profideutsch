<template>
	<section class="md:py-8 py-6" v-if="videos.length">
		<div class="container">
			<div class="flex justify-between">
				<div class="text-title text-slate-900">{{ $t("videogalereya") }}</div>

				<AllViewBtn :title="$t('all_videos')" :to="'/videos'" class="hover:bg-primary-900 hover:text-white transition duration-150" />
			</div>

			<div class="flex flex-wrap my-6" v-if="videoDef">
				<div class="md:w-1/2 w-full" v-motion-slide-visible-once-left>
					<iframe :src="videoDef.link" loading="lazy" class="w-full md:h-[22rem] h-[15rem] bg-slate-900 bg-opacity-75 rounded-2xl shadow"> </iframe>
				</div>
				<div class="md:w-1/2 md:flex hidden w-full p-6 flex-col max-w-[35rem]" v-motion-slide-visible-once-right>
					<div class="text-slate-900 text-3xl font-semibold leading-snug mb-4 mt-8">
						{{ videoDef.title }}
					</div>
					<div class="text-gray-600 text-base font-normal leading-snug">
						{{ videoDef.description }}
					</div>
				</div>
			</div>

			<ClientOnly>
				<swiper
					v-motion-slide-top
					v-if="videos.length"
					:centeredSlides="true"
					:spaceBetween="20"
					:autoplay="true"
					:direction="'horizontal'"
					:modules="modules"
					class="md:mt-14"
					:breakpoints="{
						320: {
							slidesPerView: 1,
						},
						576: {
							slidesPerView: 2,
						},
						768: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 3,
						},
					}"
				>
					<swiper-slide v-for="p in videos" :key="p.id" class="mb-4 bg-stone-100 rounded-2xl overflow-hidden shadow">
						<LocLink :to="'/videos/' + p.id">
							<iframe :src="p.link" frameborder="0" :title="p.link" allowfullscreen iframe-video loading="lazy" class="w-full h-[15rem] bg-slate-900 bg-opacity-75">
							</iframe>
						</LocLink>
					</swiper-slide>
				</swiper>
			</ClientOnly>
		</div>
	</section>
</template>

<script setup lang="ts">
import VideosService from "@/services/videos";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { ref, computed } from "vue";
import AllViewBtn from "../shared/btn/AllViewBtn.vue";
import LocLink from "../shared/LocLink.vue";

const modules = [Pagination, Autoplay];

const videos = ref<any[]>([]);
const loading = ref(false);
const videoDef = computed(() => videos.value[0]);

const getVideos = () => {
	loading.value = true;
	VideosService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 12,
		populate: "*",
	})
		.then((res) => {
			videos.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

getVideos();
</script>

<style scoped>
.partner-section {
	--swiper-pagination-bottom: -5px;
}
</style>
