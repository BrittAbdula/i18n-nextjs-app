--- 最近使用日志
select * from "EmojiComboLog" order by "createdAt" desc limit 5；

-- 初始化 EmojiCombo 表
truncate "EmojiCombo";
insert into "EmojiCombo"("comboText",emojis,lang,interpretation,tag1,tag2,tag3,model,"createdAt")
SELECT
    "comboText",
    emojis,
    lang,
    interpretation,
    tag1,
    tag2,
    tag3,
    model,
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
        "createdAt",
        ROW_NUMBER() OVER (
            PARTITION BY "comboText"
            ORDER BY "createdAt" DESC
        ) AS rn
    FROM "EmojiComboLog"
) AS EmojiRanking
WHERE rn = 1;