<template>
	<ul class="flex flex-wrap md:gap-3">
		<li
			v-for="t in tabs"
			:key="t.id"
			@click="tab = t.id"
			class="md:pt-4 md:pb-7 pt-2 pb-4 md:min-w-36 text-center font-normal md:px-6 px-3 text-base h-18 text-primary cursor-pointer rounded-t-lg"
			:class="{ 'bg-white': tab == t.id, 'bg-[#F3F3F3]': tab != t.id }"
		>
			{{ t.label }}
		</li>
	</ul>

	<div class="md:min-h-56 -translate-y-3 bg-white rounded-xl p-6">
		<div v-if="tab == 1" class="flex md:flex-row flex-col md:gap-6 gap-4 flex-wrap items-center">
			<div class="overflow-hidden rounded-xl bg-gray-300 md:w-56 md:h-56 w-40 h-40">
				<ImgWithLightBox class="object-cover h-full w-full" :imgs="item?.photo?.url" />
			</div>
			<div class="md:text-left text-center w-auto flex-1 gap-2">
				<div class="md:text-3xl text-2xl leading-tight font-bold mb-2 text-primary">{{ item.fio }}</div>
				<div class="text-slate-900 md:text-xl leading-tight font-normal mb-2">{{ item.department }}</div>
				<hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
				<a v-if="item.phone" class="text-gray-600 hover:underline hover:text-primary text-base flex font-normal leading-normal" :href="'tel:' + item.phone">
					<svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 20 20" width="20" height="20">
						<path
							d="M17.617 14.61c-0.621 -0.625 -2.123 -1.537 -2.852 -1.905 -0.949 -0.478 -1.028 -0.517 -1.774 0.037 -0.497 0.37 -0.829 0.701 -1.411 0.576s-1.848 -0.825 -2.957 -1.929 -1.849 -2.407 -1.974 -2.987 0.211 -0.907 0.578 -1.407c0.516 -0.703 0.477 -0.821 0.036 -1.77 -0.344 -0.739 -1.283 -2.227 -1.91 -2.844 -0.67 -0.662 -0.67 -0.545 -1.103 -0.365a6.25 6.25 0 0 0 -1.009 0.538c-0.625 0.415 -0.972 0.76 -1.214 1.278s-0.351 1.734 0.901 4.01 2.131 3.439 3.951 5.253 3.218 2.789 5.263 3.937c2.53 1.417 3.5 1.141 4.02 0.898s0.867 -0.586 1.282 -1.211a6.2 6.2 0 0 0 0.539 -1.008c0.18 -0.431 0.297 -0.431 -0.367 -1.101z"
							fill="none"
							stroke="#444444"
							stroke-miterlimit="10"
							stroke-width="1.25"
						/>
					</svg>
					{{ item.phone }}
				</a>
				<a v-if="item.email" class="text-gray-600 hover:underline hover:text-primary text-base flex font-normal leading-normal" :href="'mailto:' + item.email">
					<svg xmlns="http://www.w3.org/2000/svg" class="mr-2" viewBox="0 0 20 20" width="20" height="20">
						<path
							x="48"
							y="96"
							width="416"
							height="320"
							rx="40"
							ry="40"
							fill="none"
							stroke="#444444"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.25"
							d="M3.438 3.75h13.125a1.563 1.563 0 0 1 1.563 1.563v9.375a1.563 1.563 0 0 1 -1.563 1.563H3.438a1.563 1.563 0 0 1 -1.563 -1.563v-9.375A1.563 1.563 0 0 1 3.438 3.75"
						/>
						<path
							fill="none"
							stroke="#444444"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.25"
							d="M4.375 6.25 10 10.625l5.625 -4.375"
						/>
					</svg>
					{{ item.email }}
				</a>
			</div>
		</div>

		<div v-else-if="tab == 2">
			<MarkdownCustom :source="item.purpose_department || ''" html linkify />
		</div>
	</div>
</template>

<script setup lang="ts">
import MarkdownCustom from "@/components/shared/MarkdownCustom.vue";
import ImgWithLightBox from "@/components/shared/ImgWithLightBox.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps<{ item: any }>();

const tab = ref(1);
const tabs = computed(() => {
	const list = [
		{
			id: 1,
			label: t("asosiy"),
		},
		{
			id: 2,
			label: t("purpose_department"),
		},
	];

	return list;
});
</script>
