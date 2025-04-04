<template>
	<div
		class="bg-primary z-50 md:flex hidden flex-col gap-4 fixed right-4 top-40 py-3 rounded-full px-2"
		:class="{ 'bg-white shadow-lg ': $route.name != 'Home' }"
	>
		<!-- darak mode -->
		<CircleIcon
			data-popover-target="popover-left"
			data-popover-placement="left"
			data-popover-trigger="click"
			class="cursor-pointer"
			:class="{ 'bg-primary': $route.name != 'Home' }"
		>
			<component :is="eye" class="fill-white" />
		</CircleIcon>

		<div
			data-popover
			id="popover-left"
			role="tooltip"
			class="absolute z-50 invisible inline-block w-64 text-sm text-gray-800 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
		>
			<div class="p-4">
				<div class="">
					<div
						class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer p-2"
						:class="{ 'bg-gray-200': !FontSettings.contracts }"
						@click="FontSettings.contracts = false"
					>
						<button class="bg-primary text-white font-bold text-lg w-8 h-8 flex justify-center items-center">A</button>
						<div class="text-base font-semibold">Oddiy versiyasi</div>
					</div>
					<div
						class="flex mt-1 items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer p-2"
						:class="{ 'bg-gray-200': FontSettings.contracts }"
						@click="FontSettings.contracts = true"
					>
						<button class="bg-gray-950 text-white font-bold text-lg w-8 h-8 flex justify-center items-center">A</button>
						<div class="text-base font-semibold">Kontrast versiyasi</div>
					</div>
				</div>

				<div class="flex mt-3 flex-col p-2">
					<ul class="flex items-center gap-2">
						<li class="relative border h-8 w-8">
							<input v-model="FontSettings.fontSize" value="0" class="hidden" type="radio" id="inc1" name="selector" />
							<label
								:class="{ 'bg-primary text-white hover:bg-primary-800': '0' == FontSettings.fontSize }"
								class="text-base absolute font-semibold cursor-pointer hover:bg-gray-100 duration-100 text-center top-0 bottom-0 left-0 right-0"
								for="inc1"
								>A</label
							>
						</li>
						<li class="relative border h-10 w-10">
							<input v-model="FontSettings.fontSize" value="20" class="hidden" type="radio" id="inc2" name="selector" />
							<label
								:class="{ 'bg-primary text-white hover:bg-primary-800': '20' == FontSettings.fontSize }"
								class="text-xl absolute font-semibold cursor-pointer hover:bg-gray-100 duration-100 text-center top-0 bottom-0 left-0 right-0"
								for="inc2"
								>A</label
							>
						</li>
						<li class="relative border h-12 w-12">
							<input v-model="FontSettings.fontSize" value="100" class="hidden" type="radio" id="inc3" name="selector" />
							<label
								:class="{ 'bg-primary text-white hover:bg-primary-800': '100' == FontSettings.fontSize }"
								class="text-3xl absolute font-semibold cursor-pointer hover:bg-gray-100 duration-100 text-center top-0 bottom-0 left-0 right-0"
								for="inc3"
								>A</label
							>
						</li>
					</ul>
					<div class="text-base font-semibold">Shrift o'lchami</div>
				</div>

				<button
					class="flex items-center w-full gap-2 mt-3 bg-gray-100 hover:bg-gray-200 rounded p-2"
					:class="{ 'bg-gray-200': FontSettings.voices }"
					@click="FontSettings.voices = !FontSettings.voices"
				>
					<div
						class="w-8 border h-8 hover:bg-primary-800 hover:fill-white justify-center flex items-center"
						:class="{ 'bg-primary text-white fill-white': FontSettings.voices }"
					>
						<svg width="25px" height="25px" viewBox="0 0 0.75 0.75" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.388 0.128a0.031 0.031 0 0 0 -0.031 0.004L0.208 0.25H0.094a0.031 0.031 0 0 0 -0.031 0.031v0.188a0.031 0.031 0 0 0 0.031 0.031h0.114l0.148 0.118A0.031 0.031 0 0 0 0.375 0.625a0.028 0.028 0 0 0 0.013 -0.003A0.031 0.031 0 0 0 0.406 0.594V0.156a0.031 0.031 0 0 0 -0.018 -0.028M0.344 0.529l-0.106 -0.084A0.031 0.031 0 0 0 0.219 0.438H0.125v-0.125h0.094a0.031 0.031 0 0 0 0.019 -0.007L0.344 0.221Zm0.271 -0.331a0.031 0.031 0 0 0 -0.044 0.044 0.188 0.188 0 0 1 -0.012 0.276 0.031 0.031 0 0 0 0.02 0.055 0.031 0.031 0 0 0 0.02 -0.007 0.25 0.25 0 0 0 0.016 -0.368m-0.088 0.088a0.031 0.031 0 1 0 -0.044 0.044A0.063 0.063 0 0 1 0.5 0.375a0.063 0.063 0 0 1 -0.022 0.048 0.031 0.031 0 0 0 -0.004 0.044 0.031 0.031 0 0 0 0.044 0.004A0.125 0.125 0 0 0 0.563 0.375a0.127 0.127 0 0 0 -0.037 -0.088"
							/>
						</svg>
					</div>
					<div class="text-base font-semibold">Ovoz berishni yoqish</div>
				</button>
			</div>

			<div data-popper-arrow></div>
		</div>

		<!-- comment -->
		<CircleIcon class="cursor-pointer" :class="{ 'bg-primary': $route.name != 'Home' }">
			<component :is="comment" class="fill-white" />
		</CircleIcon>
		<!-- search -->
		<CircleIcon class="cursor-pointer" :class="{ 'bg-primary': $route.name != 'Home' }" @click="isSearchOpen = !isSearchOpen">
			<component :is="search" class="fill-white" />
		</CircleIcon>
		<!-- phone -->

		<NuxtLink :to="'tel:' + MainSetting.phone" external>
			<CircleIcon :class="{ 'bg-primary': $route.name != 'Home' }">
				<component :is="phone" class="fill-white" />
			</CircleIcon>
		</NuxtLink>
	</div>
</template>
<script setup lang="ts">
import { watch, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useMainSettingStore } from "@/store/MainSetting";

import phone from "@/assets/icons/actions/phone.svg?component";
import search from "@/assets/icons/actions/search.svg?component";
import eye from "@/assets/icons/actions/eye.svg?component";
import comment from "@/assets/icons/actions/comment.svg?component";

import CircleIcon from "@/components/shared/CircleIcon.vue";
import { useSpeach } from "@/composables/useSpeach";

const MainStore = useMainSettingStore();
const { MainSetting, FontSettings, isSearchOpen } = storeToRefs(MainStore);

const { useVoice } = useSpeach();

watch(
	() => FontSettings.value.fontSize,
	(newV) => {
		let x = (100 + ((24 - 16) / (100 - 0)) * (+newV - 0)) % 100;
		// @ts-ignore
		document.querySelector("body").style.fontSize = `${16 + Math.ceil(x)}px`;
	},
	{
		immediate: true,
	},
);

watch(
	() => FontSettings.value.contracts,
	() => {
		if (FontSettings.value.contracts) {
			document.body.classList.add("gray-v");
		} else {
			document.body.classList.remove("gray-v");
		}
	},
	{
		immediate: true,
	},
);

watch(
	() => FontSettings.value.voices,
	() => {
		if (FontSettings.value.voices) {
			window.addEventListener("mousemove", () => {
				// Get selected text
				let selectedText = "";
				// @ts-ignore
				const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);

				// Get the text content of the hovered element
				if (hoveredElement) {
					selectedText = hoveredElement.textContent as string;
				} else {
					selectedText = "";
				}
				useVoice(selectedText as string);
			});
		} else {
			window.removeEventListener("mousemove", () => {});
		}
	},
);

onMounted(() => {
	initFlowbite();
});
</script>
