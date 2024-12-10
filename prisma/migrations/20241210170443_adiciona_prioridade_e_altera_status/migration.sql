/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `chamado` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `chamado` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Added the required column `gravidade` to the `Chamado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urgencia` to the `Chamado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chamado` DROP COLUMN `criadoEm`,
    ADD COLUMN `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `gravidade` ENUM('ERRO_IMPEDE_CONTINUIDADE', 'SISTEMA_INDISPONIVEL', 'ERRO_CRITICO', 'ERRO_MEDIO_MENOR_IMPACTO', 'DUVIDAS_MELHORIAS') NOT NULL,
    ADD COLUMN `urgencia` ENUM('ACAO_IMEDIATA', 'ATENDER_CEDO_POSSIVEL', 'PRAZO_PADRAO') NOT NULL,
    MODIFY `id` INTEGER NOT NULL,
    MODIFY `status` ENUM('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO') NOT NULL DEFAULT 'ABERTO';
