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
    "lang" TEXT NULL,
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
