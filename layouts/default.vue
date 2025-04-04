<template>
	<Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir" prefix="og: http://ogp.me/ns#">
		<Body>
			<div class="bg-neutral-50 relative">
				<client-only>
					<TestAlert />
				</client-only>

				<section class="bg-primary md:p-12 md:pb-0 p-4 flex flex-col relative">
					<div class="md:border border-gray-100 md:border-b-0 md:p-16 md:pb-0 relative">
						<MainHeader />

						<SocialGroup />
						<client-only>
							<ActionGroup />
						</client-only>
					</div>
				</section>

				<MainBreadCrumbs v-if="route.name != 'index___' + locale" />
				<div class="relative z-10 overflow-hidden">
					<div class="max-md:hidden absolute left-0 bottom-[900px] flex items-end justify-start" style="z-index: -1">
						<Vector3 class="fill-zinc-300" />
					</div>
					<div class="max-md:hidden absolute right-0 top-[100vh] flex items-end justify-end" style="z-index: -1">
						<Vector2 class="fill-zinc-300" />
					</div>
					<div class="border-primary md:border-s md:border-r md:mx-12 absolute right-0 top-0 left-0 bottom-0" style="z-index: -1"></div>
					<slot></slot>
				</div>

				<ConnectTelegram />

				<!-- search -->
				<SearchDialog />

				<MainFooter />
			</div>

			<BackToTopBtn />
		</Body>
	</Html>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { initFlowbite } from "flowbite";
import TestAlert from "@/components/shared/TestAlert.vue";
import { useMainSettingStore } from "@/store/MainSetting";
import { useMainMenuStore } from "@/store/MainMenu";
import Vector2 from "@/assets/icons/bg-vector-2.svg?component";
import Vector3 from "@/assets/icons/bg-vector-3.svg?component";
import BackToTopBtn from "~/components/shared/btn/BackToTopBtn.vue";

const MainHeader = defineAsyncComponent(() => import("@/components/layout/MainHeader.vue"));
const MainFooter = defineAsyncComponent(() => import("@/components/layout/MainFooter.vue"));
const SocialGroup = defineAsyncComponent(() => import("@/components/home/SocialGroup.vue"));
const ActionGroup = defineAsyncComponent(() => import("@/components/home/ActionGroup.vue"));
const MainBreadCrumbs = defineAsyncComponent(() => import("@/components/layout/MainBreadCrumbs.vue"));
const ConnectTelegram = defineAsyncComponent(() => import("@/components/shared/ConnectTelegram.vue"));
const SearchDialog = defineAsyncComponent(() => import("@/components/home/SearchDialog.vue"));

const { locale } = useI18n();
const route = useRoute();

const head = useLocaleHead({
	addDirAttribute: true, // Adds dir
	addSeoAttributes: true, // Adds lang
});
const htmlAttrs = computed(() => head.value.htmlAttrs!);

const MainSettingStore = useMainSettingStore();
const MainMenuStore = useMainMenuStore();

await useAsyncData("default", async () => {
	const values = await Promise.all([MainSettingStore.fetchMainSetting(), MainMenuStore.fetchMainMenu()]);

	return { setting: values[0], menu: values[1] };
});

// initialize components based on data attribute selectors
onMounted(() => {
	initFlowbite();
});
</script>
