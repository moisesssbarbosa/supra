-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuarios` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_usuarios` VARCHAR(50) NOT NULL,
    `cpf_usuarios` VARCHAR(11) NOT NULL,
    `email_usuarios` VARCHAR(50) NOT NULL,
    `cargo_usuarios` BOOLEAN NOT NULL DEFAULT false,
    `senha_usuarios` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_usuarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `convidados` (
    `id_convidados` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_convidados` VARCHAR(50) NOT NULL,
    `sobrenome_convidados` VARCHAR(50) NOT NULL,
    `cpf_convidados` VARCHAR(11) NOT NULL,
    `email_convidados` VARCHAR(50) NOT NULL,
    `telefone_convidados` VARCHAR(11) NOT NULL,
    `mesa_convidados` SMALLINT NOT NULL,
    `status_checkin_convidados` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_convidados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
