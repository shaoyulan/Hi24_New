-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- 主機: localhost:8889
-- 產生時間： 2018-12-18 08:37:12
-- 伺服器版本: 5.6.34-log
-- PHP 版本： 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `hi24`
--

-- --------------------------------------------------------

--
-- 資料表結構 `header_ad`
--

CREATE TABLE `header_ad` (
  `id` int(11) NOT NULL,
  `ad_stat` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `img_url` varchar(90) COLLATE utf8_unicode_ci NOT NULL,
  `caption_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `caption_text` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `header_ad`
--

INSERT INTO `header_ad` (`id`, `ad_stat`, `img_url`, `caption_stat`, `caption_text`) VALUES
(1, 'item active', 'images/in_img/b01.jpg', 'carousel-caption', 'Caption 1'),
(2, 'item', 'images/in_img/b02.jpg', NULL, NULL),
(3, 'item', 'http://placehold.it/1900x1080&text=Slide Three', 'carousel-caption', 'Caption 3');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `name`, `password`) VALUES
(1, 'shao', 'root');

-- --------------------------------------------------------

--
-- 資料表結構 `product_default_photos`
--

CREATE TABLE `product_default_photos` (
  `id` int(11) NOT NULL,
  `inner_photo1` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo2` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo3` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo4` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `product_default_photos`
--

INSERT INTO `product_default_photos` (`id`, `inner_photo1`, `inner_photo2`, `inner_photo3`, `inner_photo4`, `product_list_ref`) VALUES
(1, 'images/women/sweater/sw001a-1.jpg', 'images/women/sweater/sw001a-2.jpg', 'images/women/sweater/sw001a-3.jpg', 'images/women/sweater/sw001a-4.jpg', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `product_item_detail`
--

CREATE TABLE `product_item_detail` (
  `id` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `item_id` int(11) NOT NULL,
  `color` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `main_photo_substitute` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `product_item_detail`
--

INSERT INTO `product_item_detail` (`id`, `title`, `item_id`, `color`, `size`, `main_photo_substitute`, `product_list_ref`) VALUES
(1, '麻花卡其', 1, '/images/women/sweater/sw001ai-1.jpg', 'S', '/images/women/sweater/sw001a.jpg', 1),
(2, '麻花奶油', 2, '/images/women/sweater/sw001ai-2.jpg', 'S', '/images/women/sweater/sw001b.jpg', 1),
(3, '麻花深黑', 3, '/images/women/sweater/sw001ai-3.jpg', 'L', '/images/women/sweater/sw001c.jpg', 1),
(4, '麻花深黑', 4, '/images/women/sweater/sw001ai-3.jpg', 'XL', '/images/women/sweater/sw001c.jpg', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `product_list`
--

CREATE TABLE `product_list` (
  `id` int(11) NOT NULL,
  `active_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity_text` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_url_itemonly` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `img_url_withmodel` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `price_org` int(11) NOT NULL,
  `price_dis` int(11) NOT NULL,
  `category_main` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `category_sub` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `product_list`
--

INSERT INTO `product_list` (`id`, `active_stat`, `activity_text`, `img_url_itemonly`, `img_url_withmodel`, `title`, `price_org`, `price_dis`, `category_main`, `category_sub`) VALUES
(1, 'p_active_media', 'sale', 'images/men/accessories/a001a.jpg', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(2, 'p_active_media bg_g', 'new', 'images/men/coat/ct001a.jpg', 'images/men/coat/ct001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(3, '', '', 'images/men/home$inside/h002a.jpg', 'images/men/home$inside/h002a-2.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'women', 'coat'),
(4, '', '', 'images/women/sweater/sw001a.jpg', 'images/women/sweater/sw001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'kid', 'upper'),
(5, '', '', 'images/women/shirt/s004a.jpg', 'images/women/shirt/s004a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'shoes'),
(6, '', '', 'images/women/sweater/sw002a.jpg', 'images/women/sweater/sw002a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 261, 'women', 'upper'),
(7, '', '', 'images/women/coat/ct003a.jpg', 'images/women/coat/ct003a-3.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper'),
(8, '', '', 'images/women/sweater/sw004a.jpg', 'images/women/sweater/sw004a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'kid', 'upper'),
(9, '', '', 'images/men/accessories/a001a.jpg\r\n', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-女', 290, 260, 'men', 'upper');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `header_ad`
--
ALTER TABLE `header_ad`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product_default_photos`
--
ALTER TABLE `product_default_photos`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product_item_detail`
--
ALTER TABLE `product_item_detail`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `header_ad`
--
ALTER TABLE `header_ad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `product_default_photos`
--
ALTER TABLE `product_default_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `product_item_detail`
--
ALTER TABLE `product_item_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用資料表 AUTO_INCREMENT `product_list`
--
ALTER TABLE `product_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
