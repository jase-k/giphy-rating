-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema giphy_schema
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `giphy_schema` ;

-- -----------------------------------------------------
-- Schema giphy_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `giphy_schema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `giphy_schema` ;

-- -----------------------------------------------------
-- Table `giphy_schema`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `giphy_schema`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `giphy_id` VARCHAR(255) NULL DEFAULT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `giphy_schema`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `giphy_schema`.`comments` (
  `gif_id` VARCHAR(255) NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `comment` TEXT NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `giphy_schema`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `giphy_schema`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `giphy_schema`.`ratings` (
  `gif_id` VARCHAR(255) NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ratings_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_ratings_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `giphy_schema`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
