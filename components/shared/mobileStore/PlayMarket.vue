<template>
	<NuxtLink
		:to="MainSetting.playMarket"
		target="_blank"
		external
		class="h-[3.75rem] w-1/2 p-1 px-1.5 rounded-lg border border-sky-800 flex-col justify-start items-start gap-2.5 inline-flex hover:bg-cyan-400 group cursor-pointer"
	>
		<div class="md:w-[10.5rem] w-full justify-start items-center gap-1.5 inline-flex">
			<div class="w-12 h-12 relative">
				<div class="w-12 h-12 left-0 top-0 absolute rounded-3xl">
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15.1615 38C15.2789 37.9557 15.4021 37.8999 15.5292 37.8306L32.4047 28.5929L28.4058 24.5978L15.1615 38ZM33.1536 28.1847L28.9795 24.0164L33.1498 19.7961L38.8911 22.9286C40.3062 23.7006 39.5823 24.6652 38.8911 25.0426L33.1536 28.1847ZM32.4027 19.3898L15.5311 10.1848C15.3501 10.0866 15.1461 10.027 14.942 10L28.4019 23.4407L32.4027 19.3898ZM13.9524 10.1656L27.8282 24.0202L14.0178 37.9962C13.6154 37.7401 13.3979 37.1856 13.3959 36.4694C13.3882 35.0966 13.2785 13.3 13.2708 11.6654C13.2669 10.8799 13.5519 10.4024 13.9524 10.1656Z"
							class="fill-cyan-400 group-hover:fill-white"
						/>
					</svg>
				</div>
			</div>
			<div class="flex-col justify-start items-start flex">
				<!-- <div class="text-white md:text-base md:leading-5 font-semibold mb-0 text-xs">Yuklab oling</div> -->
				<div class="text-white md:leading-5 md:text-base font-bold uppercase text-xs">play market</div>
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
