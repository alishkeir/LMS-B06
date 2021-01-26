-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 26, 2021 at 08:32 AM
-- Server version: 8.0.22-0ubuntu0.20.04.3
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` bigint UNSIGNED NOT NULL,
  `attendanceDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` bigint UNSIGNED NOT NULL,
  `className` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `className`) VALUES
(1, 'Class 1'),
(2, 'Class 2'),
(3, 'Class 3'),
(4, 'Class 4'),
(5, 'Class 5'),
(6, 'Class 6'),
(7, 'Class 7'),
(8, 'Class 8'),
(9, 'Class 9');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '2014_10_12_000000_create_users_table', 1),
(11, '2014_10_12_100000_create_password_resets_table', 1),
(12, '2019_08_19_000000_create_failed_jobs_table', 1),
(13, '2021_01_04_023620_create_classes_table', 1),
(14, '2021_01_04_023634_create_sections_table', 1),
(15, '2021_01_04_023652_create_students_table', 1),
(16, '2021_01_04_023749_create_attendance_table', 1),
(17, '2021_01_10_185401_create_teachers_table', 1),
(18, '2021_01_24_083222_create_student_attendance_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint UNSIGNED NOT NULL,
  `sectionName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classID` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `sectionName`, `classID`) VALUES
(1, 'Section 1', 1),
(2, 'Section 2', 1),
(3, 'Section 3', 1),
(4, 'Section 4', 2),
(5, 'Section 5', 2),
(6, 'Section 6', 2),
(7, 'Section 7', 3),
(8, 'Section 8', 3),
(9, 'Section 9', 3),
(10, 'class 7 section 1', 7);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint UNSIGNED NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateOfBirth` date NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sectionID` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `dateOfBirth`, `image`, `sectionID`) VALUES
(2, 'fatima', 'test', 'ali1@hotmail.com', '00000000', '0206-06-04', '1611574996_download.png', 1),
(4, 'hassan', 'test', 'hassan@hotmail.com', '00000000', '0206-06-04', '', 1),
(5, 'hassan', 'test', 'hassan1@hotmail.com', '00000000', '0206-06-04', '', 1),
(6, 'ali', 'test', 'ali2@hotmail.com', '00000000', '0206-06-04', '', 1),
(7, 'ali', 'test', 'ali3@hotmail.com', '00000000', '0206-06-04', '', 1),
(8, 'ali', 'test', 'ali4@hotmail.com', '00000000', '0206-06-04', '', 1),
(9, 'ahmad', 'test', 'ahmad@hotmail.com', '00000000', '0206-06-04', '', 2),
(10, 'ahmad', 'test', 'ahmadf1@hotmail.com', '00000000', '0206-06-04', '', 2),
(11, 'hassan', 'test', 'hassan2@hotmail.com', '00000000', '0206-06-04', '', 2),
(12, 'ali', 'test', 'alis@hotmail.com', '00000000', '0206-06-04', '', 2),
(13, 'user', 'test', 'user3@hotmail.com', '00000000', '0206-06-04', '', 2),
(14, 'user', 'test', 'user4@hotmail.com', '00000000', '0206-06-04', '', 2),
(15, 'user', 'test', 'user5@hotmail.com', '00000000', '0206-06-04', '', 3),
(16, 'user', 'test', 'user6@hotmail.com', '00000000', '0206-06-04', '', 3),
(17, 'ali', 'xyz', 'user7@hotmail.com', '00000000', '0206-06-04', '', 3),
(18, 'ali', 'test', 'user8@hotmail.com', '00000000', '0206-06-04', '', 3),
(19, 'test', 'test', 'user9@hotmail.com', '00000000', '0206-06-04', '', 3),
(20, 'test', 'test', 'user10@hotmail.com', '00000000', '0206-06-04', '', 4),
(21, 'test', 'test', 'user11@hotmail.com', '00000000', '0206-06-04', '', 4),
(22, 'test', 'test', 'user12@hotmail.com', '00000000', '0206-06-04', '', 4),
(23, 'user', 'test', 'user13@hotmail.com', '00000000', '0206-06-04', '', 4),
(24, 'test', 'test', 'user14@hotmail.com', '00000000', '0206-06-04', '', 4),
(25, 'user', 'test', 'user15@hotmail.com', '00000000', '0206-06-04', '', 4),
(26, 'user', 'test', 'user16@hotmail.com', '00000000', '0206-06-04', '', 4),
(27, 'user', 'test', 'user17@hotmail.com', '00000000', '0206-06-04', '', 5),
(28, 'user', 'test', 'user18@hotmail.com', '00000000', '0206-06-04', '', 5),
(29, 'adel', 'test', 'user71@hotmail.com', '00000000', '0206-06-04', '', 5),
(30, 'adel', 'test', 'user81@hotmail.com', '00000000', '0206-06-04', '', 5),
(31, 'adel', 'test', 'user91@hotmail.com', '00000000', '0206-06-04', '', 5),
(32, 'adel', 'test', 'user110@hotmail.com', '00000000', '0206-06-04', '', 5),
(33, 'adel', 'test', 'user13@hotmail.com', '00000000', '0206-06-04', '', 5),
(34, 'adel', 'test', 'user132@hotmail.com', '00000000', '0206-06-04', '', 5),
(35, 'adel', 'test', 'user153@hotmail.com', '00000000', '0206-06-04', '', 5),
(36, 'user', 'test', 'user174@hotmail.com', '00000000', '0206-06-04', '', 6),
(37, 'user', 'test', 'user1565@hotmail.com', '00000000', '0206-06-04', '', 6),
(38, 'user', 'test', 'user1645@hotmail.com', '00000000', '0206-06-04', '', 6),
(39, 'user', 'test', 'user175@hotmail.com', '00000000', '0206-06-04', '', 6),
(40, 'user', 'test', 'user128@hotmail.com', '00000000', '0206-06-04', '', 6),
(41, 'hisham', 'test', 'user1368@hotmail.com', '00000000', '0206-06-04', '', 7),
(42, 'user', 'test', 'user7451@hotmail.com', '00000000', '0206-06-04', '', 7),
(43, 'user', 'test', 'user8451@hotmail.com', '00000000', '0206-06-04', '', 7),
(44, 'adel', 'test', 'user916@hotmail.com', '00000000', '0206-06-04', '', 7),
(45, 'user', 'test', 'user11670@hotmail.com', '00000000', '0206-06-04', '', 7),
(46, 'user', 'test', 'user1354@hotmail.com', '00000000', '0206-06-04', '', 7),
(47, 'user', 'test', 'user13f2@hotmail.com', '00000000', '0206-06-04', '', 7),
(48, 'adel', 'test', 'user15vcb3@hotmail.com', '00000000', '0206-06-04', '', 7),
(49, 'user', 'test', 'user17er4@hotmail.com', '00000000', '0206-06-04', '', 7),
(50, 'user', 'test', 'user15ert65@hotmail.com', '00000000', '0206-06-04', '', 7),
(51, 'hisham', 'test', 'user164er3t5@hotmail.com', '00000000', '0206-06-04', '', 7),
(52, 'user', 'test', 'user172jhghj3@hotmail.com', '00000000', '0206-06-04', '', 7),
(53, 'user', 'test', 'user176898@hotmail.com', '00000000', '0206-06-04', '', 8),
(54, 'user', 'test', 'user1435410@hotmail.com', '00000000', '0206-06-04', '', 8),
(55, 'hisham', 'test', 'user16541@hotmail.com', '00000000', '0206-06-04', '', 8),
(56, 'user', 'test', 'user14354332@hotmail.com', '00000000', '0206-06-04', '', 8),
(57, 'hisham', 'test', 'user1454353@hotmail.com', '00000000', '0206-06-04', '', 8),
(58, 'user', 'test', 'user1453474@hotmail.com', '00000000', '0206-06-04', '', 8),
(59, 'user', 'test', 'user435431565@hotmail.com', '00000000', '0206-06-04', '', 8),
(60, 'hisham', 'test', 'user1634543545@hotmail.com', '00000000', '0206-06-04', '', 8),
(61, 'user', 'test', 'user4517435435@hotmail.com', '00000000', '0206-06-04', '', 8),
(62, 'user', 'test', 'user1454328@hotmail.com', '00000000', '0206-06-04', '', 8),
(63, 'user', 'test', 'user4541368@hotmail.com', '00000000', '0206-06-04', '', 8),
(64, 'hisham', 'test', 'us45er45457451@hotmail.com', '00000000', '0206-06-04', '', 8),
(65, 'user', 'test', 'us454er8451@hotmail.com', '00000000', '0206-06-04', '', 8),
(66, 'user', 'test', 'user4543916@hotmail.com', '00000000', '0206-06-04', '', 9),
(67, 'hisham', 'test', 'use454r11670@hotmail.com', '00000000', '0206-06-04', '', 9),
(68, 'hisham', 'test', 'user13635434@hotmail.com', '00000000', '0206-06-04', '', 9),
(69, 'user', 'test', 'user13f43542@hotmail.com', '00000000', '0206-06-04', '', 9),
(70, 'user', 'test', 'user15vc454b3@hotmail.com', '00000000', '0206-06-04', '', 9),
(71, 'hisham', 'test', 'user17er4544@hotmail.com', '00000000', '0206-06-04', '', 9),
(72, 'user', 'test', 'user15er4354t65@hotmail.com', '00000000', '0206-06-04', '', 9),
(73, 'hisham', 'test', 'user164er4353453t5@hotmail.com', '00000000', '0206-06-04', '', 9),
(74, 'user', 'test', 'user172jhg45435hj3@hotmail.com', '00000000', '0206-06-04', '', 9),
(75, 'hisham', 'test', 'user1768945458@hotmail.com', '00000000', '0206-06-04', '', 9),
(76, 'ali', 'shkeir', 'ali@gmail.com', '4546868486468', '2021-01-26', '1611575071_download.png', 1),
(77, 'ali', 'shkeir', 'ali1@gmail.com', '545545555', '2021-01-12', '1611575097_download.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_attendance`
--

CREATE TABLE `student_attendance` (
  `studentID` bigint UNSIGNED NOT NULL,
  `attendanceID` bigint UNSIGNED NOT NULL,
  `attendanceEntry` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `username`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Hisham', 'Hisham@gmail.com', NULL, '$2y$10$ltzKXX1zva0hOUAP7QOdWezGNanJTXM6KyK5zVs8T5sTN95tRVKie', NULL, '2021-01-25 08:14:08', '2021-01-25 08:14:08'),
(2, 'alishkeir', 'ali@gmail.com', NULL, '$2y$10$mUZVBJ0oZ/kJUoL4HJHIYe/gM5GfO/KPjfm7ZLouBu7DwLgm/k69O', NULL, '2021-01-25 09:46:13', '2021-01-25 09:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sections_classid_foreign` (`classID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_sectionid_foreign` (`sectionID`);

--
-- Indexes for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD KEY `student_attendance_studentid_foreign` (`studentID`),
  ADD KEY `student_attendance_attendanceid_foreign` (`attendanceID`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teachers_username_unique` (`username`),
  ADD UNIQUE KEY `teachers_email_unique` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_classid_foreign` FOREIGN KEY (`classID`) REFERENCES `classes` (`id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_sectionid_foreign` FOREIGN KEY (`sectionID`) REFERENCES `sections` (`id`);

--
-- Constraints for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD CONSTRAINT `student_attendance_attendanceid_foreign` FOREIGN KEY (`attendanceID`) REFERENCES `attendance` (`id`),
  ADD CONSTRAINT `student_attendance_studentid_foreign` FOREIGN KEY (`studentID`) REFERENCES `students` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
