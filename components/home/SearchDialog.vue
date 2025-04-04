<template>
	<TransitionRoot appear :show="isSearchOpen" as="template">
		<Dialog as="div" :open="isSearchOpen" :initialFocus="searchInputRef" class="relative" style="z-index: 54" @close="isSearchOpen = false">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black/25" />
			</TransitionChild>
			<div class="fixed inset-0">
				<div class="flex min-h-full items-center overflow-hidden justify-center p-4 text-center">
					<TransitionChild
						as="div"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
						class="bg-white rounded-lg overflow-hidden"
					>
						<DialogPanel
							class="max-h-[30rem] max-w-4xl min-w-96 flex flex-col sm:w-[40rem] transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
						>
							<div class="w-full px-6 top-0 flex justify-between items-center gap-2 p-3 bg-white shadow-sm">
								<div class="relative w-full">
									<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
										<SharedSkeletonSpinner class="w-4 h-4" v-if="loading" />
										<svg v-else class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>
									<input
										type="search"
										id="search"
										class="block w-full p-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-blue-500 focus:border-primary-800"
										placeholder="Search"
										ref="searchInputRef"
										v-model="search"
										@update:model-value="debouncedFn"
									/>
								</div>
								<button
									@click="isSearchOpen = false"
									type="button"
									class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
								>
									<span class="sr-only">Close menu</span>
									<!-- Heroicon name: outline/x -->
									<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div class="p-6 pt-2 overflow-auto h-full">
								<div
									v-if="news.length == 0 && events.length == 0 && pages.length == 0 && filteredMainMenu.length == 0"
									class="flex flex-col justify-center items-center"
								>
									<template v-if="search">
										<h2 class="text-stone-800 my-6 text-2xl font-semibold">{{ $t("not_found_data") }}</h2>
										<img class="w-40" src="@/assets/images/home/not_found.png" alt="not_found" />
									</template>
									<template v-else>
										<h2 class="text-stone-800 my-6 text-2xl font-semibold">{{ $t("search_in_website") }}</h2>
										<img class="w-40" src="@/assets/images/home/search.png" alt="search" />
									</template>
								</div>
								<!-- news -->
								<template v-if="news.length">
									<div class="flex text-lg text-primary items-center gap-3 font-semibold my-4">
										<hr class="w-full h-px border-0 bg-primary-700" />
										{{ $t("news") }}
										<hr class="w-full h-px border-0 bg-primary-700" />
									</div>
									<ul class="flex flex-wrap gap-2 w-full m-auto">
										<LocLink
											class="bg-gray-100 group rounded w-full flex p-2 px-4 h-full items-center text-left line-clamp-2 hover:bg-gray-200 duration-150"
											v-for="n in news"
											:to="'/news/' + n.id"
											@click="isSearchOpen = false"
										>
											{{ n.title }}
										</LocLink>
									</ul>
								</template>
								<!--events -->
								<template v-if="events.length">
									<div class="flex text-lg text-primary items-center gap-3 font-semibold my-4">
										<hr class="w-full h-px border-0 bg-primary-700" />
										{{ $t("calendar_of_events") }}
										<hr class="w-full h-px border-0 bg-primary-700" />
									</div>
									<ul class="flex flex-wrap gap-2 w-full m-auto">
										<LocLink
											class="bg-gray-100 rounded w-full flex p-2 px-4 h-full items-center text-left line-clamp-2 hover:bg-gray-200 duration-150"
											v-for="n in events"
											:to="'/eventCalendar/' + n.id"
											@click="isSearchOpen = false"
										>
											{{ n.title }}
										</LocLink>
									</ul>
								</template>
								<!-- pages -->
								<template v-if="pages.length">
									<div class="flex text-lg text-primary items-center gap-3 font-semibold my-4">
										<hr class="w-full h-px border-0 bg-primary-700" />
										{{ $t("pages.index") }}
										<hr class="w-full h-px border-0 bg-primary-700" />
									</div>
									<ul class="flex flex-wrap gap-2 w-full m-auto">
										<LocLink
											class="bg-gray-100 rounded w-full flex p-2 px-4 h-full items-center text-left line-clamp-2 hover:bg-gray-200 duration-150"
											v-for="n in pages"
											:to="'/page/' + n.slug"
											@click="isSearchOpen = false"
										>
											{{ n.title }}
										</LocLink>
									</ul>
								</template>
								<!-- menu -->
								<template v-if="filteredMainMenu.length">
									<div class="flex text-lg text-primary items-center gap-3 font-semibold my-4">
										<hr class="w-full h-px border-0 bg-primary-700" />
										{{ $t("pages.index") }}
										<hr class="w-full h-px border-0 bg-primary-700" />
									</div>
									<ul class="flex flex-wrap gap-2 w-full m-auto">
										<div class="md:1/2 w-full my-2 flex flex-col gap-2" v-for="(el, index) in filteredMainMenu" :key="index">
											<div class="text-xl font-normal">{{ el.title }}</div>
											<ul v-if="el.sections" v-for="(elch, indexch) in el.sections" :key="indexch">
												<Disclosure v-if="elch.children.length != 0" v-slot="{ open }">
													<DisclosureButton
														class="bg-primary-100 group rounded w-full flex p-2 px-4 items-center text-left line-clamp-2 text-primary-900 hover:bg-primary-200 duration-150"
													>
														<svg
															class="h-4 w-3 text-primary-900 opacity-60"
															:class="open ? 'rotate-180 transform' : ''"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 10 6"
														>
															<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
														</svg>
														<span class="flex-1 ms-2 text-left whitespace-nowrap">{{ elch.title }}</span>
													</DisclosureButton>
													<DisclosurePanel>
														<ul class="py-2 ps-8 space-y-2 list-disc">
															<li v-for="(elg, indexg) in elch.children" :key="indexg">
																<LocLink
																	@click="isSearchOpen = false"
																	:to="elg.url || '#'"
																	class="bg-gray-100 group rounded w-full flex p-2 px-4 h-full items-center text-left line-clamp-2 hover:bg-gray-200 duration-150"
																>
																	{{ elg.title }}
																</LocLink>
															</li>
														</ul>
													</DisclosurePanel>
												</Disclosure>
												<div v-else>
													<LocLink
														:to="elch.url"
														class="bg-gray-100 group rounded w-full flex p-2 px-4 h-full items-center text-left line-clamp-2 hover:bg-gray-200 duration-150"
														@click="isSearchOpen = false"
													>
														{{ elch.title }}
													</LocLink>
												</div>
											</ul>
										</div>
									</ul>
								</template>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot, TransitionChild, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import NewsService from "~/services/news";
import PageService from "~/services/page";
import EventCalendarService from "~/services/eventCalendar";
import { useDebounceFn } from "@vueuse/core";
import { useMainSettingStore } from "~/store/MainSetting";
import LocLink from "../shared/LocLink.vue";
import { useMainMenuStore } from "~/store/MainMenu";

const MainStore = useMainSettingStore();
const MainMenuStore = useMainMenuStore();
const { isSearchOpen } = storeToRefs(MainStore);
const { MainMenu } = storeToRefs(MainMenuStore);
const searchInputRef = ref(null);
const search = ref("");
const loading = ref(false);
const news = ref<any[]>([]);
const pages = ref<any[]>([]);
const events = ref<any[]>([]);
const filteredMainMenu = ref<any[]>([]);

const searchRecursive = (items: any, searchTerm: any) => {
	return items.reduce((acc: any, item: any) => {
		// Clone the item to avoid mutating the original data
		let newItem = {
			...item,
			sections: item.sections ? [...item.sections] : undefined,
		};

		// Check if the current item's title matches the search term
		if (newItem.title.toLowerCase().includes(searchTerm)) {
			acc.push(newItem);
			return acc;
		}

		// If the item has children (sections), search through them recursively
		if (newItem.sections && newItem.sections.length) {
			const matchedChildren = searchRecursive(newItem.sections, searchTerm);
			if (matchedChildren.length) {
				newItem.sections = matchedChildren;
				acc.push(newItem);
				return acc;
			}
		}

		return acc;
	}, []);
};

const debouncedFn = useDebounceFn(
	() => {
		const searchTerm = search.value.toLowerCase();

		loading.value = true;
		Promise.allSettled([getNews(), getPages(), getEvents()]).finally(() => {
			loading.value = false;
		});

		filteredMainMenu.value = searchTerm ? searchRecursive(MainMenu.value, searchTerm) : MainMenu.value;
	},
	500,
	{ maxWait: 5000 },
);

const getNews = async () => {
	// if (search.value) {
	const { data } = await NewsService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 5,
		"filters[title][$containsi]": search.value,
	});
	news.value = data.data || [];
	// } else {
	// 	news.value = [];
	// }
};

const getPages = async () => {
	// if (search.value) {
	const { data } = await PageService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 5,
		"filters[title][$containsi]": search.value,
	});

	pages.value = data.data || [];
	// } else {
	// 	pages.value = [];
	// }
};

const getEvents = async () => {
	// if (search.value) {
	const { data } = await EventCalendarService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 5,
		"filters[title][$containsi]": search.value,
	});

	events.value = data.data || [];
	// } else {
	// 	events.value = [];
	// }
};
</script>
