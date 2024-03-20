/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `Registry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Registry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Contact_email_key` ON `Contact`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Registry_cnpj_key` ON `Registry`(`cnpj`);

-- CreateIndex
CREATE UNIQUE INDEX `Registry_cpf_key` ON `Registry`(`cpf`);
