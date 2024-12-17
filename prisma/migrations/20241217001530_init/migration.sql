/*
  Warnings:

  - The primary key for the `user_catalog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_catalog` table. All the data in the column will be lost.
  - Added the required column `userId` to the `user_catalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_catalog` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);
