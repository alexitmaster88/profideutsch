
export type LocaleType = 'uz' | 'ru' | 'en'

export const SUPPORT_LOCALES: LocaleType[] = ['uz', 'ru', 'en']

export const DEFAULT_LOCALE: LocaleType = 'uz';

export const LOCALE: LocaleType = DEFAULT_LOCALE;

export default defineI18nConfig(() => ({
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    datetimeFormats: {
        en: {
            long: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        },
        ru: {
            long: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        },
        uz: {
            long: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        }
    },
    numberFormats: {
        en: {
            currency: {
                style: 'currency',
                currency: 'USD'
            }
        },
        ru: {
            currency: {
                style: 'currency',
                currency: 'RUB'
            }
        },
        uz: {
            currency: {
                style: 'currency',
                currency: 'UZS',
                currencyDisplay: 'symbol'
            }
        }
    }
})
)
