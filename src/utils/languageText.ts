import { getTranslations } from "next-intl/server";

export const getIndexLanguageText = async() => {
    const t = await getTranslations('Index')
    return ({
        "title": t('title'),
        "emojiCombo": t('emojiCombo'),
        "slogan": t('slogan'),
        "translator": t('translator'),
        "whichComponent": t('whichComponent'),
        "whichPL": t('whichPL'),
        "exampleInput": t('exampleInput'),
        "cta": t('cta'),
        "reset": t('reset')
    })

}