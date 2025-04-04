<template>
	<div>
		<section class="bg-primary h-full md:p-12 md:pt-0 p-4 flex flex-col relative overflow-hidden">
			<div v-if="smAndLarger" class="overflow-hidden h-screen absolute right-0 top-0 bottom-0 left-0 z-0">
				<video id="background-video" autoplay loop muted>
					<source :src="videoSrc" type="video/mp4" />
				</video>
			</div>
			<div class="md:border border-gray-100 md:border-t-0 md:p-16 md:pt-0 relative">
				<LazyHomeMainSection />
			</div>
		</section>

		<!-- news -->
		<LazyHomeMainNewsSection tag="cci_news" allLabel="all_cci_news" />

		<!-- reklama -->
		<!-- <ReklamaSection :priority="1" /> -->

		<!-- tadbirlar -->
		<LazyHomeMainEventSection />

		<!-- reklama -->
		<!-- <ReklamaSection :priority="2" /> -->

		<!-- news -->
		<LazyHomeMainNewsSection tag="announcements" allLabel="all_announcements" />

		<!-- videogallery -->
		<LazyHomeVideoSection />

		<!-- <MainSrvSection /> -->

		<LazyHomeMapSection />

		<!-- <MainMobileSection /> -->

		<LazyHomePartnerSection />
	</div>
</template>

<script setup lang="ts">
import videoSrc from "@/assets/video/loader-video.mp4";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

definePageMeta({
	middleware: "locale",
});

const breakpoints = useBreakpoints(breakpointsTailwind);

const smAndLarger = breakpoints.greaterOrEqual("sm");
</script>

<style scoped>
#background-video {
	transform: rotate(225deg);
	width: 55rem;
	height: 55rem;
	object-fit: cover;
	position: absolute;
	right: -150px;
	top: -20px;
	bottom: 0;
}
</style>
