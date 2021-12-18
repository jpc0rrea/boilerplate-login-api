/*
  Warnings:

  - Added the required column `permission_level` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permission_level" INTEGER NOT NULL;
