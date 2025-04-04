<template>
	<div class="flex xl:h-[37.6875rem] md:h-[28.125rem] sm:h-[25rem] h-[15rem]">
		<div class="lg:w-9/12 md:w-full w-full rounded-xl overflow-hidden">
			<swiper
				:lazyPreloadPrevNext="1"
				:spaceBetween="30"
				:slidesPerView="1"
				:centeredSlides="true"
				:autoplay="{
					delay: 3000,
					disableOnInteraction: false,
				}"
				effect="fade"
				:fadeEffect="{
					crossFade: true,
				}"
				:modules="modules"
				class="w-full h-full relative"
				:pagination="pagination"
				@activeIndexChange="activeIndexChange"
			>
				<swiper-slide
					:lazy="true"
					:key="news.id + 'slide'"
					v-for="news in swiperList"
					class="md:h-[37.6875rem] h-[30rem] rounded-xl relative overflow-hidden cursor-pointer"
				>
					<LocLink :to="'/news/' + news.id">
						<div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-200">
							<client-only>
								<nuxt-img :src="news.image?.url" provider="strapi" loading="lazy" class="bg-contain object-cover w-full h-full swiper-lazy" />
							</client-only>
						</div>
						<div
							class="absolute bottom-0 md:py-12 pt-16 md:px-12 p-6 left-0 right-0 flex gap-6 justify-between bg-gradient-to-t from-slate-800 bg-transparent"
						>
							<span class="text-white md:text-3xl text-lg font-normal">
								{{ news.title }}
							</span>
							<div class="flex flex-col justify-center items-center">
								<div class="text-white md:text-6xl text-3xl font-semibold">
									{{ new Date(news.publishDate || "").getDate() }}
								</div>
								<div class="text-white text-base font-normal">
									{{ months[new Date(news.publishDate || "").getMonth()] }}
								</div>
								<div class="text-white md:text-4xl text-xl font-normal">
									{{ new Date(news.publishDate || "").getFullYear() }}
								</div>
							</div>
						</div>
						<div class="swiper-lazy-preloader"></div>
					</LocLink>
				</swiper-slide>

				<div class="swiper-pagination md:mb-8 mb-2 md:px-12 px-6 absolute bottom-0"></div>
			</swiper>
		</div>
		<div class="lg:w-3/12 lg:block hidden hide-scroll-bar overflow-auto">
			<LocLink
				v-for="(news, index) in data?.news"
				:to="'/news/' + news.id"
				class="h-[9.3125rem] block mb-2 rounded-tr-lg relative rounded-br-lg hover:bg-blue-950 cursor-pointer duration-300"
				:class="{ 'bg-blue-950': activeIndex == index }"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="282" height="123" viewBox="0 0 282 123" fill="none" class="absolute right-4 top-4">
					<path
						d="M126.577 3.65363C126.577 5.12639 127.771 6.3203 129.244 6.3203C130.716 6.3203 131.91 5.12639 131.91 3.65363C131.91 2.18087 130.716 0.986966 129.244 0.986966C127.771 0.986966 126.577 2.18087 126.577 3.65363ZM281 3.65363H281.5V3.15363H281V3.65363ZM281 119.497V119.997H281.5V119.497H281ZM0.333333 119.497C0.333333 120.97 1.52724 122.164 3 122.164C4.47276 122.164 5.66667 120.97 5.66667 119.497C5.66667 118.024 4.47276 116.831 3 116.831C1.52724 116.831 0.333333 118.024 0.333333 119.497ZM3 119.997H3.99286V118.997H3V119.997ZM5.97857 119.997H7.96429V118.997H5.97857V119.997ZM9.95 119.997H11.9357V118.997H9.95V119.997ZM13.9214 119.997H15.9071V118.997H13.9214V119.997ZM17.8929 119.997H19.8786V118.997H17.8929V119.997ZM21.8643 119.997H23.85V118.997H21.8643V119.997ZM25.8357 119.997H27.8214V118.997H25.8357V119.997ZM29.8071 119.997H31.7929V118.997H29.8071V119.997ZM33.7786 119.997H35.7643V118.997H33.7786V119.997ZM37.75 119.997H39.7357V118.997H37.75V119.997ZM41.7214 119.997H43.7071V118.997H41.7214V119.997ZM45.6929 119.997H47.6786V118.997H45.6929V119.997ZM49.6643 119.997H51.65V118.997H49.6643V119.997ZM53.6357 119.997H55.6214V118.997H53.6357V119.997ZM57.6071 119.997H59.5929V118.997H57.6071V119.997ZM61.5786 119.997H63.5643V118.997H61.5786V119.997ZM65.55 119.997H67.5357V118.997H65.55V119.997ZM69.5214 119.997H71.5071V118.997H69.5214V119.997ZM73.4929 119.997H75.4786V118.997H73.4929V119.997ZM77.4643 119.997H79.45V118.997H77.4643V119.997ZM81.4357 119.997H83.4214V118.997H81.4357V119.997ZM85.4072 119.997H87.3929V118.997H85.4072V119.997ZM89.3786 119.997H91.3643V118.997H89.3786V119.997ZM93.35 119.997H95.3358V118.997H93.35V119.997ZM97.3215 119.997H99.3072V118.997H97.3215V119.997ZM101.293 119.997H103.279V118.997H101.293V119.997ZM105.264 119.997H107.25V118.997H105.264V119.997ZM109.236 119.997H111.221V118.997H109.236V119.997ZM113.207 119.997H115.193V118.997H113.207V119.997ZM117.179 119.997H119.164V118.997H117.179V119.997ZM121.15 119.997H123.136V118.997H121.15V119.997ZM125.122 119.997H127.107V118.997H125.122V119.997ZM129.093 119.997H131.079V118.997H129.093V119.997ZM133.064 119.997H135.05V118.997H133.064V119.997ZM137.036 119.997H139.022V118.997H137.036V119.997ZM141.007 119.997H142.993V118.997H141.007V119.997ZM144.979 119.997H146.964V118.997H144.979V119.997ZM148.95 119.997H150.936V118.997H148.95V119.997ZM152.922 119.997H154.907V118.997H152.922V119.997ZM156.893 119.997H158.879V118.997H156.893V119.997ZM160.864 119.997H162.85V118.997H160.864V119.997ZM164.836 119.997H166.822V118.997H164.836V119.997ZM168.807 119.997H170.793V118.997H168.807V119.997ZM172.779 119.997H174.764V118.997H172.779V119.997ZM176.75 119.997H178.736V118.997H176.75V119.997ZM180.722 119.997H182.707V118.997H180.722V119.997ZM184.693 119.997H186.679V118.997H184.693V119.997ZM188.664 119.997H190.65V118.997H188.664V119.997ZM192.636 119.997H194.622V118.997H192.636V119.997ZM196.607 119.997H198.593V118.997H196.607V119.997ZM200.579 119.997H202.565V118.997H200.579V119.997ZM204.55 119.997H206.536V118.997H204.55V119.997ZM208.522 119.997H210.507V118.997H208.522V119.997ZM212.493 119.997H214.479V118.997H212.493V119.997ZM216.465 119.997H218.45V118.997H216.465V119.997ZM220.436 119.997H222.422V118.997H220.436V119.997ZM224.407 119.997H226.393V118.997H224.407V119.997ZM228.379 119.997H230.365V118.997H228.379V119.997ZM232.35 119.997H234.336V118.997H232.35V119.997ZM236.322 119.997H238.307V118.997H236.322V119.997ZM240.293 119.997H242.279V118.997H240.293V119.997ZM244.265 119.997H246.25V118.997H244.265V119.997ZM248.236 119.997H250.222V118.997H248.236V119.997ZM252.207 119.997H254.193V118.997H252.207V119.997ZM256.179 119.997H258.165V118.997H256.179V119.997ZM260.15 119.997H262.136V118.997H260.15V119.997ZM264.122 119.997H266.107V118.997H264.122V119.997ZM268.093 119.997H270.079V118.997H268.093V119.997ZM272.065 119.997H274.05V118.997H272.065V119.997ZM276.036 119.997H278.022V118.997H276.036V119.997ZM280.008 119.997H281V118.997H280.008V119.997ZM281.5 119.497V118.499H280.5V119.497H281.5ZM281.5 116.501V114.504H280.5V116.501H281.5ZM281.5 112.507V110.509H280.5V112.507H281.5ZM281.5 108.512V106.515H280.5V108.512H281.5ZM281.5 104.517V102.52H280.5V104.517H281.5ZM281.5 100.523V98.5255H280.5V100.523H281.5ZM281.5 96.5282V94.5309H280.5V96.5282H281.5ZM281.5 92.5336V90.5363H280.5V92.5336H281.5ZM281.5 88.539V86.5417H280.5V88.539H281.5ZM281.5 84.5444V82.5471H280.5V84.5444H281.5ZM281.5 80.5498V78.5525H280.5V80.5498H281.5ZM281.5 76.5552V74.5579H280.5V76.5552H281.5ZM281.5 72.5606V70.5633H280.5V72.5606H281.5ZM281.5 68.566V66.5687H280.5V68.566H281.5ZM281.5 64.5714V62.5741H280.5V64.5714H281.5ZM281.5 60.5768V58.5795H280.5V60.5768H281.5ZM281.5 56.5822V54.5849H280.5V56.5822H281.5ZM281.5 52.5876V50.5903H280.5V52.5876H281.5ZM281.5 48.593V46.5957H280.5V48.593H281.5ZM281.5 44.5984V42.6011H280.5V44.5984H281.5ZM281.5 40.6038V38.6065H280.5V40.6038H281.5ZM281.5 36.6092V34.6119H280.5V36.6092H281.5ZM281.5 32.6146V30.6173H280.5V32.6146H281.5ZM281.5 28.62V26.6227H280.5V28.62H281.5ZM281.5 24.6254V22.6281H280.5V24.6254H281.5ZM281.5 20.6308V18.6335H280.5V20.6308H281.5ZM281.5 16.6362V14.6389H280.5V16.6362H281.5ZM281.5 12.6416V10.6443H280.5V12.6416H281.5ZM281.5 8.64697V6.64967H280.5V8.64697H281.5ZM281.5 4.65237V3.65363H280.5V4.65237H281.5ZM281 3.15363H280.002V4.15363H281V3.15363ZM278.005 3.15363H276.008V4.15363H278.005V3.15363ZM274.011 3.15363H272.014V4.15363H274.011V3.15363ZM270.018 3.15363H268.021V4.15363H270.018V3.15363ZM266.024 3.15363H264.027V4.15363H266.024V3.15363ZM262.03 3.15363H260.034V4.15363H262.03V3.15363ZM258.037 3.15363H256.04V4.15363H258.037V3.15363ZM254.043 3.15363H252.046V4.15363H254.043V3.15363ZM250.05 3.15363H248.053V4.15363H250.05V3.15363ZM246.056 3.15363H244.059V4.15363H246.056V3.15363ZM242.063 3.15363H240.066V4.15363H242.063V3.15363ZM238.069 3.15363H236.072V4.15363H238.069V3.15363ZM234.075 3.15363H232.079V4.15363H234.075V3.15363ZM230.082 3.15363H228.085V4.15363H230.082V3.15363ZM226.088 3.15363H224.091V4.15363H226.088V3.15363ZM222.095 3.15363H220.098V4.15363H222.095V3.15363ZM218.101 3.15363H216.104V4.15363H218.101V3.15363ZM214.107 3.15363H212.111V4.15363H214.107V3.15363ZM210.114 3.15363H208.117V4.15363H210.114V3.15363ZM206.12 3.15363H204.123V4.15363H206.12V3.15363ZM202.127 3.15363H200.13V4.15363H202.127V3.15363ZM198.133 3.15363H196.136V4.15363H198.133V3.15363ZM194.139 3.15363H192.143V4.15363H194.139V3.15363ZM190.146 3.15363H188.149V4.15363H190.146V3.15363ZM186.152 3.15363H184.155V4.15363H186.152V3.15363ZM182.159 3.15363H180.162V4.15363H182.159V3.15363ZM178.165 3.15363H176.168V4.15363H178.165V3.15363ZM174.171 3.15363H172.175V4.15363H174.171V3.15363ZM170.178 3.15363H168.181V4.15363H170.178V3.15363ZM166.184 3.15363H164.187V4.15363H166.184V3.15363ZM162.191 3.15363H160.194V4.15363H162.191V3.15363ZM158.197 3.15363H156.2V4.15363H158.197V3.15363ZM154.204 3.15363H152.207V4.15363H154.204V3.15363ZM150.21 3.15363H148.213V4.15363H150.21V3.15363ZM146.216 3.15363H144.22V4.15363H146.216V3.15363ZM142.223 3.15363H140.226V4.15363H142.223V3.15363ZM138.229 3.15363H136.232V4.15363H138.229V3.15363ZM134.236 3.15363H132.239V4.15363H134.236V3.15363ZM130.242 3.15363H129.244V4.15363H130.242V3.15363Z"
						fill="white"
					/>
				</svg>

				<div class="absolute top-2 left-10 right-10 bottom-0 flex flex-col">
					<div class="text-white text-lg font-normal">
						{{ formatDate(news.publishDate, "dd.MM.yyyy") }}
					</div>
					<div class="max-w-[20rem] h-[4.4244rem] text-white text-lg font-semibold leading-snug line-clamp-4">
						{{ news.title }}
					</div>
				</div>
			</LocLink>
		</div>
	</div>

	<!-- card -->
	<div class="flex mt-6 flex-wrap">
		<LocLink
			v-for="(item, i) in data?.links"
			:key="i"
			:to="item.link"
			class="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full flex items-center gap-6 p-4 rounded-lg duration-200 hover:bg-primary-800"
		>
			<div class="bg-primary-800 rounded-md w-20 h-20 flex justify-center items-center">
				<nuxt-img provider="strapi" :src="item.image?.url" loading="lazy" />
			</div>
			<div class="w-[14.25rem] text-white text-lg font-normal" v-html="item.title"></div>
		</LocLink>

		<!-- <div class="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full flex items-center gap-6 p-4">
			<div class="bg-primary-800 rounded-md w-full flex justify-around hover:bg-primary-700 duration-200 cursor-pointer items-center h-16">
				<div class="text-cyan-300">Barcha interaktiv xizmatlar</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
						<path
							d="M10.412 9.01972L1.67614 0.286765C1.29282 -0.0955914 0.671774 -0.0955915 0.287482 0.286765C-0.0958417 0.66912 -0.0958417 1.29017 0.287482 1.67252L8.33042 9.71256L0.288449 17.7526C-0.0948743 18.1349 -0.0948743 18.756 0.288449 19.1393C0.671773 19.5217 1.29379 19.5217 1.67711 19.1393L10.413 10.4064C10.7904 10.028 10.7904 9.39724 10.412 9.01972Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NewsService from "@/services/news";
import AdditionalLinkService from "@/services/additionalLinks";
import { API_URL } from "@/services/base";
import { format, isValid } from "date-fns";
import { ru } from "date-fns/locale";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { type PaginationOptions, type Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { useI18n } from "vue-i18n";
import LocLink from "../shared/LocLink.vue";

const { t } = useI18n();

const months = [
	t("Yanvar"),
	t("Fevral"),
	t("Mart"),
	t("Aprel"),
	t("May"),
	t("Iyun"),
	t("Iyul"),
	t("August"),
	t("Sentabr"),
	t("Oktabr"),
	t("Noyabr"),
	t("Dekabr"),
];

const modules = [Autoplay, Pagination, EffectFade];

const pagination: PaginationOptions = {
	clickable: true,
	el: ".swiper-pagination",
	type: "bullets",
	modifierClass: "swiper-pagination-custom",
	bulletClass: "swiper-pagination-custom-bullet",
	bulletActiveClass: "swiper-pagination-custom-bullet-active",
	renderBullet: function (_index, className) {
		return '<span class="' + className + '">' + "<i></i>" + "<b></b>" + "</span>";
	},
};

const activeIndex = useState("activeIndex", () => 0);

const getNews = async () => {
	try {
		const res = await NewsService.GetList({
			"pagination[page]": 1,
			"pagination[pageSize]": 4,
			populate: "*",
			// "filters[news_tag][name][$eq]": "cci_news",
		});
		return res.data.data;
	} catch (error) {
		console.error("Error fetching news:", error);
	}
};

const getAdditionalLinks = async () => {
	try {
		const res = await AdditionalLinkService.GetList({
			"pagination[page]": 1,
			"pagination[pageSize]": 15,
			populate: "*",
		});

		return res.data.data;
	} catch (error) {
		console.error("Error fetching additional links:", error);
	}
};

const formatDate = computed(() => {
	return (date: string, f = "dd MMM  yyyy") => (isValid(new Date(date)) ? format(new Date(date), f, { locale: ru }) : "");
});

const { data } = await useAsyncData("MainSectionData", async () => {
	const values = await Promise.all([getAdditionalLinks(), getNews()]);

	return { links: values[0], news: values[1] };
});

const swiperList = computed(() => data.value?.news?.slice(0, 10));

const activeIndexChange = (e: SwiperType) => {
	activeIndex.value = e.activeIndex;
};
</script>

<style>
.hide-scroll-bar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
	display: none;
}

.swiper-pagination-custom {
	text-align: left;
}

.swiper-pagination-custom-bullet {
	white-space: nowrap;
	left: 0;
	position: relative;
	display: inline-block;
	@apply md:w-[5rem] w-[3.8rem];
	margin-right: 0.5rem;
	height: 0.375rem;
	border-radius: 0.5rem;
	opacity: 1;
	background-color: transparent;
	overflow: hidden;
	i {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 0.625rem;
		background-color: rgba(255, 255, 255, 0.2);
	}
	b {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		width: 0%;
		height: 0.625rem;
		background-color: white;
	}
}
.swiper-pagination-custom-bullet-active {
	background-color: transparent;
	b {
		animation-name: countingBar;
		animation-duration: 3s;
		animation-timing-function: ease-in;
		animation-iteration-count: 1;
		animation-direction: alternate;
		animation-fill-mode: forwards;
	}
}

@keyframes countingBar {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
</style>
