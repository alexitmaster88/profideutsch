import { LocaleType } from "~/i18n/i18n.config";

export type EventCalendarDto = {
	id: 1;
	date: string;
	title: string;
	beforeEventDescription: string;
	afterEventDescription: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	locale: LocaleType;
	image: {
		url: string;
		[key: string]: string
	}
};