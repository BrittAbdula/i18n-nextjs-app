-- CreateTable
CREATE TABLE "Emoji" (
    "id" SERIAL NOT NULL,
    "codePoint" VARCHAR(100),
    "groupName" VARCHAR(64),
    "subgroupName" VARCHAR(64),
    "qualified" VARCHAR(100),
    "emojiChar" VARCHAR(10),
    "emojiVersion" VARCHAR(10),
    "name" TEXT,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiMeaning" (
    "id" SERIAL NOT NULL,
    "emojiId" INTEGER,
    "interpretation" TEXT,
    "example1" VARCHAR(255),
    "example2" VARCHAR(255),
    "example3" VARCHAR(255),
    "tag1" VARCHAR(128),
    "tag2" VARCHAR(128),
    "tag3" VARCHAR(128),
    "model" VARCHAR(32),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiMeaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiComboLog" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER,
    "comboText" VARCHAR(255),
    "emojis" VARCHAR(255),
    "lang" VARCHAR(16),
    "interpretation" TEXT,
    "tag1" VARCHAR(128),
    "tag2" VARCHAR(128),
    "tag3" VARCHAR(128),
    "model" VARCHAR(32),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiComboLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiCombo" (
    "id" SERIAL NOT NULL,
    "comboText" VARCHAR(255),
    "emojis" VARCHAR(255),
    "lang" VARCHAR(16),
    "interpretation" TEXT,
    "tag1" VARCHAR(128),
    "tag2" VARCHAR(128),
    "tag3" VARCHAR(128),
    "model" VARCHAR(32),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiCombo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiTag" (
    "id" SERIAL NOT NULL,
    "tagName" VARCHAR(255),
    "tagType" CHAR(1),
    "lang" VARCHAR(16),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmojiTagRela" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER,
    "emojisId" VARCHAR(255),
    "tagType" CHAR(1),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmojiTagRela_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_codePoint_key" ON "Emoji"("codePoint");

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_emojiChar_key" ON "Emoji"("emojiChar");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiCombo_comboText_key" ON "EmojiCombo"("comboText");

-- CreateIndex
CREATE UNIQUE INDEX "EmojiTag_tagName_key" ON "EmojiTag"("tagName");

-- AddForeignKey
ALTER TABLE "EmojiMeaning" ADD CONSTRAINT "EmojiMeaning_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmojiTagRela" ADD CONSTRAINT "EmojiTagRela_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "EmojiTag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

