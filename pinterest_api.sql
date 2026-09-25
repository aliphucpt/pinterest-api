-- -------------------------------------------------------------
-- TablePlus 26.9.12(770)
--
-- https://tableplus.com/
--
-- Database: pinterest_api
-- Generation Time: 2026-08-26 16:37:45.4280
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `commentAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `content` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `binh_luan_userId_idx` (`userId`),
  KEY `binh_luan_imageId_idx` (`imageId`),
  CONSTRAINT `binh_luan_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `hinh_anh` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `binh_luan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hinh_anh_userId_idx` (`userId`),
  CONSTRAINT `hinh_anh_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `userId` int NOT NULL,
  `imageId` int NOT NULL,
  `savedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`,`imageId`),
  KEY `luu_anh_imageId_idx` (`imageId`),
  CONSTRAINT `luu_anh_imageId_fkey` FOREIGN KEY (`imageId`) REFERENCES `hinh_anh` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `luu_anh_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nguoi_dung_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `binh_luan` (`id`, `userId`, `imageId`, `commentAt`, `content`) VALUES
(1, 1, 1, '2026-08-26 03:56:26.092', 'Ảnh đẹp quá');

INSERT INTO `hinh_anh` (`id`, `imageName`, `imageUrl`, `description`, `userId`) VALUES
(1, 'Hoa đẹp', 'https://picsum.photos/500/300', 'Ảnh test Pinterest', 1),
(3, 'Núi và mây', 'https://picsum.photos/500/302', 'Phong cảnh núi và mây', 1),
(4, 'Thành phố ban đêm', 'https://picsum.photos/500/303', 'Khung cảnh thành phố về đêm', 1),
(5, 'Ảnh của tôi', 'https://res.cloudinary.com/jyztgyaq/image/upload/v1787730329/pinterest_api/images/tdplfdebnr15xjpotmz5.png', 'Upload ảnh lên Cloudinary', 1);

INSERT INTO `luu_anh` (`userId`, `imageId`, `savedAt`) VALUES
(1, 1, '2026-08-26 04:15:33.655');

INSERT INTO `nguoi_dung` (`id`, `email`, `password`, `fullName`, `age`, `avatar`) VALUES
(1, 'test@gmail.com', '$2b$10$GI92l.vlOVxrAF8iZenHUuUNN45MJN9t9Cy3k3r6Wv3nAA.5sYyY6', 'Nguyen Van B', 30, 'pinterest_api/lwsoff2osy1ecsxvgnjb');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;