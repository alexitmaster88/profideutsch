<template>
	<div class="container py-6">
		<!-- tabs -->
		<div class="text-sm font-medium text-center text-gray-500 border-gray-200">
			<ul class="flex flex-wrap -mb-px">
				<li class="me-2">
					<LocLink
						class="inline-block text-lg p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary duration-200 font-semibold"
						:class="{ 'text-primary !border-primary': tab == '1' }"
						:to="{
							path: 'srv',
							query: {
								type: '1',
							},
						}"
					>
						{{ $t("pullik_xizmatlar") }}
					</LocLink>
				</li>
				<li class="me-2">
					<LocLink
						class="inline-block text-lg p-4 border-b-2 border-transparent rounded-t-lg hover:text-primary hover:border-primary duration-200 font-semibold"
						:class="{ 'text-primary !border-primary': tab == '2' }"
						:to="{
							path: 'srv',
							query: {
								type: '2',
							},
						}"
					>
						{{ $t("tekin_xizmatlar") }}
					</LocLink>
				</li>
			</ul>
		</div>

		<div v-if="loading" class="flex justify-center lg:justify-start items-center w-full gap-6 mt-12">
			<Spinner class="w-16 h-16 mx-auto" />
		</div>

		<div v-else-if="SrvGroupList.length" class="flex flex-col justify-center mt-6 gap-4">
			<Disclosure v-for="group in SrvGroupList" :key="group.code" v-slot="{ open }">
				<DisclosureButton
					class="flex w-full justify-between rounded-lg bg-primary-100 px-4 py-4 text-left text-lg font-medium text-primary-900 hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/75"
				>
					<span>{{ group.fullName }}</span>
					<svg
						class="h-4 w-4 text-primary-500"
						data-accordion-icon
						:class="open ? ' transform' : 'rotate-180'"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
					</svg>
				</DisclosureButton>
				<DisclosurePanel class="px-4 pb-2 pt-4 text-sm bg-white gap-4 rounded-lg flex flex-col">
					<div v-for="s in group.needChambers" :key="s.id" class="p-3 bg-gray-100 duration-150 shadow rounded-lg border-s-2 border-primary">
						<div class="text-lg font-semibold text-primary">{{ s.fullName }}</div>
					</div>
				</DisclosurePanel>
			</Disclosure>
		</div>

		<div v-else class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 mt-4 font-semibold">
			{{ $t("not_found_data") }}
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useRoute } from "vue-router";
import NeedChamberServiceService from "@/services/erp/needChamberService";
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import LocLink from "~/components/shared/LocLink.vue";
import { useMainSettingStore } from "@/store/MainSetting";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

Meta.value = {
	title: "srv",
	breadcrumbs: [
		{
			to: "/srv",
			label: "srv",
		},
	],
};

useSeoMeta({
	title: t("srv"),
});
type IType = "1" | "2"; //  1-pullik,  2-tekin
const route = useRoute();
const loading = ref(false);
const SrvGroupList = ref<any[]>([]);
const tab = ref<IType>("1");

const getServices = () => {
	loading.value = true;
	const isPaid = tab.value == "1";

	NeedChamberServiceService.GetListGroupAndChild({
		isPaid: isPaid,
	})
		.then((res) => {
			SrvGroupList.value = res.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

watch(
	() => route.query,
	(newQuery) => {
		tab.value = (newQuery.type as IType) || "1";
		getServices();
	},
	{
		immediate: true,
		deep: true,
	},
);
</script>
