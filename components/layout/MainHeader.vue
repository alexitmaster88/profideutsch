<template>
	<header class="md:py-12 py-0 md:-mt-36 relative z-50">
		<div
			class="top-0 duration-300"
			:class="{
				' shadow-lg backdrop-blur bg-primary transition-transform md:fixed top-8 md:right-0 md:left-0 px-32 duration-300 ease-linear': stickyHeader,
			}"
		>
			<div class="flex md:flex-row flex-col md:gap-4 gap-1 justify-between items-center">
				<div class="flex justify-between md:w-auto w-full items-center bg-primary md:px-4" :class="{ 'md:py-2 ': stickyHeader }">
					<img
						:src="barImg"
						class="block md:absolute -left-24 bg-primary md:p-4 cursor-pointer"
						@click="IsNavbarOpen = !IsNavbarOpen"
						:class="{
							'md:relative -left-32': stickyHeader,
						}"
						alt="menu"
					/>
					<LocLink
						to="/"
						:class="{
							'-ml-24': stickyHeader,
						}"
					>
						<img :src="API_URL + MainSetting.logo?.url" class="h-16 object-contain" />
					</LocLink>
					<LocLink to="https://my.chamber.uz/" class="">
						<img :src="userImg" alt="" class="md:hidden block" />
					</LocLink>
				</div>
				<div class="flex justify-center items-center md:gap-6 gap-3 bg-primary px-4 flex-wrap" :class="{ 'md:py-2 md:!px-0': stickyHeader }">
					<LocLink
						to="https://old.chamber.uz/"
						class="text-white sm:text-base border-white border -ml-4 px-4 py-1 rounded-3xl text-sm font-semibold cursor-pointer hover:text-gray-100 hover:bg-primary-950 duration-200 hidden lg:inline-flex whitespace-nowrap gap-3 items-center"
					>
						<span>{{ $t("old_chamber_text") }}</span>
					</LocLink>
					<LocLink
						class="text-white sm:text-base text-sm font-semibold cursor-pointer hover:text-gray-300 duration-200 hidden md:inline-flex whitespace-nowrap gap-3 items-center"
						:to="'mailto:' + MainSetting.email"
						:externalLink="true"
					>
						<img :src="emailImg" alt="" />
						<span>{{ MainSetting.email }}</span>
					</LocLink>
					<LocLink
						class="text-white sm:text-base text-sm font-semibold cursor-pointer hover:text-gray-300 duration-200 inline-flex whitespace-nowrap gap-3 items-center"
						:to="'tel:' + MainSetting.phone"
						:externalLink="true"
					>
						<img :src="phoneImg" alt="" />
						<span>{{ MainSetting.phone }} | {{ MainSetting.shortPhone }} </span>
					</LocLink>
					<LanguageSwitch />
					<LocLink
						to="https://my.chamber.uz/"
						class="text-white sm:text-base text-sm font-semibold cursor-pointer hover:text-gray-300 duration-200 hidden lg:inline-flex whitespace-nowrap gap-3 items-center"
					>
						<img :src="userImg" alt="" />
						<span>{{ $t("kabinet") }}</span>
					</LocLink>
				</div>
			</div>
		</div>
		<div class="md:flex hidden gap-6 mt-6 justify-evenly">
			<template v-for="el in MainMenu">
				<LocLink v-if="el.url" :to="el.url" class="text-center text-white sm:text-lg text-sm font-normal hover:text-gray-300 duration-200">
					{{ el.title }}
				</LocLink>

				<template v-else-if="el.sections">
					<button
						:data-dropdown-toggle="el.id + 'menu'"
						aria-expanded="false"
						class="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:text-gray-300 duration-200 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto"
					>
						{{ el.title }}
						<svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
						</svg>
					</button>
					<!-- Dropdown menu -->
					<div :id="el.id + 'menu'" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow max-w-60">
						<ul class="text-gray-700 py-2" :aria-labelledby="el.id + 'menu'">
							<li v-for="(child, index) in el.sections">
								<LocLink
									v-if="child.url"
									:to="child.url"
									:class="{
										'block px-4 py-2 hover:bg-primary-50 hover:text-primary-900 font-medium': true,
										'border-b': index !== el.sections.length - 1,
									}"
								>
									{{ child.title }}
								</LocLink>
								<!-- Dropdown menu 2 -->
								<template v-else-if="child.children">
									<button
										:data-dropdown-toggle="child.id + 'menu2'"
										aria-expanded="false"
										data-dropdown-placement="right-start"
										:class="{
											'border-b': index !== el.sections.length - 1,
											'flex items-center justify-between w-full rounded hover:bg-primary-50 px-4 py-2  hover:text-primary-900 font-medium': true,
										}"
									>
										{{ child.title }}
										<svg class="w-2.5 h-2.5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
										</svg>
									</button>
									<div
										:id="child.id + 'menu2'"
										class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg overflow-hidden shadow w-44"
										style="margin-top: -8px !important"
									>
										<ul class="text-gray-700 py-2" :aria-labelledby="child.id + 'menu2'">
											<li v-for="(e, indexch) in child.children">
												<LocLink
													v-if="e.url"
													:to="e.url"
													:class="{
														'border-b': indexch !== child.children.length - 1,
														'block px-4 py-2 hover:bg-primary-50 hover:text-primary-900 font-medium': true,
													}"
												>
													{{ e.title }}
												</LocLink>
											</li>
										</ul>
									</div>
								</template>
							</li>
						</ul>
					</div>
				</template>
			</template>
		</div>
	</header>

	<MainFullNavbar />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted } from "vue";
import { useMainSettingStore } from "@/store/MainSetting";
import { storeToRefs } from "pinia";

import phoneImg from "@/assets/icons/phone-fill.svg";
import emailImg from "@/assets/icons/email-fill.svg";
import barImg from "@/assets/icons/bar.svg";
import userImg from "@/assets/icons/user/user-fill.svg";
import LanguageSwitch from "@/components/layout/LanguageSwitch.vue";
import { API_URL } from "@/services/base";
import { useMainMenuStore } from "@/store/MainMenu";
import LocLink from "../shared/LocLink.vue";

const MainFullNavbar = defineAsyncComponent(() => import("@/components/layout/MainFullNavbar.vue"));
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
const smAndLarger = breakpoints.greaterOrEqual("sm");

const MainStore = useMainSettingStore();
const MainMenuStore = useMainMenuStore();
const { MainSetting, IsNavbarOpen } = storeToRefs(MainStore);
const { MainMenu } = storeToRefs(MainMenuStore);
const stickyHeader = useState("stickyHeader", () => false);

onMounted(() => {
	window.addEventListener("scroll", () => {
		const r = window.pageYOffset || document.documentElement.scrollTop;
		if (r >= 80 && !stickyHeader.value) {
			stickyHeader.value = true;
		}
		if (r == 0) {
			stickyHeader.value = false;
		}
	});
});

onUnmounted(() => {
	window.removeEventListener("scroll", () => {});
});
</script>
