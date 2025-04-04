<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import SSP_UZB_4 from "@/assets/images/SSP_UZB_4.png";
import LeadershipService from "@/services/leadership";
import LeaderShipCard from "@/components/leadership/LeaderShipCard.vue";
import Vector from "@/assets/icons/bg-vector-1.svg?component";
import { useMainSettingStore } from "@/store/MainSetting";

import ReklamaSection from "@/components/reklama/ReklamaSection.vue";
import LocLink from "~/components/shared/LocLink.vue";
import AdditionalLinks from "~/components/leadership/AdditionalLinks.vue";

// const MainMobileSection = defineAsyncComponent(
//   () => import("@/components/home/MainMobileSection.vue")
// );
const PartnerSection = defineAsyncComponent(() => import("@/components/home/PartnerSection.vue"));
const MainSettingStore = useMainSettingStore();
const { Meta } = storeToRefs(MainSettingStore);
const { t } = useI18n();

Meta.value = {
	title: "leadership",
	breadcrumbs: [
		{
			to: "/leadership",
			label: "leadership",
		},
	],
};

useSeoMeta({
	title: t("leadership"),
});

const loading = ref(false);
const LeadershipList = ref<any[]>([]);

const getLeadership = async () => {
	loading.value = true;
	LeadershipService.GetList({
		"pagination[page]": 1,
		"pagination[pageSize]": 10,
		populate: "image,news_tag",
		sort: "orderCode:ASC",
	})
		.then((res) => {
			LeadershipList.value = res.data.data;
		})
		.finally(() => {
			loading.value = false;
		});
};

await getLeadership();
</script>

<template>
	<section>
		<div class="container py-6">
			<div class="flex lg:flex-row flex-col md:gap-10 gap-4 drop-shadow-lg">
				<div class="lg:w-2/3 w-full flex gap-4 flex-col">
					<LeaderShipCard v-for="leadership in LeadershipList" :key="leadership.id" :leadership="leadership" />
				</div>

				<!-- right sidebar -->
				<div class="lg:w-1/3 w-full flex flex-col gap-4">
					<!-- card -->
					<div class="md:h-[12rem] h-full w-full flex bg-primary rounded-2xl relative overflow-hidden">
						<div class="w-1/2 h-full flex flex-col justify-between p-6">
							<div class="text-white text-xl font-bold leading-tight">
								{{ $t("ContractorRating") }}
							</div>
							<div class="flex pt-2">
								<LocLink class="text-white text-base font-normal leading-[18px]" to="/contractor-rating">
									{{ $t("more") }}
								</LocLink>
								<svg xmlns="http://www.w3.org/2000/svg" class="ml-5" width="23" height="17" viewBox="0 0 23 17" fill="none">
									<path
										d="M1.25222 7.12903H18.7153L14.3222 2.34271C13.8321 1.80858 13.8302 0.940548 14.318 0.403882C14.8059 -0.132852 15.5988 -0.134839 16.089 0.399222L22.6321 7.52826C23.1211 8.06239 23.1238 8.93453 22.6334 9.47044L16.0891 16.6008C15.599 17.1348 14.8061 17.1329 14.3182 16.5961C13.8303 16.0595 13.8322 15.1914 14.3224 14.6573L18.7153 9.87097H1.25222C0.560619 9.87097 -1.90735e-06 9.25719 -1.90735e-06 8.5C-1.90735e-06 7.74281 0.560619 7.12903 1.25222 7.12903Z"
										fill="white"
									/>
								</svg>
							</div>
						</div>
						<div class="w-1/2 h-full relative">
							<img :src="SSP_UZB_4" alt="" class="absolute z-10 right-0 h-full bottom-0" />
						</div>
						<div class="w-8/12 md:h-[198px] absolute right-0 bottom-0 flex items-end">
							<Vector class="fill-blue-800" />
						</div>
					</div>

					<!-- links -->
					<AdditionalLinks />

					<!-- reklama -->
					<ReklamaSection :priority="1" layout="vertical" />
				</div>
			</div>
		</div>
	</section>

	<!-- <MainMobileSection /> -->

	<PartnerSection />
</template>
