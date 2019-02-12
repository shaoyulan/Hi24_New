-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Feb 12, 2019 at 08:35 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hi24_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `memberid` int(11) DEFAULT NULL,
  `orderdate` date NOT NULL,
  `productid` int(11) NOT NULL,
  `detailid` int(11) DEFAULT NULL,
  `itemName` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `size` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `qty` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `memberid`, `orderdate`, `productid`, `detailid`, `itemName`, `price`, `size`, `color`, `qty`, `total`) VALUES
(57, 1, '2019-01-30', 1, 3, '棉質條紋寬領長袖T恤-男', 379, 'L', '麻花深黑', 1, 379);

-- --------------------------------------------------------

--
-- Table structure for table `header_ad`
--

CREATE TABLE `header_ad` (
  `id` int(11) NOT NULL,
  `transition` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `speed` int(11) NOT NULL,
  `page_url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `img_url` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `alt` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `caption_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dataX` int(11) NOT NULL,
  `dataY` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `caption` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `header_ad`
--

INSERT INTO `header_ad` (`id`, `transition`, `speed`, `page_url`, `img_url`, `alt`, `caption_stat`, `dataX`, `dataY`, `title`, `caption`) VALUES
(1, 'fade', 1500, 'product/product.html', 'images/in_img/b01.jpg', 'slidebg1', 'caption dark sfb fadeout tp-caption start', 145, 170, 'New Hi24 Grand Opening', 'UP TO 35% OFF WOMEN’S SWEATER'),
(2, 'zoomout', 1000, 'product/product.html', 'images/in_img/b02.jpg', 'darkblurbg', 'caption dark sfb fadeout tp-caption start', 550, 170, 'END OF SEASON SALE', 'UP TO 35% OFF WOMEN’S SWEATER'),
(3, 'fadetotopfadefrombottom', 1000, 'product/product.html', 'images/in_img/b03.jpg', 'darkblurbg', 'caption dark sfb fadeout tp-caption start', 750, 60, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `country` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `addr` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postcode` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `shippingAddress` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `country`, `username`, `password`, `firstname`, `lastname`, `addr`, `city`, `postcode`, `email`, `tel`, `shippingAddress`) VALUES
(1, '', 'shao', 'root', '劭宇', '藍', '', NULL, NULL, '', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `img_url` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `context` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `img_url`, `title`, `date`, `context`) VALUES
(0, 'images/from_the_blog_01.jpg', '宅配運費調整公告', '2018-12-17', '親愛的會員您好：<br>\r\n					因應宅配運費調整，2019年1月1日起，宅配相關訂單運費，將取消免運優惠，運費統一為60元。<br>\r\n					超商取貨訂單，相關免運及運費計算不變，並請依最新行銷活動為準。<br>'),
(1, 'images/from_the_blog_02.jpg', '重要通知！全面採用電子發票', '2018-10-22', '親愛的會員您好：<br>\r\n				感謝您長期的支持與肯定，為了配合財政部推廣發票電子化及加速您的退款作業程序，自2018/10/19起將全面採用電子發票，您可於出貨24小時後至《 訂單查詢 》中查閱訂單發票內容：'),
(2, 'images/from_the_blog_03.jpg', '宅配運費調整公告', '2018-12-17', '親愛的會員您好：<br>\r\n					因應宅配運費調整，2019年1月1日起，宅配相關訂單運費，將取消免運優惠，運費統一為60元。<br>\r\n					超商取貨訂單，相關免運及運費計算不變，並請依最新行銷活動為準。<br>'),
(3, 'images/from_the_blog_04.jpg', '重要通知！全面採用電子發票', '2018-10-22', '親愛的會員您好：<br>\r\n				感謝您長期的支持與肯定，為了配合財政部推廣發票電子化及加速您的退款作業程序，自2018/10/19起將全面採用電子發票，您可於出貨24小時後至《 訂單查詢 》中查閱訂單發票內容：');

-- --------------------------------------------------------

--
-- Table structure for table `product_default_photos`
--

CREATE TABLE `product_default_photos` (
  `id` int(11) NOT NULL,
  `inner_photo1` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo3` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `inner_photo4` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_default_photos`
--

INSERT INTO `product_default_photos` (`id`, `inner_photo1`, `inner_photo2`, `inner_photo3`, `inner_photo4`, `product_list_ref`) VALUES
(1, 'images/women/sweater/sw001a-1.jpg', 'images/women/sweater/sw001a-2.jpg', 'images/women/sweater/sw001a-3.jpg', 'images/women/sweater/sw001a-4.jpg', 1),
(2, '/images/women/accessories/a001a-1.jpg\r\n', '/images/women/accessories/a001a-2.jpg\r\n', '/images/women/accessories/a001a-3.jpg\r\n', '/images/women/accessories/a001a-4.jpg\r\n', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product_item_detail`
--

CREATE TABLE `product_item_detail` (
  `id` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `item_id` int(11) NOT NULL,
  `color` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `main_photo_substitute` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `product_list_ref` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_item_detail`
--

INSERT INTO `product_item_detail` (`id`, `title`, `item_id`, `color`, `size`, `main_photo_substitute`, `product_list_ref`) VALUES
(1, '麻花卡其', 1, '/images/women/sweater/sw001ai-1.jpg', 'S', '/images/women/sweater/sw001a.jpg', 1),
(2, '麻花奶油', 2, '/images/women/sweater/sw001ai-2.jpg', 'S', '/images/women/sweater/sw001b.jpg', 1),
(3, '麻花深黑', 3, '/images/women/sweater/sw001ai-3.jpg', 'L', '/images/women/sweater/sw001c.jpg', 1),
(4, '麻花深黑', 4, '/images/women/sweater/sw001ai-3.jpg', 'XL', '/images/women/sweater/sw001c.jpg', 1),
(5, '格紋米色', 5, '/images/women/accessories/a001ai-1.jpg', 'S', '/images/women/accessories/a001a-1.jpg', 2),
(6, '格紋咖啡', 6, '/images/women/accessories/a001ai-2.jpg', 'L', '/images/women/accessories/a001a-2.jpg', 2),
(7, '格紋深灰', 7, '/images/women/accessories/a001ai-3.jpg', 'M', '/images/women/accessories/a001a-3.jpg', 2),
(8, '格紋深灰', 8, '/images/women/accessories/a001ai-3.jpg', 'S', '/images/women/accessories/a001a-3.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `id` int(11) NOT NULL,
  `active_stat` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `activity_text` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_url1` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `img_url2` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `price_org` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `price_dis` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `category_main` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `category_sub` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `discount` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`id`, `active_stat`, `activity_text`, `img_url1`, `img_url2`, `title`, `price_org`, `price_dis`, `category_main`, `category_sub`, `discount`) VALUES
(1, '', '', 'images/men/accessories/a001a-2.jpg', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-男', '379', '', 'men', '配件', 'product-price'),
(2, '', '', 'images/women/accessories/a001a-2.jpg', 'images/women/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-女', '299', '', 'women', '配件', 'product-price'),
(3, '', 'SALE', 'images/women/accessories/a002a-2.jpg', 'images/women/accessories/a002a-1.jpg', '棉質條紋寬領長袖T恤-女', '499', '399', 'women', '配件', 'product-price-discount'),
(4, '', '', 'images/men/coat/ct001a-2.jpg', 'images/men/coat/ct001a-1.jpg', '棉質條紋寬領長袖T恤-男', '999', '', 'kid', '外套', 'product-price'),
(5, '', '', 'images/women/home&inside/h002a-2.jpg', 'images/women/home&inside/h002a-1.jpg', '棉質條紋寬領長袖T恤-女', '999', '', 'men', '居家', 'product-price'),
(6, '', '', 'images/women/shirt/s004a-2.jpg', 'images/women/shirt/s004a-1.jpg', '棉質條紋寬領長袖T恤-男', '999', '', 'men', '外套', 'product-price'),
(7, '', '', 'images/women/coat/ct003a.jpg', 'images/women/coat/ct003a-3.jpg', '棉質條紋寬領長袖T恤-女', '290', '260', 'men', 'upper', ''),
(8, '', '', 'images/women/sweater/sw004a.jpg', 'images/women/sweater/sw004a-1.jpg', '棉質條紋寬領長袖T恤-女', '290', '260', 'kid', 'upper', ''),
(9, '', '', 'images/men/accessories/a001a.jpg\r\n', 'images/men/accessories/a001a-1.jpg', '棉質條紋寬領長袖T恤-女', '290', '260', 'men', 'upper', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `header_ad`
--
ALTER TABLE `header_ad`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_default_photos`
--
ALTER TABLE `product_default_photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_item_detail`
--
ALTER TABLE `product_item_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `header_ad`
--
ALTER TABLE `header_ad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `product_default_photos`
--
ALTER TABLE `product_default_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `product_item_detail`
--
ALTER TABLE `product_item_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
