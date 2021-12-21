-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 21, 2021 at 07:28 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `belajar_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `class_rooms`
--

CREATE TABLE `class_rooms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `school_year` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_rooms`
--

INSERT INTO `class_rooms` (`id`, `class_id`, `teacher_id`, `created_at`, `updated_at`, `school_year`) VALUES
(1, '1', 16, '2021-12-19 00:55:52', '2021-12-19 01:53:33', '2021'),
(2, '2', 14, '2021-12-19 00:56:35', '2021-12-19 00:56:35', '2021'),
(4, '2', 14, '2021-12-19 01:42:17', '2021-12-19 01:42:17', '2022'),
(5, '5', 18, '2021-12-19 02:51:48', '2021-12-19 02:51:48', '2021'),
(7, '6', 18, '2021-12-19 02:57:54', '2021-12-19 02:57:54', '2021'),
(8, '7', 18, '2021-12-19 03:00:03', '2021-12-19 03:00:03', '2021');

-- --------------------------------------------------------

--
-- Table structure for table `class_room_students`
--

CREATE TABLE `class_room_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_room_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_room_students`
--

INSERT INTO `class_room_students` (`id`, `class_room_id`, `student_id`, `created_at`, `updated_at`) VALUES
(1, 2, 2, '2021-12-19 04:44:03', '2021-12-19 04:44:03'),
(2, 2, 3, '2021-12-19 04:47:19', '2021-12-19 04:47:19'),
(3, 7, 3, '2021-12-19 15:38:38', '2021-12-19 15:38:38'),
(4, 7, 2, '2021-12-19 15:39:30', '2021-12-19 15:39:30'),
(5, 5, 3, '2021-12-19 15:41:22', '2021-12-19 15:41:22'),
(6, 5, 2, '2021-12-19 15:41:27', '2021-12-19 15:41:27'),
(7, 1, 3, '2021-12-19 17:28:25', '2021-12-19 17:28:25'),
(8, 1, 2, '2021-12-19 17:28:34', '2021-12-19 17:28:34');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `master_classes`
--

CREATE TABLE `master_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `master_classes`
--

INSERT INTO `master_classes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Kelas 1', '2021-12-19 00:55:52', '2021-12-19 00:55:52'),
(2, 'Kelas 2', '2021-12-19 00:56:35', '2021-12-19 00:56:35'),
(5, 'Kelas 3', '2021-12-19 02:51:48', '2021-12-19 02:51:48'),
(6, 'Kelas 4', '2021-12-19 02:57:41', '2021-12-19 02:57:41'),
(7, 'Kelas 5', '2021-12-19 03:00:03', '2021-12-19 03:00:03');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(11, '2014_10_12_000000_create_users_table', 1),
(12, '2014_10_12_100000_create_password_resets_table', 1),
(13, '2019_08_19_000000_create_failed_jobs_table', 1),
(14, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(15, '2021_12_17_020957_create_roles_table', 1),
(16, '2021_12_17_021027_create_user_accesses_table', 1),
(17, '2021_12_17_021053_create_students_table', 1),
(18, '2021_12_17_021111_create_teachers_table', 1),
(19, '2021_12_17_021152_create_class_rooms_table', 1),
(20, '2021_12_17_023013_create_master_classes_table', 1),
(21, '2021_12_19_065803_create_class_room_students_table', 2);

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
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2021-12-18 02:13:27', NULL),
(2, 'Guru', '2021-12-18 02:13:53', NULL),
(3, 'Siswa', '2021-12-18 02:13:56', NULL),
(4, 'Kepala Sekolah', '2021-12-18 02:14:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place_of_birth` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('L','P') COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `guardian_parent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `nis`, `place_of_birth`, `date_of_birth`, `gender`, `address`, `guardian_parent`, `user_id`, `created_at`, `updated_at`) VALUES
(2, '9848001', 'Malang 2', '1992-07-27', 'P', 'Jln Malang', 'Ahmad Zainai', 30, '2021-12-18 00:23:18', '2021-12-18 00:23:18'),
(3, '894840001', 'Jakarta', '2021-12-02', 'P', 'Jakarta Selatan - Indonesia', 'Amak H', 34, '2021-12-18 02:31:57', '2021-12-18 02:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nuptk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place_of_birth` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL DEFAULT current_timestamp(),
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('L','P') COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `nuptk`, `place_of_birth`, `date_of_birth`, `position`, `gender`, `address`, `user_id`, `created_at`, `updated_at`) VALUES
(14, '3843747394309', 'Malang', '1992-07-27', 'Guru Kelas', 'L', 'Jln Mangga Dua Nomor 32', 10, '2021-12-17 22:28:00', '2021-12-17 22:28:00'),
(16, '3843637394309', 'Malang', '1992-07-27', 'Guru Kelas', 'L', 'Jln Mangga Dua Nomor 32', 26, '2021-12-17 22:36:29', '2021-12-17 22:36:29'),
(18, '76474370001', 'Lombok', '2021-12-02', 'Guru Mapel', 'P', 'Dompu NTB', 31, '2021-12-18 01:22:48', '2021-12-18 01:22:48'),
(19, '008388838', 'Lombok', '2021-12-10', 'Guru', 'P', 'Dompu Nusa Tenggara barat - indonesia', 32, '2021-12-18 01:44:09', '2021-12-18 01:48:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(10, 'Kasey Ullrich', 'wratke@example.net', '2021-12-17 19:15:21', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, '2021-12-17 19:15:21', '2021-12-17 19:15:21'),
(11, 'Connor Schroeder', 'aboyer@example.org', '2021-12-17 19:15:47', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, '2021-12-17 19:15:47', '2021-12-17 19:15:47'),
(12, 'Laura Klocko', 'bhermann@example.org', '2021-12-17 19:16:03', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 4, '2021-12-17 19:16:03', '2021-12-17 19:16:03'),
(13, 'Layne Anderson PhD', 'gerald38@example.org', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(14, 'Brenna Block', 'bpredovic@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(15, 'Mr. Easton Cummings MD', 'elenora.parisian@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(16, 'Aimee O\'Reilly III', 'nasir87@example.com', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(17, 'Dee Rippin', 'kaylie.torphy@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(18, 'Dorian Roob', 'camilla27@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(19, 'Ms. Ruthe Schmidt Sr.', 'zemlak.ludie@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(20, 'Delaney Cole', 'cristian.watsica@example.org', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 19:16:14'),
(21, 'Alexandrine Reynolds PhD', 'leonel.pouros@example.net', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 21:24:02'),
(22, 'Mr. Brian Wuckert IV', 'horace.rippin@example.com', '2021-12-17 19:16:14', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 3, '2021-12-17 19:16:14', '2021-12-17 21:19:09'),
(30, 'Widia', 'widia@samole.com', '2021-12-18 00:23:18', '$2y$10$vulFmEnC7mhqwAiH5l4Tbu6XfBR.6fpoDbRp8ziuX/Uca0T9pFOWC', 3, '2021-12-18 00:23:18', '2021-12-18 00:23:18'),
(31, 'Santi Yani', 'santi@email.com', '2021-12-18 01:22:48', '$2y$10$iawNw8y2W8uCZkQXEY3r4.ZU6YV56D6.8aN1kRFghA2qkU4XP6u9m', 2, '2021-12-18 01:22:48', '2021-12-18 01:22:48'),
(32, 'Amanah', 'amanah@email.com', '2021-12-18 01:44:09', '$2y$10$M3.BDZYhzOQqTC4pbe/qZ.MKPsqcSpcZRVYKetgva9DZnMNVZODTG', 2, '2021-12-18 01:44:09', '2021-12-18 01:48:50'),
(33, 'Ahmad Muksin', 'muksin@email.com', '2021-12-18 02:09:10', '$2y$10$0Ei6AUr/0iwevwtv0NxLh.PPQjYK2i6ovruwcSRKdi19HygdjNYe2', 4, '2021-12-18 02:09:10', '2021-12-18 02:09:10'),
(34, 'Handayani', 'handa@yahoo.com', '2021-12-18 02:31:57', '$2y$10$VxW0XAxpwG2hEm2CLkH9LujG8U2hKQ011dNbaWeKkVuljCd7x8Yda', 3, '2021-12-18 02:31:57', '2021-12-18 02:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `user_accesses`
--

CREATE TABLE `user_accesses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_access` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class_rooms`
--
ALTER TABLE `class_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_room_students`
--
ALTER TABLE `class_room_students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `master_classes`
--
ALTER TABLE `master_classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `master_classes_name_unique` (`name`) USING BTREE;

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
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_nis_unique` (`nis`),
  ADD UNIQUE KEY `students_user_id_unique` (`user_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teachers_nuptk_unique` (`nuptk`),
  ADD UNIQUE KEY `teachers_user_id_unique` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_accesses`
--
ALTER TABLE `user_accesses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_rooms`
--
ALTER TABLE `class_rooms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `class_room_students`
--
ALTER TABLE `class_room_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `master_classes`
--
ALTER TABLE `master_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_accesses`
--
ALTER TABLE `user_accesses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
