--- 最近使用日志
select * from "EmojiComboLog" order by "createdAt" desc limit 5；

-- 初始化 EmojiCombo 表
truncate "EmojiCombo";
insert into "EmojiCombo"("comboText",emojis,lang,interpretation,tag1,tag2,tag3,model,"comboURL",createdAt")
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
        REGEXP_REPLACE(LOWER(TRIM("comboText")), '\s+', '-', 'g') AS "comboURL",
        "createdAt",
        ROW_NUMBER() OVER (
            PARTITION BY "comboText"
            ORDER BY "createdAt" DESC
        ) AS rn
    FROM "EmojiComboLog"
) AS EmojiRanking
WHERE rn = 1;

-- 初始化 EmojiTag 表
truancate table "EmojiTag";
insert into "EmojiTag"("tagName","tagType","createdAt")
select distinct tag as "tagName", '2', now()
from (
    select "tag1" as tag, lang from "EmojiCombo" where "tag1" is not null
    union all
    select "tag2" as tag, lang from "EmojiCombo" where "tag2" is not null
    union all
    select "tag3" as tag, lang from "EmojiCombo" where "tag3" is not null
) as tags;
