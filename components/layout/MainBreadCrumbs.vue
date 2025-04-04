<template>
	<div class="md:h-[9rem] min-h-[6rem] max-h-[8rem] breadcrumb-wrapper flex flex-col justify-center md:bg-contain bg-cover relative z-10">
		<div class="container flex flex-col justify-center h-full z-10">
			<div class="text-white leading-normal md:text-[2.2rem] font-bold md:leading-[3rem] sm:text-xl line-clamp-2">
				<span v-if="title" v-html="$t(title)"></span>
			</div>

			<div class="flex gap-3 items-center line-clamp-1">
				<LocLink :to="'/'" v-if="!Meta?.hideHome" class="text-white hover:text-gray-300 duration-200 md:text-base text-sm">{{
					$t("main_page")
				}}</LocLink>

				<template v-for="bread in breadcrumbs">
					<svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
						<path
							d="M0.58582 3.375H8.75708L6.7015 1.193C6.47213 0.949498 6.47125 0.553779 6.69954 0.309123C6.92782 0.0644352 7.29883 0.0635292 7.5282 0.306998L10.5898 3.557C10.8186 3.8005 10.8199 4.19809 10.5904 4.4424L7.52825 7.693C7.29892 7.93644 6.9279 7.93559 6.69959 7.69087C6.47131 7.44622 6.47219 7.0505 6.70156 6.807L8.75708 4.625H0.58582C0.262207 4.625 -0.000116348 4.34519 -0.000116348 4C-0.000116348 3.65481 0.262207 3.375 0.58582 3.375Z"
							fill="white"
						/>
					</svg>
					<LocLink :to="bread.to" class="text-white hover:text-gray-300 duration-200 md:text-base text-sm line-clamp-2">
						<span v-html="$t(bread?.label + '')"></span>
					</LocLink>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";
import LocLink from "../shared/LocLink.vue";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);

const title = computed(() => Meta.value?.title);

const breadcrumbs: any = computed(() => Meta.value?.breadcrumbs || []);
</script>

<style scoped>
.breadcrumb-wrapper {
	background-image: linear-gradient(90deg, theme("colors.primary[DEFAULT]") 0%, #40adc5 59.93%, rgba(94, 244, 235, 0.21) 94.53%), url("/favicon.png");
	background-position: center right;
	background-repeat: repeat;
}
</style>
