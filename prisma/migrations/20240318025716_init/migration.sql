-- CreateTable
CREATE TABLE "Emoji" (
    "id" SERIAL NOT NULL,
    "codePoint" TEXT NOT NULL,
    "groupName" TEXT,
    "subgroupName" TEXT,
    "qualified" TEXT,
    "emojiChar" TEXT NOT NULL,
    "emojiVersion" TEXT,
    "name" TEXT,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiCombo" (
    "id" SERIAL NOT NULL,
    "comboText" TEXT NOT NULL,
    "emojis" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "interpretation" TEXT,
    "tag1" TEXT,
    "tag2" TEXT,
    "tag3" TEXT,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiComboLog" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "comboText" TEXT NOT NULL,
    "emojis" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "interpretation" TEXT,
    "tag1" TEXT,
    "tag2" TEXT,
    "tag3" TEXT,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiComboLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiMeaning" (
    "id" SERIAL NOT NULL,
    "emojiId" INTEGER NOT NULL,
    "interpretation" TEXT,
    "example1" TEXT,
    "example2" TEXT,
    "example3" TEXT,
    "tag1" TEXT,
    "tag2" TEXT,
    "tag3" TEXT,
    "model" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiTag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "tagType" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiTagRela" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "emojisId" TEXT NOT NULL,
    "tagType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiTagRela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emoji_combo_log" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER,
    "combo_text" VARCHAR(256),
    "emojis" VARCHAR(256),
    "lang" VARCHAR(16),
    "interpretation" TEXT,
    "tag_1" VARCHAR(128),
    "tag_2" VARCHAR(128),
    "tag_3" VARCHAR(128),
    "model" VARCHAR(32),
    "create_time" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emoji_combo_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emoji_data" (
    "id" SERIAL NOT NULL,
    "code_point" VARCHAR(50),
    "emoji_property" VARCHAR(255),
    "emoji_version" VARCHAR(10),
    "count" INTEGER,
    "emoji_char" VARCHAR(10),
    "name" TEXT,

    CONSTRAINT "emoji_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emoji_sequences" (
    "id" SERIAL NOT NULL,
    "code_point" VARCHAR(100),
    "emoji_property" VARCHAR(255),
    "name" TEXT,
    "emoji_version" VARCHAR(10),
    "count" INTEGER,
    "emoji_char" VARCHAR(10),

    CONSTRAINT "emoji_sequences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emoji_test" (
    "id" SERIAL NOT NULL,
    "code_point" VARCHAR(100),
    "group_name" VARCHAR(64),
    "subgroup_name" VARCHAR(64),
    "qualified" VARCHAR(100),
    "emoji_char" VARCHAR(10),
    "emoji_version" VARCHAR(10),
    "name" TEXT,

    CONSTRAINT "emoji_test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emoji_variation_sequences" (
    "id" SERIAL NOT NULL,
    "code_point" VARCHAR(50),
    "style" VARCHAR(16),
    "emoji_version" VARCHAR(8),
    "description" VARCHAR(64),

    CONSTRAINT "emoji_variation_sequences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_codePoint_key" ON "Emoji"("codePoint");

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_emojiChar_key" ON "Emoji"("emojiChar");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiCombo_comboText_key" ON "EmojiCombo"("comboText");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiMeaning_emojiId_key" ON "EmojiMeaning"("emojiId");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiTag_tagName_key" ON "EmojiTag"("tagName");

-- CreateIndex
CREATE INDEX "index_col_code" ON "emoji_test"("code_point");

-- AddForeignKey
ALTER TABLE "EmojiMeaning" ADD CONSTRAINT "EmojiMeaning_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmojiTagRela" ADD CONSTRAINT "EmojiTagRela_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "EmojiTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
