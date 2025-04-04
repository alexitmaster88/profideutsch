<template>
	<div class="container md:py-10 py-4">
		<div class="min-h-40 flex justify-center items-center flex-col gap-6">
			<div class="text-2xl text-center text-gray-700 font-semibold">
				{{ $t("pub.title") }} <br />
				{{ $t("pub.inn_fill") }}
			</div>

			<input
				type="text"
				v-model="tin"
				class="bg-gray-50 max-w-[400px] border min-w-60 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-700"
				:placeholder="$t('pub.inn_fill')"
			/>

			<WBtn @click="getData()" color="primary">{{ $t("get_info") }}</WBtn>
		</div>

		<div v-if="getLoading" class="flex justify-center items-center min-h-32">
			<Spinner class="w-16 h-16" />
		</div>
		<div class="mt-4 max-w-[885px] mx-auto" v-else-if="Item">
			<BaseCard class="">
				<div class="text-primary text-center text-lg font-bold px-4 border-primary mb-4">{{ Item?.contractor }} / {{ Item?.inn }}</div>
				<div class="text-gray-900 text-base font-semibold">{{ $t("doc_number") }} : {{ Item?.docNumber }}</div>
				<div class="text-gray-900 text-base font-semibold">{{ $t("expire_on") }} : {{ Item?.expireOn }}</div>
			</BaseCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useMainSettingStore } from "@/store/MainSetting";

import WBtn from "@/components/shared/w-ui/WBtn";
import MemshipCertificateService from "@/services/my/MemshipCertificate";
// @ts-ignore
import Spinner from "@/components/shared/skeleton/Spinner.vue";
import BaseCard from "@/components/shared/card/BaseCard.vue";
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

Meta.value = {
	title: "pub.title",
	breadcrumbs: [
		{
			to: "/pub",
			label: "pub.title",
		},
	],
};

useSeoMeta({
	title: t("pub.title"),
});
const { $toast } = useNuxtApp();
const route = useRoute();
const tin = ref<string>(route.query.tin as string);

const getLoading = ref(false);
const Item = ref<{
	contractor: string;
	docNumber: string;
	expireOn: string;
	inn: string;
	pinfl: string;
} | null>();

const getData = () => {
	getLoading.value = true;
	Item.value = null;
	MemshipCertificateService.GetByInnPinflForChamber(tin.value)
		.then((res) => {
			Item.value = res.data;
		})
		.catch((e) => {
			if (e?.response?.data?.errors) {
				Object.values(e?.response?.data?.errors).forEach((el: any) => {
					$toast.error(el ? el[0] : "");
				});
			} else {
				$toast.error("маълумот топилмади!");
			}
		})
		.finally(() => {
			getLoading.value = false;
		});
};
</script>
