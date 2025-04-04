<template>
	<div
		class="md:max-w-[23.5625rem] relative cursor-pointer group overflow-hidden self-baseline md:w-1/3 shadow-sm rounded-lg hover:shadow-md transition duration-300 ease-in-out"
	>
		<div class="flex flex-col border absolute left-0 top-0 z-10 bg-primary w-[80px] h-[80px] rounded-tl-lg rounded-br-lg items-center">
			<div class="text-white text-[36px] font-normal">
				{{ new Date(event.startDate || "").getDate() }}
			</div>
			<div class="text-white text-[16px] font-normal">
				{{ months[new Date(event.startDate || "").getMonth()] }}
			</div>
		</div>
		<div class="h-[14.625rem] overflow-hidden bg-gray-100 relative">
			<img
				class="rounded-lg h-full object-cover w-full bg-gray-100 group-hover:scale-105 duration-300 ease-in-out"
				:src="returnImgSrc(event.image?.formats?.small?.url || event.image?.url)"
				:alt="event.title"
			/>
		</div>
		<div class="p-8 justify-between grow-0 h-full items-stretch gap-[0.6875rem]">
			<div class="text-gray-600 text-[12px] font-normal">
				{{ $t("venue") + ": " + event.type }}
			</div>
			<div class="text-slate-900 text-[18px] font-bold leading-[1.3125rem]">
				{{ event.title }}
			</div>
			<div class="">
				<span class="text-gray-600 text-sm font-normal leading-[1.125rem] line-clamp-4">
					{{ event.shortContent }}
				</span>
			</div>

			<div class="mt-8 flex justify-between items-center w-full">
				<div class="text-gray-600 text-opacity-30 text-xs font-bold duration-200 hover:text-opacity-80">
					{{ $t("read_more") }}
				</div>
				<div class="text-gray-600 text-xs font-bold flex gap-3 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
							stroke="#BFC4CE"
							stroke-width="1.5"
							stroke-miterlimit="10"
						/>
						<path d="M10 5.625V10H14.375" stroke="#BFC4CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					<span class="text-gray-600 text-xs font-bold">{{
						new Date(event.startDate || "").getHours().toString().padStart(2, "0") +
						":" +
						new Date(event.startDate || "").getMinutes().toString().padStart(2, "0")
					}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { API_URL } from "@/services/base";

defineProps<{ event: any }>();
const months = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "August", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];

const returnImgSrc = computed(() => (id: string) => API_URL + id);
</script>
