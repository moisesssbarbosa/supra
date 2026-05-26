/*
  Warnings:

  - A unique constraint covering the columns `[cpf_convidados]` on the table `convidados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_convidados]` on the table `convidados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone_convidados]` on the table `convidados` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf_usuarios]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_usuarios]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `convidados_cpf_convidados_key` ON `convidados`(`cpf_convidados`);

-- CreateIndex
CREATE UNIQUE INDEX `convidados_email_convidados_key` ON `convidados`(`email_convidados`);

-- CreateIndex
CREATE UNIQUE INDEX `convidados_telefone_convidados_key` ON `convidados`(`telefone_convidados`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_cpf_usuarios_key` ON `usuarios`(`cpf_usuarios`);

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_email_usuarios_key` ON `usuarios`(`email_usuarios`);
