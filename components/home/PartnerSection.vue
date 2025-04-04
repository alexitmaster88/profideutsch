<template>
	<div class="md:py-16 py-6 md:mx-14 partner-section" v-if="partners.length">
		<div class="text-slate-900 text-xl font-medium uppercase leading-[1.875rem] text-center">
			{{ $t("bizga_ishongan") }}
		</div>
		<div class="text-title text-center text-slate-900">
			{{ $t("partners") }}
		</div>

		<swiper
			v-if="partners.length"
			:centeredSlides="false"
			:spaceBetween="30"
			:loop="true"
			:autoplay="true"
			:pagination="{
				clickable: true,
				type: 'fraction',
			}"
			:direction="'horizontal'"
			:modules="modules"
			class="md:mt-14 mt-8"
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
					slidesPerView: 4,
				},
			}"
		>
			<swiper-slide v-for="p in partners" :key="p.id" class="mb-4 px-8 py-6 rounded-lg bg-stone-100">
				<LocLink :to="p.link || '#'">
					<nuxt-img :src="p.image?.url" provider="strapi" loading="lazy" :alt="p.label" class="mx-auto md:h-[6.875rem] h-[4.3831rem]" />
				</LocLink>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import PartnerService from "@/services/partner";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";
import { ref } from "vue";
import LocLink from "../shared/LocLink.vue";

const modules = [Autoplay];

const partners = ref<any[]>([]);
const loading = ref(false);

const getPartner = () => {
	loading.value = true;
	PartnerService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 10,
		populate: "*",
	})
		.then((res) => {
			partners.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

getPartner();
</script>

<style scoped>
.partner-section {
	--swiper-pagination-bottom: -5px;
}
</style>
