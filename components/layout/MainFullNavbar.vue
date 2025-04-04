<template>
	<div
		class="h-screen w-screen bg-primary z-50 top-0 left-0 right-0"
		style="z-index: 52"
		:class="{ 'fixed flex': IsNavbarOpen, hidden: !IsNavbarOpen }"
		@keydown.esc="IsNavbarOpen = false"
		tabindex="0"
	>
		<div class="relative overflow-auto w-full">
			<div class="p-4 fixed">
				<img :src="IsNavbarOpen ? closeShape : barImg" alt='menu' class="block p-6 px-4 cursor-pointer" @click="IsNavbarOpen = false" />
			</div>

			<div class="flex justify-start items-start mt-8 flex-wrap lg:px-20 px-12">
				<LocLink to="/">
					<img v-if="LOCALE == 'en'" :src="SSP_ENG_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
					<img v-else-if="LOCALE == 'ru'" :src="SSP_RU_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
					<img v-else :src="SSP_UZB_W" class="h-16 object-contain" :alt="$t('ssp_name')" />
				</LocLink>
			</div>
			<!-- <div class="md:absolute mx-6 right-8 top-5">
				<WInput v-model="filter.search" forMenu :label="$t('search')" />
			</div> -->
			<div class="flex justify-start items-start mt-8 flex-wrap lg:px-20 px-12">
				<div class="lg:w-1/3 md:1/2 w-full my-4" v-for="(el, index) in MainMenu" :key="index">
					<div class="text-white text-2xl font-normal mb-4">{{ el.title }}</div>
					<ul v-if="el.sections" v-for="(elch, indexch) in el.sections" :key="indexch">
						<div v-if="elch.children.length != 0">
							<button
								type="button"
								class="flex items-center text-white w-full text-base transition duration-150 rounded-lg group hover:text-gray-300"
								:aria-controls="indexch + 'drop' + index"
								:data-collapse-toggle="indexch + 'drop' + index"
							>
								<CaretDown class="rotate-180 w-6" />
								<span class="flex-1 ms-2 text-left rtl:text-right whitespace-nowrap">{{ elch.title }}</span>
							</button>
							<ul :id="indexch + 'drop' + index" class="hidden py-2 ps-12 space-y-2 list-disc text-white">
								<li v-for="(elg, indexg) in elch.children" :key="indexg">
									<LocLink :to="elg.url || '#'" class="text-white duration-150 hover:text-gray-300">
										{{ elg.title }}
									</LocLink>
								</li>
							</ul>
						</div>
						<div v-else>
							<li class="p-2 ps-8">
								<LocLink :to="elch.url || '#'" class="text-white duration-150 hover:text-gray-300">
									{{ elch.title }}
								</LocLink>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import barImg from "@/assets/icons/bar.svg";
import closeShape from "@/assets/icons/shapeclose.svg";
import CaretDown from "@/assets/icons/CaretDown.svg?component";
import { storeToRefs } from "pinia";
import { useMainSettingStore } from "@/store/MainSetting";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useMainMenuStore } from "@/store/MainMenu";
import { LOCALE } from "@/i18n/i18n.config";

// import SSP_UZB from "@/assets/images/logo/dark/SSP_UZB.png";
// import SSP_RU from "@/assets/images/logo/dark/SSP_RU.png";
// import SSP_ENG from "@/assets/images/logo/dark/SSP_ENG.png";

import SSP_UZB_W from "@/assets/images/logo/light/SSP_UZB.png";
import SSP_RU_W from "@/assets/images/logo/light/SSP_RU.png";
import SSP_ENG_W from "@/assets/images/logo/light/SSP_ENG.png";
import LocLink from "../shared/LocLink.vue";

const MainStore = useMainSettingStore();
const { IsNavbarOpen } = storeToRefs(MainStore);
const MainMenuStore = useMainMenuStore();
const { MainMenu } = storeToRefs(MainMenuStore);
const route = useRoute();

watch(
	() => route.name,
	() => {
		IsNavbarOpen.value = false;
	},
);
</script>
