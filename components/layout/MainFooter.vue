<template>
	<footer class="bg-primary md:py-10 py-6 relative overflow-hidden">
		<div class="overflow-hidden absolute right-0 top-12 bottom-0 left-0 z-0">
			<video id="background-video-footer" autoplay loop muted class="rotate-45 h-[150%] ml-auto">
				<source :src="videoSrc" type="video/mp4" />
			</video>
		</div>
		<div class="container relative">
			<div class="md:flex justify-between">
				<LocLink to="/">
					<nuxt-img provider="strapi" loading="lazy" :src="MainSetting.logo?.url" class="max-md:mb-8 h-16 object-contain" />
				</LocLink>
				<div class="flex flex-wrap items-center md:gap-10 gap-6">
					<div>
						<h1 class="text-white font-semibold md:text-4xl text-2xl">
							<div v-if="loadings.AppealApplication" class="h-4 animate-pulse bg-gray-300 rounded-full w-14 mb-2.5"></div>
							<span v-else>{{ parseNumber(counts.AppealApplication) }}</span>
						</h1>
						<h5 class="md:text-base text-[0.6994rem] text-white">{{ $t("appeals") }}</h5>
					</div>
					<div>
						<h1 class="text-white font-semibold md:text-4xl text-2xl">
							<div v-if="loadings.CallCenterIntegration" class="h-4 animate-pulse bg-gray-300 rounded-full w-14 mb-2.5"></div>
							<span v-else>{{ parseNumber(counts.CallCenterIntegration) }}</span>
						</h1>
						<h5 class="md:text-base text-[0.6994rem] text-white">{{ $t("calls") }}</h5>
					</div>
					<div>
						<h1 class="text-white font-semibold md:text-4xl text-2xl">
							<div v-if="loadings.MemshipCertificate" class="h-4 animate-pulse bg-gray-300 rounded-full w-14 mb-2.5"></div>
							<span v-else>{{ parseNumber(counts.MemshipCertificate) }}</span>
						</h1>
						<h5 class="md:text-base text-[0.6994rem] text-white">{{ $t("companies") }}</h5>
					</div>
					<div>
						<h1 class="text-cyan-300 font-semibold md:text-4xl text-2xl">
							<ClientOnly>
								<HomeOnlineUserCount />
							</ClientOnly>
						</h1>
						<h5 class="md:text-base text-[0.6994rem] text-white">{{ $t("online") }}</h5>
					</div>
				</div>
			</div>

			<div class="flex flex-col md:flex-row flex-wrap md:mt-8 mt-4 justify-between">
				<!-- contact -->
				<div class="flex-col mt-8 justify-start items-start gap-6 inline-flex">
					<div>
						<div class="justify-start items-center gap-6 inline-flex">
							<div class="w-8 h-8 relative">
								<img :src="map" alt="address" />
							</div>
							<div class="text-white text-xl font-semibold">
								{{ $t("address") }}
							</div>
						</div>
						<div class="text-white text-base font-medium leading-normal max-w-96">
							{{ MainSetting.address }}
						</div>
					</div>
					<div>
						<div class="justify-start items-center gap-6 inline-flex">
							<div class="w-8 h-8 relative">
								<img :src="phone" alt="phone" />
							</div>
							<div class="text-white text-xl font-semibold">
								{{ $t("phone") }}
							</div>
						</div>
						<div class="text-white text-base font-medium leading-normal">
							{{ $t("footer.yagona_raqam") }}: {{ MainSetting.phone }}<br />{{ $t("footer.ishonch_telefoni") }}: {{ MainSetting.shortPhone }}
						</div>
					</div>
					<div>
						<div class="justify-start items-center gap-6 inline-flex">
							<div class="w-8 h-8 relative">
								<img :src="email" alt="email" />
							</div>
							<div class="text-white text-xl font-semibold">
								{{ $t("email") }}
							</div>
						</div>
						<div class="text-white text-base font-medium leading-normal">
							{{ MainSetting.email }}
						</div>
					</div>
				</div>

				<!-- links -->
				<div class="mt-8">
					<div class="text-white text-xl font-semibold">
						{{ $t("foydali_link") }}
					</div>

					<ul v-for="(footer, index) in FooterList" :key="index">
						<li v-if="footer.section">
							<button
								type="button"
								class="flex items-center text-white w-full text-base transition duration-150 rounded-lg group hover:text-gray-300"
								aria-controls="pastgi-malumot"
								data-collapse-toggle="pastgi-malumot"
							>
								<CaretDown class="rotate-180 w-6" />
								<span class="flex-1 ms-2 text-left rtl:text-right whitespace-nowrap">{{ footer.title }}</span>
							</button>
							<ul id="pastgi-malumot" class="hidden py-2 ps-12 space-y-2 list-disc">
								<li v-for="(footerItem, indexItem) in footer.section.children" :key="indexItem">
									<LocLink :to="footerItem.url" class="text-white duration-150 hover:text-gray-300">
										{{ footerItem.title }}
									</LocLink>
								</li>
							</ul>
						</li>
						<li v-else class="p-2 ps-8">
							<LocLink :to="footer.url" class="text-white duration-150 hover:text-gray-300">
								{{ footer.title }}
							</LocLink>
						</li>
					</ul>

					<div class="text-white text-xl font-semibold mt-12 mb-6 capitalize">{{ $t("footer.download_app") }}:</div>
					<div class="flex gap-4 w-full">
						<PlayMarket />
						<AppStore />
					</div>
				</div>

				<div class="mt-8">
					<!-- appeal -->
					<div class="text-white text-xl font-semibold mb-6">
						{{ $t("footer.appeal") }}
					</div>
					<div class="flex flex-col gap-4">
						<template v-for="appeal in appeals" :key="appeal.link">
							<LocLink
								:to="appeal.link"
								class="h-[3.25rem] p-3.5 rounded-md border cursor-pointer border-stone-300 hover:bg-cyan-400 hover:font-bold transition-all duration-300 ease-out justify-start items-center gap-3.5 inline-flex"
							>
								<div class="w-6 h-6 relative">
									<img :src="appeal.icon" :alt="appeal.label" />
								</div>
								<div class="text-white text-base font-medium leading-normal tracking-wide">
									{{ appeal.label }}
								</div>
							</LocLink>
						</template>
					</div>

					<!-- social -->
					<div class="text-white text-xl font-semibold mt-8 mb-6 leading-normal tracking-wide">
						{{ $t("footer.ijtimoiy_tarmoqlarda") }}
					</div>
					<div class="flex justify-between gap-4">
						<NuxtLink :to="el.link" v-for="el in socials" external target="_blank">
							<CircleIcon>
								<component :is="el.image" class="fill-white" />
							</CircleIcon>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainSettingStore } from "@/store/MainSetting";

import PlayMarket from "@/components/shared/mobileStore/PlayMarket.vue";
import AppStore from "@/components/shared/mobileStore/AppStore.vue";
import CircleIcon from "@/components/shared/CircleIcon.vue";
import CaretDown from "@/assets/icons/CaretDown.svg?component";
import facebook from "@/assets/icons/social/facebook.svg?component";
import instagram from "@/assets/icons/social/instagram.svg?component";
import telegram from "@/assets/icons/social/telegram.svg?component";
import rss from "@/assets/icons/social/rss.svg?component";
import { ref } from "vue";
import bag from "@/assets/icons/bag.svg";
import user from "@/assets/icons/user/user.svg";
import userGroup from "@/assets/icons/user/user-group.svg";
import FooterService from "@/services/footer";
import GetCountService from "@/services/erp/getCount";

import email from "@/assets/icons/email.svg";
import map from "@/assets/icons/map.svg";
import phone from "@/assets/icons/phone.svg";
import { useI18n } from "vue-i18n";
import LocLink from "../shared/LocLink.vue";
import videoSrc from "@/assets/video/loader-video.mp4";
import { parseNumber } from "~/lib/helper";

const { t } = useI18n();
const MainStore = useMainSettingStore();
const { MainSetting } = storeToRefs(MainStore);

const socials = [
	{
		id: "facebook",
		link: MainSetting.value.facebook,
		image: facebook,
	},
	{
		id: "instagram",
		link: MainSetting.value.instagram,
		image: instagram,
	},
	{
		id: "telegram",
		link: MainSetting.value.telegram,
		image: telegram,
	},
	{
		id: "rss",
		link: "/rss",
		image: rss,
	},
];
const FooterList = ref<any[]>([]);
const appeals = [
	{
		link: "https://my.chamber.uz",
		icon: userGroup,
		label: t("yuridik"),
	},
	{
		link: "/appeal/0",
		icon: user,
		label: t("jismoniy"),
	},
	{
		link: "https://fast.upay.uz/",
		icon: bag,
		label: t("footer.memship_pay"),
	},
];

const counts = ref({
	CallCenterIntegration: 0,
	AppealApplication: 0,
	MemshipCertificate: 0,
});

const loadings = ref({
	CallCenterIntegration: false,
	AppealApplication: false,
	MemshipCertificate: false,
});

const getFooter = () => {
	FooterService.GetList({
		populate: {
			0: "FooterMenuItems",
			1: "FooterMenuItems.section",
			2: "FooterMenuItems.section.children",
		},
	}).then((res) => {
		FooterList.value = res.data.data.FooterMenuItems;
	});
};

const getCount = () => {
	loadings.value.CallCenterIntegration = true;
	loadings.value.AppealApplication = true;
	loadings.value.MemshipCertificate = true;

	GetCountService.CallCenterIntegration()
		.then((res) => {
			counts.value.CallCenterIntegration = res.data;
		})
		.finally(() => {
			loadings.value.CallCenterIntegration = false;
		});
	GetCountService.AppealApplication()
		.then((res) => {
			counts.value.AppealApplication = res.data;
		})
		.finally(() => {
			loadings.value.AppealApplication = false;
		});
	GetCountService.MemshipCertificate()
		.then((res) => {
			counts.value.MemshipCertificate = res.data;
		})
		.finally(() => {
			loadings.value.MemshipCertificate = false;
		});
};

try {
	getFooter();
	getCount();
} catch (e) {
	console.log(e, "err");
}
</script>
