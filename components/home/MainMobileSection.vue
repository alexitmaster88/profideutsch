<template>
	<section class="container md:py-24 py-6">
		<div class="bg-primary rounded-3xl flex flex-col-reverse md:flex-row md:justify-around items-center p-6 md:h-[18.875rem]">
			<div class="flex flex-col gap-6 md:w-1/2 w-full max-w-96 max-md:mt-8" v-motion-slide-visible-once-left >
				<div class="text-white text-title">{{ $t("mobile_app") }}</div>
				<div class="text-white text-sm font-regular md:leading-[1.125rem]">
					{{ $t("mobile_app_text") }}
				</div>
				<div class="flex gap-4">
					<PlayMarket />
					<AppStore />
				</div>
			</div>

			<div class="relative max-md:order-1 md:w-1/2 w-full" v-motion-slide-visible-once-right>
				<img
					:src="mobileGroupbg"
					alt="Ssp mobile app"
					class="md:absolute mx-auto top-0 bottom-0 right-0 left-0 md:h-[29.235rem] md:w-[29.2325rem] w-[18.495rem] h-[18.4969rem] md:-top-[15rem]"
				/>
				<img
					:src="mobileGroup"
					alt="Ssp mobile app"
					class="absolute mx-auto md:mt-0 bottom-0 right-0 left-0 md:h-[29rem] md:w-[23.625rem] h-[18.375rem] w-[14.9375rem] md:-top-[14.375rem]"
				/>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import PlayMarket from "@/components/shared/mobileStore/PlayMarket.vue";
import AppStore from "@/components/shared/mobileStore/AppStore.vue";

import mobileGroup from "@/assets/images/home/mobile-group.png";
import mobileGroupbg from "@/assets/images/home/mobile-bg-vector.svg";
</script>
