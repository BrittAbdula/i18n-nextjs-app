import { prisma } from "@/prisma";

async function reflashEmojiCombo(nMinutes: number){
    const nMinuteAgo = new Date(new Date().getTime() - 60 * 1000 * nMinutes);
    const result = await prisma.$executeRaw`insert into "EmojiCombo"("comboText", emojis, lang, interpretation, tag1, tag2, tag3, model, "comboURL", "createdAt")
  SELECT
    "comboText",
    emojis,
    lang,
    interpretation,
    tag1,
    tag2,
    tag3,
    model,
    "comboURL",
    now()
  FROM (
    SELECT
      "comboText",
      emojis,
      lang,
      interpretation,
      tag1,
      tag2,
      tag3,
      model,
      REGEXP_REPLACE(LOWER(TRIM("comboText")), '[\\s[:punct:]]+', '-', 'g') AS "comboURL",
      "createdAt",
      ROW_NUMBER() OVER (
        PARTITION BY REGEXP_REPLACE(LOWER(TRIM("comboText")), '[\\s[:punct:]]+', '-', 'g')
        ORDER BY "createdAt" DESC
      ) AS rn
    FROM "EmojiComboLog" where "createdAt" > ${nMinuteAgo}
  ) AS EmojiRanking
  WHERE rn = 1
  ON CONFLICT DO NOTHING`;

  console.log(`The SQL statement affected ${result} rows`);
}

export default reflashEmojiCombo;