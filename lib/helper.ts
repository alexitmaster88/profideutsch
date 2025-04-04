export const getColorsWithBg = (i: number) => {
    if (i % 5 == 0) {
        return "bg-blue-100 text-blue-900";
    } else if (i % 5 == 1) {
        return "bg-sky-200 text-slate-500";
    } else if (i % 5 == 2) {
        return "bg-purple-200 text-gray-500";
    } else if (i % 5 == 3) {
        return "bg-orange-100 text-stone-500";
    } else if (i % 5 == 4) {
        return "bg-emerald-100 text-neutral-500";
    }

    return "bg-blue-100 text-blue-900";
}

export const parseNumber = (value: number = 0) => {
    return Intl.NumberFormat(undefined, {}).format(value);
};