<template>
	<NuxtLink
		:to="MainSetting.appStore"
		target="_blank"
		external
		class="h-[3.75rem] w-1/2 p-1 px-1.5 rounded-lg border border-sky-800 flex flex-col justify-start items-center gap-2.5 hover:bg-cyan-400 group cursor-pointer"
	>
		<div class="md:w-[10.5rem] w-full justify-start items-center gap-1.5 inline-flex">
			<div class="w-12 h-12 relative">
				<div class="w-12 h-12 left-0 top-0 absolute rounded-3xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" class="fill-cyan-400 group-hover:fill-white">
						<path
							d="M24.1903 16.7447C23.0053 16.7447 21.1709 15.3974 19.2392 15.4461C16.6906 15.4785 14.3531 16.9233 13.0382 19.2121C10.3922 23.806 12.3564 30.5914 14.9375 34.325C16.2036 36.1431 17.6971 38.1884 19.6775 38.1235C21.5767 38.0423 22.291 36.8898 24.5961 36.8898C26.8849 36.8898 27.5342 38.1235 29.5471 38.0748C31.5925 38.0423 32.8911 36.2242 34.1411 34.3899C35.5858 32.2796 36.1864 30.2343 36.2189 30.1206C36.1702 30.1044 32.2418 28.5947 32.1931 24.0495C32.1606 20.251 35.2936 18.4329 35.4397 18.3518C33.6541 15.7383 30.9107 15.4461 29.953 15.3811C27.4531 15.1863 25.359 16.7447 24.1903 16.7447ZM28.4108 12.9137C29.466 11.6476 30.164 9.87816 29.9692 8.125C28.4595 8.18993 26.6414 9.13144 25.5538 10.3976C24.5798 11.5177 23.7357 13.3195 23.963 15.0402C25.635 15.1701 27.3557 14.1799 28.4108 12.9137Z"
						/>
					</svg>
				</div>
			</div>
			<div class="flex-col justify-start items-start inline-flex">
				<!-- <div class="text-white md:text-base md:leading-5 font-semibold mb-0 text-xs">Yuklab oling</div> -->
				<div class="text-white md:leading-5 md:text-base font-bold uppercase text-xs">app store</div>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup lang="ts">
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";

const MainStore = useMainSettingStore();
const { MainSetting } = storeToRefs(MainStore);
</script>
