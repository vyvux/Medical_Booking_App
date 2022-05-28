-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: medical_booking
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `allcodes`
--
use heroku_7768612061b339c;

DROP TABLE IF EXISTS `allcodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `allcodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allcodes`
--

LOCK TABLES `allcodes` WRITE;
/*!40000 ALTER TABLE `allcodes` DISABLE KEYS */;
INSERT INTO `allcodes` VALUES (1,'role','R1','Admin','2022-05-10 11:47:10','2022-05-10 11:47:10'),(2,'role','R2','Doctor','2022-05-10 11:47:10','2022-05-10 11:47:10'),(3,'role','R3','Patient','2022-05-10 11:47:10','2022-05-10 11:47:10'),(4,'role','R4','Medical Staff','2022-05-10 11:47:10','2022-05-10 11:47:10'),(5,'status','S1','Processing','2022-05-10 11:47:10','2022-05-10 11:47:10'),(6,'status','S2','Confirmed','2022-05-10 11:47:10','2022-05-10 11:47:10'),(7,'status','S3','Finished','2022-05-10 11:47:10','2022-05-10 11:47:10'),(8,'status','S4','Cancelled','2022-05-10 11:47:10','2022-05-10 11:47:10'),(9,'time','T1','7.00 - 8.00 AM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(10,'time','T2','8.00 - 9.00 AM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(11,'time','T3','9.00 - 10.00 AM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(12,'time','T4','10.00 - 11.00 AM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(13,'time','T5','1.00 - 2.00 PM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(14,'time','T6','2.00 - 3.00 PM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(15,'time','T7','3.00 - 4.00 PM','2022-05-10 11:47:10','2022-05-10 11:47:10'),(16,'actionType','A1','Add appointment','2022-05-10 11:47:10','2022-05-10 11:47:10'),(17,'actionType','A2','Cancel appointment','2022-05-10 11:47:10','2022-05-10 11:47:10'),(18,'actionType','A3','Create user','2022-05-10 11:47:10','2022-05-10 11:47:10'),(19,'actionType','A4','Delete user','2022-05-10 11:47:10','2022-05-10 11:47:10'),(20,'actionType','A5','Edit user information','2022-05-10 11:47:10','2022-05-10 11:47:10'),(21,'actionType','A6','Edit patient profile','2022-05-10 11:47:10','2022-05-10 11:47:10'),(22,'actionType','A7','Edit doctor available hours','2022-05-10 11:47:10','2022-05-10 11:47:10'),(23,'actionType','A8','User login','2022-05-10 11:47:10','2022-05-10 11:47:10'),(24,'actionType','A9','Create patient profile','2022-05-10 11:47:10','2022-05-10 11:47:10'),(25,'actionType','A10','Register doctor','2022-05-10 11:47:10','2022-05-10 11:47:10'),(26,'actionType','A11','Edit doctor profile','2022-05-10 11:47:10','2022-05-10 11:47:10'),(27,'actionType','A12','Delete doctor','2022-05-10 11:47:10','2022-05-10 11:47:10'),(28,'actionType','A13','Add clinic information','2022-05-10 11:47:10','2022-05-10 11:47:10'),(29,'actionType','A14','Edit clinic information','2022-05-10 11:47:10','2022-05-10 11:47:10'),(30,'actionType','A15','Delete clinic information','2022-05-10 11:47:10','2022-05-10 11:47:10'),(31,'gender','0','Female','2022-05-10 11:47:10','2022-05-10 11:47:10'),(32,'gender','1','Male','2022-05-10 11:47:10','2022-05-10 11:47:10');
/*!40000 ALTER TABLE `allcodes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patientId` int DEFAULT NULL,
  `doctorId` int DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,NULL,NULL,'diet consultation','2022-05-23 10:30:00','T5','S1','2022-05-21 18:24:19','2022-05-21 18:24:19'),(2,NULL,NULL,'reason 1','2022-05-23 10:30:00','T1','S1','2022-05-21 18:25:44','2022-05-21 18:25:44');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `availabilities`
--

DROP TABLE IF EXISTS `availabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `availabilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `currentNumber` int DEFAULT NULL,
  `maxNumber` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `availabilities`
--

LOCK TABLES `availabilities` WRITE;
/*!40000 ALTER TABLE `availabilities` DISABLE KEYS */;
INSERT INTO `availabilities` VALUES (1,5,'1970-01-20 06:24:40','T1',0,10,'2022-05-10 10:26:28','2022-05-10 10:26:28'),(2,5,'1970-01-20 06:24:40','T2',0,10,'2022-05-10 10:26:28','2022-05-10 10:26:28'),(9,5,'1970-01-20 06:24:40','T3',0,8,'2022-05-10 11:04:36','2022-05-10 11:04:36'),(10,5,'1970-01-20 06:24:40','T5',0,8,'2022-05-10 11:04:36','2022-05-10 11:04:36'),(11,7,'2022-05-12 10:30:00','T1',0,8,'2022-05-11 13:45:58','2022-05-11 13:45:58'),(12,7,'2022-05-12 10:30:00','T2',0,8,'2022-05-11 13:45:58','2022-05-11 13:45:58'),(15,7,'2022-05-12 10:30:00','T3',0,8,'2022-05-11 13:47:06','2022-05-11 13:47:06'),(20,7,'2022-05-11 10:30:00','T6',0,8,'2022-05-11 13:48:10','2022-05-11 13:48:10'),(21,7,'2022-05-11 10:30:00','T7',0,8,'2022-05-11 13:48:10','2022-05-11 13:48:10'),(22,7,'2022-05-12 10:30:00','T4',0,8,'2022-05-12 00:55:54','2022-05-12 00:55:54'),(23,7,'2022-05-11 10:30:00','T5',0,8,'2022-05-12 00:56:23','2022-05-12 00:56:23'),(24,5,'2022-05-12 10:30:00','T5',0,8,'2022-05-12 00:57:25','2022-05-12 00:57:25'),(25,5,'2022-05-12 10:30:00','T6',0,8,'2022-05-12 00:57:25','2022-05-12 00:57:25'),(26,5,'2022-05-13 10:30:00','T2',0,8,'2022-05-12 00:57:38','2022-05-12 00:57:38'),(27,5,'2022-05-13 10:30:00','T3',0,8,'2022-05-12 00:57:38','2022-05-12 00:57:38'),(28,5,'2022-05-13 10:30:00','T4',0,8,'2022-05-12 00:57:38','2022-05-12 00:57:38'),(29,5,'2022-05-14 10:30:00','T1',0,8,'2022-05-12 00:58:14','2022-05-12 00:58:14'),(30,5,'2022-05-14 10:30:00','T2',0,8,'2022-05-12 00:58:14','2022-05-12 00:58:14'),(31,5,'2022-05-14 10:30:00','T3',0,8,'2022-05-12 00:58:14','2022-05-12 00:58:14'),(35,9,'2022-05-14 10:30:00','T1',0,8,'2022-05-12 00:58:42','2022-05-12 00:58:42'),(36,9,'2022-05-14 10:30:00','T2',0,8,'2022-05-12 00:58:42','2022-05-12 00:58:42'),(37,9,'2022-05-14 10:30:00','T3',0,8,'2022-05-12 00:58:42','2022-05-12 00:58:42'),(38,9,'2022-05-14 10:30:00','T4',0,8,'2022-05-12 00:58:42','2022-05-12 00:58:42'),(39,7,'2022-05-12 10:30:00','T5',0,8,'2022-05-12 01:53:11','2022-05-12 01:53:11'),(40,7,'2022-05-12 10:30:00','T6',0,8,'2022-05-12 01:53:11','2022-05-12 01:53:11'),(41,7,'2022-05-12 10:30:00','T7',0,8,'2022-05-12 01:53:11','2022-05-12 01:53:11'),(42,7,'2022-05-13 10:30:00','T1',0,8,'2022-05-12 01:53:29','2022-05-12 01:53:29'),(43,7,'2022-05-13 10:30:00','T2',0,8,'2022-05-12 01:53:29','2022-05-12 01:53:29'),(44,10,'2022-05-23 10:30:00','T1',0,8,'2022-05-21 16:34:19','2022-05-21 16:34:19'),(45,10,'2022-05-23 10:30:00','T2',0,8,'2022-05-21 16:34:19','2022-05-21 16:34:19'),(46,10,'2022-05-23 10:30:00','T3',0,8,'2022-05-21 16:34:19','2022-05-21 16:34:19'),(47,10,'2022-05-23 10:30:00','T4',0,8,'2022-05-21 16:34:19','2022-05-21 16:34:19'),(48,5,'2022-05-23 10:30:00','T5',0,8,'2022-05-21 17:54:15','2022-05-21 17:54:15'),(49,5,'2022-05-23 10:30:00','T6',0,8,'2022-05-21 17:54:15','2022-05-21 17:54:15'),(50,5,'2022-05-23 10:30:00','T7',0,8,'2022-05-21 17:54:15','2022-05-21 17:54:15'),(51,7,'2022-05-23 10:30:00','T3',0,8,'2022-05-21 17:54:27','2022-05-21 17:54:27'),(52,7,'2022-05-23 10:30:00','T4',0,8,'2022-05-21 17:54:27','2022-05-21 17:54:27'),(53,7,'2022-05-23 10:30:00','T5',0,8,'2022-05-21 17:54:27','2022-05-21 17:54:27');
/*!40000 ALTER TABLE `availabilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `branches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (2,'Bedford Park','Flinders Dr, Bedford Park SA 5042, Australia',1234568,'This is a major public tertiary hospital and teaching school, co-located with Flinders University and the 130 bed Flinders Private Hospital located at Bedford Park, South Australia. It opened in 1976. It serves as the trauma centre for the southern suburbs, and parts of the Adelaide Hills','','2022-03-22 17:30:31','2022-03-23 14:26:55'),(3,'Darwin','Tiwi NT 0810, Australia',9876543,'In Darwin, Flinders NT has campuses at Charles Darwin University (CDU) and Royal Darwin Hospital (RDH) where staff across all business units are located.\n\nThe Northern Territory Medical Program students in preclinical years are based in a purpose built complex on the CDU Campus. Students in clinical years are based at the RDH campus, working closely with clinical staff in progressing their medical studies.\n\nFlinders NT has modern teaching facilities with advanced audio visual and video conferencing facilities in well-equipped lecture rooms, various meeting rooms, a state-of-the-art anatomy laboratory and simulated learning environments.\n','','2022-03-22 19:12:38','2022-03-23 13:29:46'),(4,'Victoria Square','Victory Square, Adelaide, South Australia',20394882,'Located in the heart of Adelaide ',NULL,'2022-03-23 01:26:22','2022-03-28 00:51:51'),(5,'Sydney Medical Center','Sydney Harbor, Sydney',23487,'new medical center located in the heart of Sydney',NULL,'2022-03-23 01:40:55','2022-03-23 01:40:55'),(7,'Tonsley','1284 South Rd, Clovelly Park SA 5042, Australia',32649891,'Flinders’ Tonsley campus is a $120 million hub of innovation which centrally locates the University’s teaching and research in computer science, artificial intelligence, defence and national securities, autonomous vehicles, information technology, engineering and mathematics.\n\nAlong with some of Adelaide’s biggest businesses and globally-recognised organisations such as SAGE, Siemens, ZEISS, SIMEC ZEN Energy, Tesla, Micro-X, Rockwell Automation, as well as TAFE SA and Autism SA, Tonsley is also home to the Flinders Medical Device Research Institute (MDRI) and The Institute for Nanoscale Science & Technology. Flinders’ Tonsley campus is also an incubator for entrepreneurs and future employers who are creating next generation start-ups through the Flinders New Venture Institute.\n\nFrom early 2021, a $141 million extension of the Tonsley rail line will link Flinders’ Bedford Park and Tonsley campuses by rail, and allow Flinders’ students to access the CBD by train in less than 20 minutes.',NULL,'2022-03-24 00:31:39','2022-05-05 14:41:51');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `about` text,
  `serviceId` int DEFAULT NULL,
  `branchId` int DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (5,21,'Dr. Sarah Nguyen about',13,7,'Sahra','Nguyen',0,'2022-03-26 15:16:02','2022-03-26 15:16:02'),(7,14,'Dr. Emily demo about edited',7,2,'Emily','Roddick',0,'2022-03-26 16:31:28','2022-04-03 01:54:28'),(9,27,'Dr.Kai about demo',5,3,'Kai','Walker',1,'2022-03-26 19:01:02','2022-05-05 14:20:54'),(10,24,'This is an about demo',2,2,'Marcus','Rashford',1,'2022-03-26 19:01:21','2022-03-26 19:01:21'),(11,22,'Dr. Cody about section',11,7,'Cody','Simpson',1,'2022-03-26 19:01:57','2022-03-26 19:01:57'),(12,29,'Dr Nicky about section',7,2,'Nicky','Vu',0,'2022-03-26 19:05:48','2022-03-26 19:05:48'),(13,15,'Demo about for dr john',11,2,'John','Hilton',1,'2022-03-28 01:13:53','2022-03-28 01:13:53'),(15,32,'Dr. Henry has rich experience in giving dental services',1,2,'Henry','Ronaldo',1,'2022-04-03 01:55:10','2022-04-03 01:55:10'),(16,30,'Dr. KIm about demo',2,7,'Kim','Choo',1,'2022-04-11 02:00:40','2022-04-11 02:00:40');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `actionType` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,1,'A3','User 1 Vy Vu create user ABC','2022-05-05 10:39:25','2022-05-05 10:39:25'),(2,7,'A5','User 7 edit profile patient 2','2022-05-05 11:09:56','2022-05-05 11:09:56'),(3,1,'A3','User 1 - Vy Vu create new user (ID: 40)','2022-05-05 13:06:16','2022-05-05 13:06:16'),(4,1,'A4','User 1 - Vy Vu delete user ID: 40','2022-05-05 13:11:03','2022-05-05 13:11:03'),(5,1,'A4','User 1 - Vy Vu delete user ID: 37 - Rio Fernaldo role Medical Staff','2022-05-05 13:24:44','2022-05-05 13:24:44'),(6,1,'A6','User 1 - Vy Vu edit patient information (ID: 2)','2022-05-05 14:02:31','2022-05-05 14:02:31'),(7,1,'A6','User 1 - Vy Vu edit patient information (ID: 6 - Dean Simpson)','2022-05-05 14:04:44','2022-05-05 14:04:44'),(8,1,'A10','User 1 - Vy Vu edit doctor information (Doctor ID: undefined - Kai Walker)','2022-05-05 14:20:54','2022-05-05 14:20:54'),(9,1,'A10','User 1 - Vy Vu create new doctor (Doctor ID: 17 - Ana Elanga)','2022-05-05 14:21:55','2022-05-05 14:21:55'),(10,1,'A12','User 1 - Vy Vu delete doctor (Doctor ID: 17 - Ana Elanga)','2022-05-05 14:22:26','2022-05-05 14:22:26'),(11,1,'A14','User 1 - Vy Vu edit service information (Service ID: 1 - Dental Service)','2022-05-05 14:36:36','2022-05-05 14:36:36'),(12,1,'A14','User 1 - Vy Vu edit service information (Service ID: 1 - Dental Service)','2022-05-05 14:37:01','2022-05-05 14:37:01'),(13,1,'A13','User 1 - Vy Vu edit patient information (Service ID: 15 - abcs)','2022-05-05 14:37:18','2022-05-05 14:37:18'),(14,1,'A15','User 1 - Vy Vu delete service (Service ID: 15 - abcs)','2022-05-05 14:37:23','2022-05-05 14:37:23'),(15,1,'A13','User 1 - Vy Vu add new branch (Branch ID: 8 - oiuoiaskdfk)','2022-05-05 14:41:32','2022-05-05 14:41:32'),(16,1,'A15','User 1 - Vy Vu delete branch (Branch ID: 8 - oiuoiaskdfk)','2022-05-05 14:41:36','2022-05-05 14:41:36'),(17,1,'A15','User 1 - Vy Vu edit branch information (Branch ID: 7 - Tonsley)','2022-05-05 14:41:44','2022-05-05 14:41:44'),(18,1,'A15','User 1 - Vy Vu edit branch information (Branch ID: 7 - Tonsley)','2022-05-05 14:41:51','2022-05-05 14:41:51'),(19,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-05 15:03:08','2022-05-05 15:03:08'),(20,34,'A8','User 34 - Peter Pan (Medical Staff) log into system','2022-05-05 15:03:51','2022-05-05 15:03:51'),(21,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-05 15:04:16','2022-05-05 15:04:16'),(22,12,'A8','User 12 - Brandon Williams (Admin) log into system','2022-05-06 13:35:42','2022-05-06 13:35:42'),(23,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 00:23:51','2022-05-07 00:23:51'),(24,12,'A8','User 12 - Brandon Williams (Admin) log into system','2022-05-07 01:50:55','2022-05-07 01:50:55'),(25,36,'A8','User 36 - Gary Neville (Medical Staff) log into system','2022-05-07 01:51:44','2022-05-07 01:51:44'),(26,15,'A8','User 15 - John Hilton (Doctor) log into system','2022-05-07 01:52:24','2022-05-07 01:52:24'),(27,25,'A8','User 25 - Jimmy William (Admin) log into system','2022-05-07 01:53:08','2022-05-07 01:53:08'),(28,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 12:55:38','2022-05-07 12:55:38'),(29,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 13:12:20','2022-05-07 13:12:20'),(30,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 14:49:14','2022-05-07 14:49:14'),(31,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 15:07:51','2022-05-07 15:07:51'),(32,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 15:09:12','2022-05-07 15:09:12'),(33,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-07 15:35:52','2022-05-07 15:35:52'),(34,52,'A8','User 52 - Danny Smith (Patient) log into system','2022-05-08 22:49:33','2022-05-08 22:49:33'),(35,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-08 22:51:12','2022-05-08 22:51:12'),(36,53,'A3','User 53 - Philip Coutinho register new patient account and new patient profile (Patient ID: 9 - Philip Coutinho)','2022-05-08 23:14:41','2022-05-08 23:14:41'),(37,54,'A3','User 54 - Richard Williams register new patient account with existing patient profile (Patient ID: 1 - Richard Williams)','2022-05-08 23:28:13','2022-05-08 23:28:13'),(38,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-08 23:30:06','2022-05-08 23:30:06'),(39,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-09 01:15:33','2022-05-09 01:15:33'),(40,24,'A8','User 24 - Marcus Rashford (Doctor) log into system','2022-05-09 01:30:18','2022-05-09 01:30:18'),(41,20,'A8','User 20 - Paul Pogba (Medical Staff) log into system','2022-05-09 01:34:34','2022-05-09 01:34:34'),(42,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-09 01:59:28','2022-05-09 01:59:28'),(43,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-09 02:00:25','2022-05-09 02:00:25'),(44,20,'A8','User 20 - Paul Pogba (Medical Staff) log into system','2022-05-09 21:21:42','2022-05-09 21:21:42'),(45,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-09 21:57:28','2022-05-09 21:57:28'),(46,23,'A8','User 23 - Jadon Sancho (Medical Staff) log into system','2022-05-11 17:03:02','2022-05-11 17:03:02'),(47,14,'A8','User 14 - Emily Roddick (Doctor) log into system','2022-05-12 01:05:11','2022-05-12 01:05:11'),(48,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-15 19:53:27','2022-05-15 19:53:27'),(49,20,'A8','User 20 - Paul Pogba (Medical Staff) log into system','2022-05-17 10:19:29','2022-05-17 10:19:29'),(50,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-21 16:33:13','2022-05-21 16:33:13'),(51,24,'A8','User 24 - Marcus Rashford (Doctor) log into system','2022-05-21 16:33:40','2022-05-21 16:33:40'),(52,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-21 17:21:11','2022-05-21 17:21:11'),(53,15,'A8','User 15 - John Hilton (Doctor) log into system','2022-05-21 17:31:48','2022-05-21 17:31:48'),(54,23,'A8','User 23 - Jadon Sancho (Medical Staff) log into system','2022-05-21 17:52:31','2022-05-21 17:52:31'),(55,14,'A8','User 14 - Emily Roddick (Doctor) log into system','2022-05-21 18:09:48','2022-05-21 18:09:48'),(56,3,'A8','User 3 - Richard Williams (Patient) log into system','2022-05-21 19:08:58','2022-05-21 19:08:58'),(57,1,'A8','User 1 - Vy Vu (Admin) log into system','2022-05-21 20:17:28','2022-05-21 20:17:28'),(58,5,'A8','User 5 - Wayne Rooney (Patient) log into system','2022-05-21 20:45:25','2022-05-21 20:45:25'),(59,24,'A8','User 24 - Marcus Rashford (Doctor) log into system','2022-05-22 02:16:28','2022-05-22 02:16:28'),(60,33,'A8','User 33 - Robin Hood (Medical Staff) log into system','2022-05-22 02:31:53','2022-05-22 02:31:53');
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dob` datetime DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `allergy` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'1995-03-05 15:33:12',12345678,'10 Flinders University Drive, Adelaide, South Australia','Tetracyclines, Macrolides','Richard','Williams',54,1,'2022-03-05 14:21:50','2022-05-08 23:28:13'),(2,'1997-09-05 10:30:00',12342378,'Sydney, Aus','','Kai','Rooney',5,1,'2022-03-05 14:26:44','2022-05-05 14:02:31'),(4,'1990-03-06 10:30:00',31265498,'102 Waymouth Street, Adelaide, South Australia','panadol','Lindsey','Holand',1,0,'2022-04-01 15:28:54','2022-04-03 02:01:45'),(5,'1996-12-08 14:21:50',95846213,'37 Kevin road, Adelaide, South Australia','ibuprofen, aspirin','Danny','Smith',52,1,'2022-04-01 17:27:47','2022-05-08 22:49:11'),(6,'1997-11-12 10:30:00',6549871,'6 Arrowfield Drive,Sydney, 2173, Australia',NULL,'Dean','Simpson',51,1,'2022-04-02 00:42:53','2022-05-07 14:28:20'),(7,'2000-12-26 10:30:00',65875465,'Melbourne','aspirin','Ashley','Young',41,1,'2022-05-07 10:26:12','2022-05-07 10:26:12'),(8,'1995-12-06 10:30:00',38345344,'HCM',NULL,'Mark','Tran',42,1,'2022-05-07 10:29:15','2022-05-07 10:29:15'),(9,'1996-06-12 10:30:00',343546576,'Liverpool, England',NULL,'Philip','Coutinho',53,1,'2022-05-08 23:14:41','2022-05-08 23:14:41');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('migration-create-allcode.js'),('migration-create-appointment.js'),('migration-create-availability.js'),('migration-create-branch.js'),('migration-create-doctor.js'),('migration-create-log.js'),('migration-create-patient.js'),('migration-create-service.js'),('migration-create-user.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Dental Service','Flinders is responsible for providing dental care within a hospital setting on a referral basis to a broad patient group.','2022-03-23 17:40:22','2022-05-05 14:37:01'),(2,'Ear, Nose and Throat (Otorhinolaryngology)','The Flinders Medical Centre Otolaryngology Unit provides full general ear, nose and throat (ENT) services including paediatric services.','2022-03-23 17:41:47','2022-03-23 17:41:47'),(4,'Cardiac Services','The Regional Cardiology service includes cardiac services to Flinders Medical Centre (FMC), Noarlunga Hospital and Noarlunga GP Plus. The Cardiology Department also provides support to Darwin Private and Public Hospitals. Cardiac Surgery services are based at Flinders Medical Centre.\n\nThe regional Cardiology Service at FMC is widely recognised for its commitment to high quality state-of-the-art evidence based practice linked to a strong academic program incorporating clinical trials and innovative interventions in clinical cardiology.','2022-03-23 17:43:13','2022-03-23 17:43:13'),(5,'Occupational Therapy Services','The Occupational Therapy Department provides both inpatient and outpatient services.\n\nOccupational therapists work with patients who have difficulties or challenges that interfere with every day routines.\n\nOur staff work closely with medical, nursing and other allied health staff to assist patients improve their ability to deal with daily activities.','2022-03-23 17:44:22','2022-03-28 01:08:30'),(7,'Women & Children Services','Women and Children at Flinders provide a comprehensive health care service for women, babies, children and adolescents.','2022-03-23 22:34:51','2022-04-03 01:57:44'),(11,'Aged Care and Older Persons Services','As people age, many will experience one or more chronic diseases and most will experience an acute illness of some sort.  Older people, who have had a major illness, injury or surgery or are affected by an age related problem, can find it difficult to manage their daily lives and maintain their independence. Whether it’s their mobility, ability to communicate or their wellbeing that is affected, people’s everyday lives can be affected impacted by their health status.\n\nSALHN provides a range of health services specifically for the older person to assist them to recover from their injury or illness and to help them be more independent, adjust to new ways of doing things and enabling them to lead a more active, mobile life.\n\nServices for older people can be offered in a range of locations, depending on the person’s needs, the level of support they have available and the medical condition they currently need assistance to manage.','2022-03-24 00:35:13','2022-03-24 00:35:13'),(12,'Dermatology Services','The Dermatology Unit provides a consultative service for the following conditions:\n- Acute severe Dermatological problems\n- Haemodynamically unstable dermatoses\n- Moderate and severe skin disease unresponsive to current management\n- Melanoma in non-melanoma skin cancer\n- Diagnoses and management of rare acquired and congenital dermatoses\n- Severe skin infections\n- Severe bullous disease\n','2022-03-24 00:36:59','2022-03-24 00:36:59'),(13,'Dietetics and Nutrition Services','The Dietetic and Nutrition outpatient services at Flinders Medical Centre and Noarlunga Hospital are predominately internal hospital referrals received from various SALHN departments and specialist units. These clinics provide nutritional assessment and treatment for infants, children and adults following inpatient admissions and also for acute and/or complex conditions.\n\nOutpatient services are provided either as a face to face or phone consult at Flinders Medical Centre and Noarlunga Hospital.\n\nPlease note: referrals for lifestyle disease management should be referred to Intermediate Care Services, including: \n\n    Constipation\n    Fussy eating\n    Healthy eating advice\n    Hyperlipidaemia, Hypertension\n    Overweight/Obesity\n    Poor diet\n    Stable Type 2 Diabetes','2022-03-24 00:38:33','2022-03-24 00:38:33');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `roleId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vyvu@gmail.com','$2a$10$YlbLngIcBs2UCWuFfHKOCuu0drUCPA6.Z6Pml9R.PXvUghwmHi8XW','Vy','Vu','null','R1','2022-03-05 14:07:25','2022-03-05 14:07:25'),(3,'patient1@gmail.com','$2a$10$Mf55cLgU23NjoQuFJ6HQ3.s0QJ6lpSCXaVrvIhx2K9BQFs77cJLjW','Richard','Williams','null','R3','2022-03-05 14:21:50','2022-03-05 14:21:50'),(5,'patient2@gmail.com','$2a$10$Mf55cLgU23NjoQuFJ6HQ3.s0QJ6lpSCXaVrvIhx2K9BQFs77cJLjW','Wayne','Rooney','','R3','2022-03-05 14:26:44','2022-03-13 00:08:25'),(7,'staff1@gmail.com','$2a$10$nGvRzWyXXlSF.yVUi.Nx4.uwPRjXupYmcp/ZpFhlLWOwiQaGFw.Xi','Kathy','Everlyn','','R4','2022-03-09 15:55:45','2022-03-22 16:33:45'),(11,'staff3@gmail.com','$2a$10$nGvRzWyXXlSF.yVUi.Nx4.uwPRjXupYmcp/ZpFhlLWOwiQaGFw.Xi','Brett','Cook',NULL,'R4','2022-03-10 01:02:48','2022-03-12 22:47:09'),(12,'admin3@gmail.com','$2a$10$SY7XXNzf6q9cZYuVcxNBCOSoso/1Fj8MWU9SLJBaZaqzdaFpWzbSO','Brandon','Williams',NULL,'R1','2022-03-10 01:14:40','2022-03-10 01:14:40'),(13,'staff4@gmail.com','$2a$10$SY7XXNzf6q9cZYuVcxNBCOSoso/1Fj8MWU9SLJBaZaqzdaFpWzbSO','Harry','Vu',NULL,'R4','2022-03-10 01:21:28','2022-03-10 01:21:28'),(14,'doctor4@gmail.com','$2a$10$SY7XXNzf6q9cZYuVcxNBCOSoso/1Fj8MWU9SLJBaZaqzdaFpWzbSO','Emily','Roddick',NULL,'R2','2022-03-10 01:23:13','2022-03-22 16:21:46'),(15,'doctor5@gmail.com','$2a$10$SY7XXNzf6q9cZYuVcxNBCOSoso/1Fj8MWU9SLJBaZaqzdaFpWzbSO','John','Hilton',NULL,'R2','2022-03-10 01:29:17','2022-03-10 01:29:17'),(20,'staff5@gmail.com','$2a$10$SY7XXNzf6q9cZYuVcxNBCOSoso/1Fj8MWU9SLJBaZaqzdaFpWzbSO','Paul','Pogba',NULL,'R4','2022-03-10 01:49:20','2022-03-10 01:49:20'),(21,'doctor10@gmail.com','$2a$10$E/Angd3.dLKek7601vTY7u6wbrSbgN//B.RzQi0Jue84/EN6DpiPy','Sahra','Nguyen',NULL,'R2','2022-03-10 15:06:24','2022-03-10 15:06:24'),(22,'doctor11@gmail.com','$2a$10$E/Angd3.dLKek7601vTY7u6wbrSbgN//B.RzQi0Jue84/EN6DpiPy','Cody','Simpson',NULL,'R2','2022-03-10 15:11:09','2022-03-13 00:40:52'),(23,'staff6@gmail.com','$2a$10$E/Angd3.dLKek7601vTY7u6wbrSbgN//B.RzQi0Jue84/EN6DpiPy','Jadon','Sancho',NULL,'R4','2022-03-10 18:47:07','2022-03-10 18:47:07'),(24,'doctor6@gmail.com','$2a$10$WUupKs8YeM/vR/Edh/7ha.ZK9TG9OcHtUWMr.S7Gcq01uNhL.jGge','Marcus','Rashford',NULL,'R2','2022-03-11 02:01:22','2022-03-11 02:01:22'),(25,'admin4@gmail.com','$2a$10$WUupKs8YeM/vR/Edh/7ha.ZK9TG9OcHtUWMr.S7Gcq01uNhL.jGge','Jimmy','William',NULL,'R1','2022-03-11 15:02:58','2022-03-28 00:14:02'),(27,'doctor7@gmail.com','$2a$10$vrK1x53HMZGB1Hu/V.7hqOUa/u.Yf.ctzir8yYZONmGMKztLkSg8S','Kai','Walker',NULL,'R2','2022-03-22 16:34:27','2022-03-22 16:34:27'),(28,'doctor8@gmail.com','$2a$10$yWWR3Hmwwg4lhzmPI6B9weU31mlQ0sZyezko6LzwfXtk.eoJmsQsi','Ana','Elanga',NULL,'R2','2022-03-22 16:59:08','2022-03-22 16:59:08'),(29,'doctor9@gmail.com','$2a$10$3KHlaLS7.TrTY.dCyfZzo.XGM3J2Sob/DqytSaxHLxFXYXMlRgOza','Nicky','Pham',NULL,'R2','2022-03-26 19:05:15','2022-03-28 00:18:27'),(30,'doctor12@gmail.com','$2a$10$3KHlaLS7.TrTY.dCyfZzo.XGM3J2Sob/DqytSaxHLxFXYXMlRgOza','Kim','Choo',NULL,'R2','2022-03-27 20:07:32','2022-03-27 20:07:32'),(32,'doctor14@gmail.com','$2a$10$3KHlaLS7.TrTY.dCyfZzo.XGM3J2Sob/DqytSaxHLxFXYXMlRgOza','Henry','Ronaldo',NULL,'R2','2022-03-27 20:16:44','2022-03-27 20:16:44'),(33,'staff7@gmail.com','$2a$10$3KHlaLS7.TrTY.dCyfZzo.XGM3J2Sob/DqytSaxHLxFXYXMlRgOza','Robin','Hood',NULL,'R4','2022-03-27 20:23:19','2022-03-27 20:23:19'),(34,'staff8@gmail.com','$2a$10$3KHlaLS7.TrTY.dCyfZzo.XGM3J2Sob/DqytSaxHLxFXYXMlRgOza','Peter','Pan',NULL,'R4','2022-03-27 20:25:05','2022-03-27 20:25:05'),(35,'staff9@gmail.com','$2a$10$2CIhXu/HM3H19QIzhsgq2.tgbuiXFR5D07W7cYwFAlxjwMQeM8gvK','Ken','Timberlake',NULL,'R4','2022-03-28 00:26:53','2022-03-28 00:26:53'),(36,'staff10@gmail.com','$2a$10$/Z4wATRpS4.eOqL9912Va.c.ZQB0lUZYXQENTKcdueetFq5YwS6dO','Gary','Neville',NULL,'R4','2022-05-05 12:40:07','2022-05-05 12:40:07'),(38,'staff12@gmail.com','$2a$10$/Z4wATRpS4.eOqL9912Va.c.ZQB0lUZYXQENTKcdueetFq5YwS6dO','Jesse','Lingard',NULL,'R4','2022-05-05 12:58:08','2022-05-05 12:58:08'),(39,'staff13@gmail.com','$2a$10$BkvLMmRbqH4TXISNKQI2y.Gd/.nxDnx5WI7m94etRyVnSShYEGI0.','Bruno','Fernades',NULL,'R4','2022-05-05 13:00:08','2022-05-05 13:00:08'),(41,'patient3@gmail.com','$2a$10$Bq.Q7RJR9fsyA6j.FrR.rubnVNGO4Nc5b2VYI3i2hzrDHjZTC6/5O','Ashley','Young',NULL,'R3','2022-05-07 10:26:12','2022-05-07 10:26:12'),(42,'patient4@gmail.com','$2a$10$UiY7Uyo/iAlwTFxPdccZ8OQpEFrKJ3yoN0YeABYP8sZT7wr/y.lE6','Mark','Tran',NULL,'R3','2022-05-07 10:29:15','2022-05-07 10:29:15'),(43,'patient5@gmail.com','$2a$10$nTZlr7rk7AUpdYc5Jy.vX.LS7IkI9j60x1vgWcMZm1.LQ0Esx2hNG','Windy','Chang',NULL,'R3','2022-05-07 10:53:26','2022-05-07 10:53:26'),(44,'patient6@gmail.com','$2a$10$YlIqSg5ycAp0ma58aWq8TOcP6AX55t68Q7BPBk/Ou9RX0WM7/YmRm','Eric','Ten Hag',NULL,'R3','2022-05-07 10:57:22','2022-05-07 10:57:22'),(45,'patient7@gmail.com','$2a$10$GP7nBftFP4Dq.KTJbo2YIOdpO7EY/0.gIC95BA8tDMkS6jVhMTcsW','Ivy','Nguyen',NULL,'R3','2022-05-07 12:46:10','2022-05-07 12:46:10'),(46,'patient8@gmail.com','$2a$10$Ej2.MZrJjFjHiKkZCo1N4OtRG6DzddtG7gTcXEotRpii5fVYIwYuy','Rud','De Jong',NULL,'R3','2022-05-07 12:56:53','2022-05-07 12:56:53'),(47,'patient9@gmail.com','$2a$10$2UcgvqIfI47zKPCse1Nfb.6M06YOwWU4BMywWnOZjlIVVn.bNc7O.','Harry','Lu',NULL,'R3','2022-05-07 13:02:21','2022-05-07 13:02:21'),(48,'patient10@gmail.com','$2a$10$2dnMLw2u.jzs6n8g2gXmgeE99Nl.OXtgNgG4DTVjpqcBX/c5u2qAi','Luke','Shaw',NULL,'R3','2022-05-07 13:06:26','2022-05-07 13:06:26'),(49,'patient11@gmail.com','$2a$10$k4HA/eU7esAtOMOK.VUVsOQHItC56DMMYGNN3yk5aR.1aOHx9iRya','Marcus','Rash4',NULL,'R3','2022-05-07 13:08:38','2022-05-07 13:12:54'),(51,'patient13@gmail.com','$2a$10$FQyhpHp0jIKwi0CTdP/nc.gsHFfJPtQg6rKT/QX6OxTe1Ei1ApDRy','Chris','Vo',NULL,'R3','2022-05-07 14:28:20','2022-05-07 14:28:20'),(52,'patient14@gmail.com','$2a$10$NA9XdHI4yVR4hn.HfD9KF.tOx4JkHUMgXNrRS.nKITygaAfgZOp0W','Danny','Smith',NULL,'R3','2022-05-08 22:49:11','2022-05-08 22:49:11'),(53,'patient15@gmail.com','$2a$10$keS.pWJxsyEKgtuvIibv8.5rBtyTDajbgbCWdTUcp8vwcOoK3DabG','Philip','Coutinho',NULL,'R3','2022-05-08 23:14:41','2022-05-08 23:14:41'),(54,'patient16@gmail.com','$2a$10$keS.pWJxsyEKgtuvIibv8.5rBtyTDajbgbCWdTUcp8vwcOoK3DabG','Richard','Williams',NULL,'R3','2022-05-08 23:28:13','2022-05-08 23:28:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-28 11:41:43
