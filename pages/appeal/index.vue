<template>
	<div class="container md:py-10 py-4">
		<div class="min-h-40 flex justify-center items-center flex-col gap-6">
			<div class="text-3xl text-center text-gray-700 font-semibold">
				{{ $t("appeal_check") }}
			</div>

			<div class="text-base text-center text-gray-700 font-semibold">
				{{ $t("fill_appeal_number") }}
			</div>

			<input
				type="text"
				v-model="docNumber"
				class="bg-gray-50 max-w-[400px] border min-w-60 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-700"
			/>

			<WBtn @click="getData" color="primary">{{ $t("check_the_status") }}</WBtn>
		</div>

		<div v-if="getLoading" class="flex justify-center items-center min-h-32">
			<Spinner class="w-16 h-16" />
		</div>
		<div class="mt-4 max-w-[885px] mx-auto" v-else-if="Item">
			<BaseCard class="">
				<div class="text-primary text-center text-lg font-bold px-4 border-primary mb-4">
					{{ Item?.contractorFulName || Item?.personFullName }}
				</div>
				<div class="text-gray-900 text-base font-semibold">{{ $t("doc_number") }} : {{ Item?.docNumber }}</div>
				<div class="text-gray-900 text-base font-semibold">{{ $t("docOn") }} : {{ Item?.docOn }}</div>

				<div
					class="bg-green-100 mt-2 inline-block text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded"
					:class="{ '!bg-red-100 !text-red-800': Item.statusId == 5 }"
				>
					{{ Item?.status }}
				</div>
			</BaseCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainSettingStore } from "@/store/MainSetting";

import WBtn from "@/components/shared/w-ui/WBtn";
// @ts-ignore
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import BaseCard from "@/components/shared/card/BaseCard.vue";
import AppealApplication from "@/services/my/AppealApplication";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

Meta.value = {
	title: "appeal_check",
	breadcrumbs: [
		{
			to: "/appeal",
			label: "appeal_check",
		},
	],
};

useHead({
	title: t("appeal_check"),
});
const { $toast } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const docNumber = ref<string>(route.query.docNumber as string);

const getLoading = ref(false);
const Item = ref<{
	contractorFulName: string;
	contractorInn: string;
	docNumber: string;
	docOn: string;
	expireOn: string;
	inn: string;
	pinfl: string;
	personFullName: string;
	status: string;
	statusId: number;
} | null>();

const getData = () => {
	getLoading.value = true;
	Item.value = null;
	AppealApplication.GetFromDocnumber(docNumber.value)
		.then((res) => {
			Item.value = res.data;
			router.replace({
				params: {
					id: res.data.id,
				},
			});
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error(t("not_found_data"));
			}
		})
		.finally(() => {
			getLoading.value = false;
		});
};
</script>
