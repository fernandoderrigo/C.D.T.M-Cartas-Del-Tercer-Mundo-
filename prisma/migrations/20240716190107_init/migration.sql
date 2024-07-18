-- DropForeignKey
ALTER TABLE "Play" DROP CONSTRAINT "Play_blackCardId_fkey";

-- DropForeignKey
ALTER TABLE "Play" DROP CONSTRAINT "Play_whiteCardId_fkey";

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_blackCardId_fkey" FOREIGN KEY ("blackCardId") REFERENCES "BlackCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_whiteCardId_fkey" FOREIGN KEY ("whiteCardId") REFERENCES "WhiteCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
