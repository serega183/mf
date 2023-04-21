-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: mf_mysql_01
-- Время создания: Апр 18 2023 г., 20:16
-- Версия сервера: 8.0.32
-- Версия PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mf_mysql_01`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id_cat` int NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `cat_discr` varchar(255) NOT NULL,
  `cat_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id_cat`, `cat_name`, `cat_discr`, `cat_img`) VALUES
(172, 'Алкогольные напитки', 'Напитки содержащие алкоголь.', '/categories/cat_02.jpg'),
(173, 'Нижнее бельё', 'Бельё которое одевают под врхнюю одежду', '/categories/cat_03.jpg'),
(174, 'Сувениры', 'Предметы интерьера для красоты', '/categories/cat_04.jpg'),
(175, 'Детские игрушки', 'Игрушки для детей от нуля до 65 лет', '/categories/cat_02.jpg'),
(176, 'Шурупы', 'Метизы для соединения предметов.', '/categories/cat_01.jpg'),
(206, 'Yjdfz rfntujhbz', '', '/categories/cat_01.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `status` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Новый',
  `time` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` decimal(11,0) NOT NULL,
  `street` varchar(100) NOT NULL,
  `house` varchar(30) NOT NULL,
  `apartment` varchar(10) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `cart` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `date`, `status`, `time`, `name`, `phone`, `street`, `house`, `apartment`, `comment`, `cart`) VALUES
(35, '2023-04-15', 'Новый', '13:57', 'Сергей', 89600160061, 'Ленина', '53', '39', 'Мой заказ самый важный!', '{\"645\": {\"count\": 1, \"product\": {\"id\": 645, \"name\": \"Продукт_dsd\", \"image\": \"/products/prod_03.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Алкогольные напитки\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.07 / 22:15\"}}, \"659\": {\"count\": 1, \"product\": {\"id\": 659, \"name\": \"Продукт_aaaaaaaaaaaaa\", \"image\": \"/products/prod_02.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.09 / 19:24\"}}, \"665\": {\"count\": 1, \"product\": {\"id\": 665, \"name\": \"efsfsffsfsfsdfsf\", \"image\": \"/\", \"maker\": \"\", \"price\": \"23\", \"stock\": 0, \"units\": \"123\", \"edinic\": \"1\", \"param1\": \"\", \"param2\": \"\", \"param3\": \"\", \"rating\": 0, \"balance\": 312, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"\", \"publicationdate\": \"2023.04.14 / 22:00\"}}}'),
(36, '2023-04-16', 'Новый', '13:57', 'Мария', 89600160025, 'Ленина', '53', '39', 'Мой заказ самый важный!', '{\"645\": {\"count\": 1, \"product\": {\"id\": 645, \"name\": \"Продукт_dsd\", \"image\": \"/products/prod_03.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Алкогольные напитки\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.07 / 22:15\"}}, \"659\": {\"count\": 1, \"product\": {\"id\": 659, \"name\": \"Продукт_aaaaaaaaaaaaa\", \"image\": \"/products/prod_02.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.09 / 19:24\"}}, \"665\": {\"count\": 1, \"product\": {\"id\": 665, \"name\": \"efsfsffsfsfsdfsf\", \"image\": \"/\", \"maker\": \"\", \"price\": \"23\", \"stock\": 0, \"units\": \"123\", \"edinic\": \"1\", \"param1\": \"\", \"param2\": \"\", \"param3\": \"\", \"rating\": 0, \"balance\": 312, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"\", \"publicationdate\": \"2023.04.14 / 22:00\"}}}'),
(37, '2023-04-14', 'Новый', '13:57', 'Ноунэйм', 89600160061, 'Ленина', '53', '39', 'Мой заказ самый важный!', '{\"645\": {\"count\": 1, \"product\": {\"id\": 645, \"name\": \"Продукт_dsd\", \"image\": \"/products/prod_03.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Алкогольные напитки\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.07 / 22:15\"}}, \"659\": {\"count\": 1, \"product\": {\"id\": 659, \"name\": \"Продукт_aaaaaaaaaaaaa\", \"image\": \"/products/prod_02.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.09 / 19:24\"}}, \"665\": {\"count\": 1, \"product\": {\"id\": 665, \"name\": \"efsfsffsfsfsdfsf\", \"image\": \"/\", \"maker\": \"\", \"price\": \"23\", \"stock\": 0, \"units\": \"123\", \"edinic\": \"1\", \"param1\": \"\", \"param2\": \"\", \"param3\": \"\", \"rating\": 0, \"balance\": 312, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"\", \"publicationdate\": \"2023.04.14 / 22:00\"}}}'),
(38, '2023-04-14', 'Новый', '13:57', 'Безымянный', 89600160061, 'Ленина', '53', '39', 'Мой заказ самый важный!', '{\"645\": {\"count\": 1, \"product\": {\"id\": 645, \"name\": \"Продукт_dsd\", \"image\": \"/products/prod_03.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Алкогольные напитки\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.07 / 22:15\"}}, \"659\": {\"count\": 1, \"product\": {\"id\": 659, \"name\": \"Продукт_aaaaaaaaaaaaa\", \"image\": \"/products/prod_02.jpg\", \"maker\": \"Производитель\", \"price\": \"10\", \"stock\": 0, \"units\": \"шт, гр, л, упак и т.п.\", \"edinic\": \"1\", \"param1\": \"param1\", \"param2\": \"param2\", \"param3\": \"param3\", \"rating\": 2, \"balance\": 15, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"Описание\", \"publicationdate\": \"2023.04.09 / 19:24\"}}, \"665\": {\"count\": 1, \"product\": {\"id\": 665, \"name\": \"efsfsffsfsfsdfsf\", \"image\": \"/\", \"maker\": \"\", \"price\": \"23\", \"stock\": 0, \"units\": \"123\", \"edinic\": \"1\", \"param1\": \"\", \"param2\": \"\", \"param3\": \"\", \"rating\": 0, \"balance\": 312, \"category\": \"Нижнее бельё, Алкогольные напитки, Сувениры\", \"description\": \"\", \"publicationdate\": \"2023.04.14 / 22:00\"}}}');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `edinic` varchar(30) NOT NULL,
  `units` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'шт',
  `price` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `balance` int NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rating` int NOT NULL,
  `maker` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `param1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `param2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `param3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `publicationdate` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `edinic`, `units`, `price`, `balance`, `stock`, `image`, `description`, `rating`, `maker`, `param1`, `param2`, `param3`, `publicationdate`) VALUES
(645, 'Продукт_dsd', 'Алкогольные напитки', '1', 'шт, гр, л, упак и т.п.', '10', 15, 0, '/products/prod_03.jpg', 'Описание', 2, 'Производитель', 'param1', 'param2', 'param3', '2023.04.07 / 22:15'),
(655, 'Продукт_', 'Нижнее бельё', '1', 'шт, гр, л, упак и т.п.', '10', 15, 0, '/products/prod_03.jpg', 'Описание', 2, 'Производитель', 'param1', 'param2', 'param3', '2023.04.08 / 01:46'),
(656, 'Продукт_', 'Нижнее бельё', '1', 'шт, гр, л, упак и т.п.', '10', 15, 0, '/products/prod_04.jpg', 'Описание', 2, 'Производитель', 'param1', 'param2', 'param3', '2023.04.08 / 01:46'),
(658, 'Продукт_', 'Нижнее бельё', '1', 'шт, гр, л, упак и т.п.', '10', 15, 0, '/products/prod_05.jpg', 'Описание', 2, 'Производитель', 'param1', 'param2', 'param3', '2023.04.09 / 19:24'),
(659, 'Продукт_aaaaaaaaaaaaa', 'Нижнее бельё, Алкогольные напитки, Сувениры', '1', 'шт, гр, л, упак и т.п.', '10', 15, 0, '/products/prod_02.jpg', 'Описание', 2, 'Производитель', 'param1', 'param2', 'param3', '2023.04.09 / 19:24'),
(663, 'dsdsfgr', 'Нижнее бельё', '1', '123', '1231', 123, 0, '/', '', 0, '', '', '', '', '2023.04.14 / 21:55'),
(664, 'dfsdf', 'Нижнее бельё', '1111', '123', '1231', 123, 0, '/', '', 0, '', '', '', '', '2023.04.14 / 21:55'),
(665, 'efsfsffsfsfsdfsf', 'Нижнее бельё, Алкогольные напитки, Сувениры', '1', '123', '23', 312, 0, '/', '', 0, '', '', '', '', '2023.04.14 / 22:00');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `name` varchar(15) NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `likes` varchar(15) NOT NULL,
  `orders` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `name`, `email`, `likes`, `orders`) VALUES
(1, 'aaa', 'sss', 'Дима', '05@mail.ru', '1,4', '5,23');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_cat`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id_cat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=207;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
