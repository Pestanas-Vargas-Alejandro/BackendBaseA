-- MariaDB dump 10.19  Distrib 10.6.7-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.6.7-MariaDB-2ubuntu1.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Heroes`
--

DROP TABLE IF EXISTS `Heroes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Heroes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status` char(1) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Contrasena` varchar(100) NOT NULL,
  `Rol` varchar(35) NOT NULL,
  `H_Max` varchar(100) NOT NULL,
  `Nacionalidad` varchar(80) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Heroes`
--

LOCK TABLES `Heroes` WRITE;
/*!40000 ALTER TABLE `Heroes` DISABLE KEYS */;
INSERT INTO `Heroes` VALUES (1,'N','DVA','123','Tanque','Autodestruccion','Corea del Sur','2022-11-10 16:33:04','2022-11-15 16:11:58'),(2,'S','Junkrat','123','Daño','Neumatico Desgarrador','Australia','2022-11-10 16:55:25','2022-11-12 05:28:06'),(3,'S','Bastion','123','Daño','Modo misil','Unknown','2022-11-11 22:20:45','2022-11-12 05:28:06'),(4,'S','Lucio','$2a$10$L9cxdo1uCNj/7j0yvV7KaOFPWNLIVlihEIZpHicol156/Pv7nPQHK','Apoyo','Beat','Brasil','2022-11-11 22:29:58','2022-11-12 05:08:48'),(5,'S','Hanzo','$2a$10$ih8JtrLMEV9Tqx.S5zi9mu/c0bt8.SRuowQ8YnArYTHJt5aiZhEeS','Daño','Ataque del Dragon','Japon','2022-11-12 05:33:26','2022-11-12 05:36:07'),(6,'S','Bap','$2a$10$U9xrEdWBqE..004zl5HYDOKJ1.WlzfG09vmNGTMLJ40vt6QwloP1K','Apoyo','Ventana','Francia','2022-11-15 16:13:22','2022-11-17 16:37:28');
/*!40000 ALTER TABLE `Heroes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'alex@gmail.com','Alex','Pez',24,'M','12345','2000-11-18','N','2022-11-05 05:07:14','2022-11-17 18:21:28'),(2,'fer.gmail.com','Fer','Vargas',22,NULL,'$2a$10$iaRFrYU6DC4q1THep0oio.rG591boaUd1HrVfweUUTi3RbG7BMfxe','1990-01-01','S','2022-11-05 05:17:12','2022-11-11 14:57:51'),(3,'pez.gmail.com','alex','var',13,NULL,'$2a$10$hjriHUrO79VXEz3ghGGYBeXHaSCNHRvOtVzwsumBmn4QGvzkRt7ze','1990-01-01','S','2022-11-05 23:26:36','2022-11-11 14:57:58'),(4,'123@gmail.com','ALex','Zzzz',40,'M','$2a$10$s5LLDOTJyZy7XYvd9kG.Fu/5QRAPIoM.vMMsblhao1wR3fIChoJHi','1990-01-01','S','2022-11-11 13:44:06','2022-11-11 14:58:01'),(5,'Zzz@gmail.com','Pezz','Zzzz',40,NULL,'$2a$10$IejLeEAIGSKzRkbzIt9e2ujo1c4T4dHPbAxePjq4xwr11JR122Ok6','1990-01-01','S','2022-11-11 13:52:58','2022-11-11 14:58:04'),(6,'alejandro@gmail.com','Alejandro','Pestañas Var',30,'M','$2a$10$v.jBrCk9Ka.f0qR8PjqUfu8bjyeN1W3JNSZbteME5Y19XBRXglQfu','1990-01-01','S','2022-11-11 15:51:51','2022-11-11 15:59:51');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-18  4:18:03
