-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mag 25, 2015 alle 10:08
-- Versione del server: 5.1.71-community-log
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `my_explico`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `AGENZIA`
--

CREATE TABLE IF NOT EXISTS `AGENZIA` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `NUM_IMPIEGATI` varchar(255) DEFAULT NULL,
  `SITO_WEB` varchar(255) NOT NULL,
  `INDIRIZZO` varchar(100) DEFAULT NULL,
  `CODICE_POSTALE` varchar(100) DEFAULT NULL,
  `PHONE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `AGENZIA`
--

INSERT INTO `AGENZIA` (`ID`, `NOME`, `NUM_IMPIEGATI`, `SITO_WEB`, `INDIRIZZO`, `CODICE_POSTALE`, `PHONE`) VALUES
(4, 'Alpe SRL2', '11 - 15', 'www.google.it', 'address2', '74189', '666'),
(6, 'lucasap123', '16 - 20', 'asdada', 'asdasda', 'sfdsfs', '234232afsdadas'),
(224, 'Giuseppe', '', '', NULL, NULL, NULL),
(225, 'Luca', '', '', NULL, NULL, NULL),
(226, 'Luca', '', '', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `CERTIFICATION`
--

CREATE TABLE IF NOT EXISTS `CERTIFICATION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `INSTITUTE` varchar(50) NOT NULL,
  `DATE` date NOT NULL,
  `CERTIFICATION` varchar(50) NOT NULL,
  `LEVEL` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `USER_ID` (`USER_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dump dei dati per la tabella `CERTIFICATION`
--

INSERT INTO `CERTIFICATION` (`ID`, `USER_ID`, `INSTITUTE`, `DATE`, `CERTIFICATION`, `LEVEL`) VALUES
(10, 100, 'Cooperativa Bislacchi', '2007-05-05', 'Ubriaco del giorno', 'Intermediate');

-- --------------------------------------------------------

--
-- Struttura della tabella `CODETABLE`
--

CREATE TABLE IF NOT EXISTS `CODETABLE` (
  `ID_CODETABLE` int(3) NOT NULL,
  `ID_ITEM` int(3) NOT NULL,
  `DESCRIZIONE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_CODETABLE`,`ID_ITEM`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `CODETABLE`
--

INSERT INTO `CODETABLE` (`ID_CODETABLE`, `ID_ITEM`, `DESCRIZIONE`) VALUES
(1, 0, ''),
(1, 1, '0 - 5'),
(1, 2, '6 - 10'),
(1, 3, '11 - 15'),
(1, 4, '16 - 20'),
(1, 5, '21 - 30'),
(1, 6, '31 - 50'),
(1, 7, '+50'),
(2, 0, ''),
(2, 1, 'Andorra'),
(2, 2, 'United Arab Emirates'),
(2, 3, 'Afghanistan'),
(2, 4, 'Antigua and Barbuda'),
(2, 5, 'Anguilla'),
(2, 6, 'Albania'),
(2, 7, 'Armenia'),
(2, 8, 'Netherlands Antilles'),
(2, 9, 'Angola'),
(2, 10, 'Antarctica'),
(2, 11, 'Argentina'),
(2, 12, 'Old style Arpanet'),
(2, 13, 'American Samoa'),
(2, 14, 'Austria'),
(2, 15, 'Australia'),
(2, 16, 'Aruba'),
(2, 17, 'Azerbaidjan'),
(2, 18, 'Bosnia-Herzegovina'),
(2, 19, 'Barbados'),
(2, 20, 'Bangladesh'),
(2, 21, 'Belgium'),
(2, 22, 'Burkina Faso'),
(2, 23, 'Bulgaria'),
(2, 24, 'Bahrain'),
(2, 25, 'Burundi'),
(2, 26, 'Benin'),
(2, 27, 'Bermuda'),
(2, 28, 'Brunei Darussalam'),
(2, 29, 'Bolivia'),
(2, 30, 'Brazil'),
(2, 31, 'Bahamas'),
(2, 32, 'Bhutan'),
(2, 33, 'Bouvet Island'),
(2, 34, 'Botswana'),
(2, 35, 'Belarus'),
(2, 36, 'Belize'),
(2, 37, 'Canada'),
(2, 38, 'Cocos (Keeling) Islands'),
(2, 39, 'Central African Republic'),
(2, 40, 'Congo'),
(2, 41, 'Switzerland'),
(2, 42, 'Ivory Coast (Cote D Ivoire)'),
(2, 43, 'Cook Islands'),
(2, 44, 'Chile'),
(2, 45, 'Cameroon'),
(2, 46, 'China'),
(2, 47, 'Colombia'),
(2, 48, 'Commercial'),
(2, 49, 'Costa Rica'),
(2, 50, 'Former Czechoslovakia'),
(2, 51, 'Cuba'),
(2, 52, 'Cape Verde'),
(2, 53, 'Christmas Island'),
(2, 54, 'Cyprus'),
(2, 55, 'Czech Republic'),
(2, 56, 'Germany'),
(2, 57, 'Djibouti'),
(2, 58, 'Denmark'),
(2, 59, 'Dominica'),
(2, 60, 'Dominican Republic'),
(2, 61, 'Algeria'),
(2, 62, 'Ecuador'),
(2, 63, 'USA Educational'),
(2, 64, 'Estonia'),
(2, 65, 'Egypt'),
(2, 66, 'Western Sahara'),
(2, 67, 'Eritrea'),
(2, 68, 'Spain'),
(2, 69, 'Ethiopia'),
(2, 70, 'Finland'),
(2, 71, 'Fiji'),
(2, 72, 'Falkland Islands'),
(2, 73, 'Micronesia'),
(2, 74, 'Faroe Islands'),
(2, 75, 'France'),
(2, 76, 'France (European Territory)'),
(2, 77, 'Gabon'),
(2, 78, 'Great Britain'),
(2, 79, 'Grenada'),
(2, 80, 'Georgia'),
(2, 81, 'French Guyana'),
(2, 82, 'Ghana'),
(2, 83, 'Gibraltar'),
(2, 84, 'Greenland'),
(2, 85, 'Gambia'),
(2, 86, 'Guinea'),
(2, 87, 'USA Government'),
(2, 88, 'Guadeloupe (French)'),
(2, 89, 'Equatorial Guinea'),
(2, 90, 'Greece'),
(2, 91, 'S. Georgia & S. Sandwich Isls.'),
(2, 92, 'Guatemala'),
(2, 93, 'Guam (USA)'),
(2, 94, 'Guinea Bissau'),
(2, 95, 'Guyana'),
(2, 96, 'Hong Kong'),
(2, 97, 'Heard and McDonald Islands'),
(2, 98, 'Honduras'),
(2, 99, 'Croatia'),
(2, 100, 'Haiti'),
(2, 101, 'Hungary'),
(2, 102, 'Indonesia'),
(2, 103, 'Ireland'),
(2, 104, 'Israel'),
(2, 105, 'India'),
(2, 106, 'International'),
(2, 107, 'British Indian Ocean Territory'),
(2, 108, 'Iraq'),
(2, 109, 'Iran'),
(2, 110, 'Iceland'),
(2, 111, 'Italy'),
(2, 112, 'Jamaica'),
(2, 113, 'Jordan'),
(2, 114, 'Japan'),
(2, 115, 'Kenya'),
(2, 116, 'Kyrgyzstan'),
(2, 117, 'Cambodia'),
(2, 118, 'Kiribati'),
(2, 119, 'Comoros'),
(2, 120, 'Saint Kitts & Nevis Anguilla'),
(2, 121, 'North Korea'),
(2, 122, 'South Korea'),
(2, 123, 'Kuwait'),
(2, 124, 'Cayman Islands'),
(2, 125, 'Kazakhstan'),
(2, 126, 'Laos'),
(2, 127, 'Lebanon'),
(2, 128, 'Saint Lucia'),
(2, 129, 'Liechtenstein'),
(2, 130, 'Sri Lanka'),
(2, 131, 'Liberia'),
(2, 132, 'Lesotho'),
(2, 133, 'Lithuania'),
(2, 134, 'Luxembourg'),
(2, 135, 'Latvia'),
(2, 136, 'Libya'),
(2, 137, 'Morocco'),
(2, 138, 'Monaco'),
(2, 139, 'Moldavia'),
(2, 140, 'Madagascar'),
(2, 141, 'Marshall Islands'),
(2, 142, 'USA Military'),
(2, 143, 'Macedonia'),
(2, 144, 'Mali'),
(2, 145, 'Myanmar'),
(2, 146, 'Mongolia'),
(2, 147, 'Macau'),
(2, 148, 'Northern Mariana Islands'),
(2, 149, 'Martinique (French)'),
(2, 150, 'Mauritania'),
(2, 151, 'Montserrat'),
(2, 152, 'Malta'),
(2, 153, 'Mauritius'),
(2, 154, 'Maldives'),
(2, 155, 'Malawi'),
(2, 156, 'Mexico'),
(2, 157, 'Malaysia'),
(2, 158, 'Mozambique'),
(2, 159, 'Namibia'),
(2, 160, 'NATO (this was purged in 1996 - see hq.nato.int)'),
(2, 161, 'New Caledonia (French)'),
(2, 162, 'Niger'),
(2, 163, 'Network'),
(2, 164, 'Norfolk Island'),
(2, 165, 'Nigeria'),
(2, 166, 'Nicaragua'),
(2, 167, 'Netherlands'),
(2, 168, 'Norway'),
(2, 169, 'Nepal'),
(2, 170, 'Nauru'),
(2, 171, 'Neutral Zone'),
(2, 172, 'Niue'),
(2, 173, 'New Zealand'),
(2, 174, 'Oman'),
(2, 175, 'Non-Profit Making Organisations (sic)'),
(2, 176, 'Panama'),
(2, 177, 'Peru'),
(2, 178, 'Polynesia (French)'),
(2, 179, 'Papua New Guinea'),
(2, 180, 'Philippines'),
(2, 181, 'Pakistan'),
(2, 182, 'Poland'),
(2, 183, 'Saint Pierre and Miquelon'),
(2, 184, 'Pitcairn Island'),
(2, 185, 'Puerto Rico'),
(2, 186, 'Portugal'),
(2, 187, 'Palau'),
(2, 188, 'Paraguay'),
(2, 189, 'Qatar'),
(2, 190, 'Reunion (French)'),
(2, 191, 'Romania'),
(2, 192, 'Russian Federation'),
(2, 193, 'Rwanda'),
(2, 194, 'Saudi Arabia'),
(2, 195, 'Solomon Islands'),
(2, 196, 'Seychelles'),
(2, 197, 'Sudan'),
(2, 198, 'Sweden'),
(2, 199, 'Singapore'),
(2, 200, 'Saint Helena'),
(2, 201, 'Slovenia'),
(2, 202, 'Svalbard and Jan Mayen Islands'),
(2, 203, 'Slovak Republic'),
(2, 204, 'Sierra Leone'),
(2, 205, 'San Marino'),
(2, 206, 'Senegal'),
(2, 207, 'Somalia'),
(2, 208, 'Suriname'),
(2, 209, 'Saint Tome (Sao Tome) and Principe'),
(2, 210, 'Former USSR'),
(2, 211, 'El Salvador'),
(2, 212, 'Syria'),
(2, 213, 'Swaziland'),
(2, 214, 'Turks and Caicos Islands'),
(2, 215, 'Chad'),
(2, 216, 'French Southern Territories'),
(2, 217, 'Togo'),
(2, 218, 'Thailand'),
(2, 219, 'Tadjikistan'),
(2, 220, 'Tokelau'),
(2, 221, 'Turkmenistan'),
(2, 222, 'Tunisia'),
(2, 223, 'Tonga'),
(2, 224, 'East Timor'),
(2, 225, 'Turkey'),
(2, 226, 'Trinidad and Tobago'),
(2, 227, 'Tuvalu'),
(2, 228, 'Taiwan'),
(2, 229, 'Tanzania'),
(2, 230, 'Ukraine'),
(2, 231, 'Uganda'),
(2, 232, 'United Kingdom'),
(2, 233, 'USA Minor Outlying Islands'),
(2, 234, 'United States'),
(2, 235, 'Uruguay'),
(2, 236, 'Uzbekistan'),
(2, 237, 'Vatican City State'),
(2, 238, 'Saint Vincent & Grenadines'),
(2, 239, 'Venezuela'),
(2, 240, 'Virgin Islands (British)'),
(2, 241, 'Virgin Islands (USA)'),
(2, 242, 'Vietnam'),
(2, 243, 'Vanuatu'),
(2, 244, 'Wallis and Futuna Islands'),
(2, 245, 'Samoa'),
(2, 246, 'Yemen'),
(2, 247, 'Mayotte'),
(2, 248, 'Yugoslavia'),
(2, 249, 'South Africa'),
(2, 250, 'Zambia'),
(2, 251, 'Zaire'),
(2, 252, 'Zimbabwe'),
(3, 0, ''),
(3, 1, 'Afrikanns'),
(3, 2, 'Albanian'),
(3, 3, 'Arabic'),
(3, 4, 'Armenian'),
(3, 5, 'Basque'),
(3, 6, 'Bengali'),
(3, 7, 'Bulgarian'),
(3, 8, 'Catalan'),
(3, 9, 'Cambodian'),
(3, 10, 'Chinese (Mandarin)'),
(3, 11, 'Croation'),
(3, 12, 'Czech'),
(3, 13, 'Danish'),
(3, 14, 'Dutch'),
(3, 15, 'English'),
(3, 16, 'Estonian'),
(3, 17, 'Fiji'),
(3, 18, 'Finnish'),
(3, 19, 'French'),
(3, 20, 'Georgian'),
(3, 21, 'German'),
(3, 22, 'Greek'),
(3, 23, 'Gujarati'),
(3, 24, 'Hebrew'),
(3, 25, 'Hindi'),
(3, 26, 'Hungarian'),
(3, 27, 'Icelandic'),
(3, 28, 'Indonesian'),
(3, 29, 'Irish'),
(3, 30, 'Italian'),
(3, 31, 'Japanese'),
(3, 32, 'Javanese'),
(3, 33, 'Korean'),
(3, 34, 'Latin'),
(3, 35, 'Latvian'),
(3, 36, 'Lithuanian'),
(3, 37, 'Macedonian'),
(3, 38, 'Malay'),
(3, 39, 'Malayalam'),
(3, 40, 'Maltese'),
(3, 41, 'Maori'),
(3, 42, 'Marathi'),
(3, 43, 'Mongolian'),
(3, 44, 'Nepali'),
(3, 45, 'Norwegian'),
(3, 46, 'Persian'),
(3, 47, 'Polish'),
(3, 48, 'Portuguese'),
(3, 49, 'Punjabi'),
(3, 50, 'Quechua'),
(3, 51, 'Romanian'),
(3, 52, 'Russian'),
(3, 53, 'Samoan'),
(3, 54, 'Serbian'),
(3, 55, 'Slovak'),
(3, 56, 'Slovenian'),
(3, 57, 'Spanish'),
(3, 58, 'Swahili'),
(3, 59, 'Swedish '),
(3, 60, 'Tamil'),
(3, 61, 'Tatar'),
(3, 62, 'Telugu'),
(3, 63, 'Thai'),
(3, 64, 'Tibetan'),
(3, 65, 'Tonga'),
(3, 66, 'Turkish'),
(3, 67, 'Ukranian'),
(3, 68, 'Urdu'),
(3, 69, 'Uzbek'),
(3, 70, 'Vietnamese'),
(3, 71, 'Welsh'),
(3, 72, 'Xhosa'),
(4, 0, ''),
(4, 1, 'areonautuca'),
(4, 2, 'mechanics'),
(4, 3, 'history'),
(4, 4, 'sciences'),
(5, 0, ''),
(5, 1, 'translation'),
(5, 2, 'consecutive interpretation'),
(5, 3, 'simultaneous interpretation'),
(5, 4, 'correction'),
(6, 0, ''),
(6, 1, 'AED - United Arab Emirates dirham'),
(6, 2, 'AFN - Afghani'),
(6, 3, 'ALL - Lek'),
(6, 4, 'AMD - Armenian Dram'),
(6, 5, 'ANG - Netherlands Antillian Guilder'),
(6, 6, 'AOA - Kwanza'),
(6, 7, 'ARS - Argentine Peso'),
(6, 8, 'AUD - Australian Dollar'),
(6, 9, 'AWG - Aruban Guilder'),
(6, 10, 'AZN - Azerbaijanian Manat'),
(6, 11, 'BAM - Convertible Marks'),
(6, 12, 'BBD - Barbados Dollar'),
(6, 13, 'BDT - Bangladeshi Taka'),
(6, 14, 'BGN - Bulgarian Lev'),
(6, 15, 'BHD - Bahraini Dinar'),
(6, 16, 'BIF - Burundian Franc'),
(6, 17, 'BMD - Bermudian Dollar (customarily known as Bermuda Dollar)'),
(6, 18, 'BND - Brunei Dollar'),
(6, 19, 'BOB - Boliviano'),
(6, 20, 'BOV - Bolivian Mvdol (Funds code)'),
(6, 21, 'BRL - Brazilian Real'),
(6, 22, 'BSD - Bahamian Dollar'),
(6, 23, 'BTN - Ngultrum'),
(6, 24, 'BWP - Pula'),
(6, 25, 'BYR - Belarussian Ruble'),
(6, 26, 'BZD - Belize Dollar'),
(6, 27, 'CAD - Canadian Dollar'),
(6, 28, 'CDF - Franc Congolais'),
(6, 29, 'CHE - WIR Euro (complementary currency)'),
(6, 30, 'CHF - Swiss Franc'),
(6, 31, 'CHW - WIR Franc (complementary currency)'),
(6, 32, 'CLF - Unidades de formento (Funds code)'),
(6, 33, 'CLP - Chilean Peso'),
(6, 34, 'CNY - Yuan Renminbi'),
(6, 35, 'COP - Colombian Peso'),
(6, 36, 'COU - Unidad de Valor Real'),
(6, 37, 'CRC - Costa Rican Colon'),
(6, 38, 'CUP - Cuban Peso'),
(6, 39, 'CVE - Cape Verde Escudo'),
(6, 40, 'CYP - Cyprus Pound'),
(6, 41, 'CZK - Czech Koruna'),
(6, 42, 'DJF - Djibouti Franc'),
(6, 43, 'DKK - Danish Krone'),
(6, 44, 'DOP - Dominican Peso'),
(6, 45, 'DZD - Algerian Dinar'),
(6, 46, 'EEK - Kroon'),
(6, 47, 'EGP - Egyptian Pound'),
(6, 48, 'ERN - Nakfa'),
(6, 49, 'ETB - Ethiopian Birr'),
(6, 50, 'EUR - Euro'),
(6, 51, 'FJD - Fiji Dollar'),
(6, 52, 'FKP - Falkland Islands Pound'),
(6, 53, 'GBP - Pound Sterling'),
(6, 54, 'GEL - Lari'),
(6, 55, 'GHS - Cedi'),
(6, 56, 'GIP - Gibraltar pound'),
(6, 57, 'GMD - Dalasi'),
(6, 58, 'GNF - Guinea Franc'),
(6, 59, 'GTQ - Quetzal'),
(6, 60, 'GYD - Guyana Dollar'),
(6, 61, 'HKD - Hong Kong Dollar'),
(6, 62, 'HNL - Lempira'),
(6, 63, 'HRK - Croatian Kuna'),
(6, 64, 'HTG - Haiti Gourde'),
(6, 65, 'HUF - Forint'),
(6, 66, 'IDR - Rupiah'),
(6, 67, 'ILS - New Israeli Shekel'),
(6, 68, 'INR - Indian Rupee'),
(6, 69, 'IQD - Iraqi Dinar'),
(6, 70, 'IRR - Iranian Rial'),
(6, 71, 'ISK - Iceland Krona'),
(6, 72, 'JMD - Jamaican Dollar'),
(6, 73, 'JOD - Jordanian Dinar'),
(6, 74, 'JPY - Japanese yen'),
(6, 75, 'KES - Kenyan Shilling'),
(6, 76, 'KGS - Som'),
(6, 77, 'KHR - Riel'),
(6, 78, 'KMF - Comoro Franc'),
(6, 79, 'KPW - North Korean Won'),
(6, 80, 'KRW - South Korean Won'),
(6, 81, 'KWD - Kuwaiti Dinar'),
(6, 82, 'KYD - Cayman Islands Dollar'),
(6, 83, 'KZT - Tenge'),
(6, 84, 'LAK - Kip'),
(6, 85, 'LBP - Lebanese Pound'),
(6, 86, 'LKR - Sri Lanka Rupee'),
(6, 87, 'LRD - Liberian Dollar'),
(6, 88, 'LSL - Loti'),
(6, 89, 'LTL - Lithuanian Litas'),
(6, 90, 'LVL - Latvian Lats'),
(6, 91, 'LYD - Libyan Dinar'),
(6, 92, 'MAD - Moroccan Dirham'),
(6, 93, 'MDL - Moldovan Leu'),
(6, 94, 'MGA - Malagasy Ariary'),
(6, 95, 'MKD - Denar'),
(6, 96, 'MMK - Kyat'),
(6, 97, 'MNT - Tugrik'),
(6, 98, 'MOP - Pataca'),
(6, 99, 'MRO - Ouguiya'),
(6, 100, 'MTL - Maltese Lira'),
(6, 101, 'MUR - Mauritius Rupee'),
(6, 102, 'MVR - Rufiyaa'),
(6, 103, 'MWK - Kwacha'),
(6, 104, 'MXN - Mexican Peso'),
(6, 105, 'MXV - Mexican Unidad de Inversion (UDI) (Funds code)'),
(6, 106, 'MYR - Malaysian Ringgit'),
(6, 107, 'MZN - Metical'),
(6, 108, 'NAD - Namibian Dollar'),
(6, 109, 'NGN - Naira'),
(6, 110, 'NIO - Cordoba Oro'),
(6, 111, 'NOK - Norwegian Krone'),
(6, 112, 'NPR - Nepalese Rupee'),
(6, 113, 'NZD - New Zealand Dollar'),
(6, 114, 'OMR - Rial Omani'),
(6, 115, 'PAB - Balboa'),
(6, 116, 'PEN - Nuevo Sol'),
(6, 117, 'PGK - Kina'),
(6, 118, 'PHP - Philippine Peso'),
(6, 119, 'PKR - Pakistan Rupee'),
(6, 120, 'PLN - Zloty'),
(6, 121, 'PYG - Guarani'),
(6, 122, 'QAR - Qatari Rial'),
(6, 123, 'RON - Romanian New Leu'),
(6, 124, 'RSD - Serbian Dinar'),
(6, 125, 'RUB - Russian Ruble'),
(6, 126, 'RWF - Rwanda Franc'),
(6, 127, 'SAR - Saudi Riyal'),
(6, 128, 'SBD - Solomon Islands Dollar'),
(6, 129, 'SCR - Seychelles Rupee'),
(6, 130, 'SDG - Sudanese Pound'),
(6, 131, 'SEK - Swedish Krona'),
(6, 132, 'SGD - Singapore Dollar'),
(6, 133, 'SHP - Saint Helena Pound'),
(6, 134, 'SKK - Slovak Koruna'),
(6, 135, 'SLL - Leone'),
(6, 136, 'SOS - Somali Shilling'),
(6, 137, 'SRD - Surinam Dollar'),
(6, 138, 'STD - Dobra'),
(6, 139, 'SYP - Syrian Pound'),
(6, 140, 'SZL - Lilangeni'),
(6, 141, 'THB - Baht'),
(6, 142, 'TJS - Somoni'),
(6, 143, 'TMM - Manat'),
(6, 144, 'TND - Tunisian Dinar'),
(6, 145, 'TOP - Paanga'),
(6, 146, 'TRY - New Turkish Lira'),
(6, 147, 'TTD - Trinidad and Tobago Dollar'),
(6, 148, 'TWD - New Taiwan Dollar'),
(6, 149, 'TZS - Tanzanian Shilling'),
(6, 150, 'UAH - Hryvnia'),
(6, 151, 'UGX - Uganda Shilling'),
(6, 152, 'USD - US Dollar'),
(6, 153, 'USN - '),
(6, 154, 'USS - '),
(6, 155, 'UYU - Peso Uruguayo'),
(6, 156, 'UZS - Uzbekistan Som'),
(6, 157, 'VEB - Venezuelan bolívar'),
(6, 158, 'VND - Vietnamese ??ng'),
(6, 159, 'VUV - Vatu'),
(6, 160, 'WST - Samoan Tala'),
(6, 161, 'XAF - CFA Franc BEAC'),
(6, 162, 'XAG - Silver (one Troy ounce)'),
(6, 163, 'XAU - Gold (one Troy ounce)'),
(6, 164, 'XBA - European Composite Unit (EURCO) (Bonds market unit)'),
(6, 165, 'XBB - European Monetary Unit (E.M.U.-6) (Bonds market unit)'),
(6, 166, 'XBC - European Unit of Account 9 (E.U.A.-9) (Bonds market unit)'),
(6, 167, 'XBD - European Unit of Account 17 (E.U.A.-17) (Bonds market unit)'),
(6, 168, 'XCD - East Caribbean Dollar'),
(6, 169, 'XDR - Special Drawing Rights'),
(6, 170, 'XFO - Gold franc (special settlement currency)'),
(6, 171, 'XFU - UIC franc (special settlement currency)'),
(6, 172, 'XOF - CFA Franc BCEAO'),
(6, 173, 'XPD - Palladium (one Troy ounce)'),
(6, 174, 'XPF - CFP franc'),
(6, 175, 'XPT - Platinum (one Troy ounce)'),
(6, 176, 'XTS - Code reserved for testing purposes'),
(6, 177, 'XXX - No currency'),
(6, 178, 'YER - Yemeni Rial'),
(6, 179, 'ZAR - South African Rand'),
(6, 180, 'ZMK - Kwacha'),
(6, 181, 'ZWD - Zimbabwe Dollar'),
(7, 0, ''),
(7, 1, 'Basic'),
(7, 2, 'Intermediate'),
(7, 3, 'Fluency');

-- --------------------------------------------------------

--
-- Struttura della tabella `COMMENT`
--

CREATE TABLE IF NOT EXISTS `COMMENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DATA` date DEFAULT NULL,
  `ID_JOB` int(11) DEFAULT NULL,
  `TIPO_JOB` varchar(20) DEFAULT NULL,
  `ID_AGENZIA` int(11) DEFAULT NULL,
  `COMMENTO` varchar(4096) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `RATING` int(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dump dei dati per la tabella `COMMENT`
--

INSERT INTO `COMMENT` (`ID`, `DATA`, `ID_JOB`, `TIPO_JOB`, `ID_AGENZIA`, `COMMENTO`, `RATING`) VALUES
(1, '2015-04-15', 6, 'CORRECTION', 7, 'COMMENTO 1', 4),
(2, '2015-04-16', 7, 'TRANSLATION', 6, 'COMMENTO 2', 1),
(3, '2015-04-13', 62, 'CORRECTION', 6, 'COMMENTO 3', 4),
(4, '2015-04-14', 8, 'CORRECTION', 6, 'COMMENTO 4', 4),
(5, '2015-04-15', 42, 'TRANSLATION', 6, 'COMMENTO 5', 1),
(6, '2015-04-01', 41, 'TRANSLATION', 4, 'COMMENTO 6', 1),
(10, '2015-04-01', 414, 'TRANSLATION', 4, 'COMMENTO 10', 1),
(9, '2015-04-01', 413, 'TRANSLATION', 4, 'COMMENTO 9', 1),
(8, '2015-04-01', 412, 'TRANSLATION', 4, 'COMMENTO 8', 1),
(7, '2015-04-01', 411, 'TRANSLATION', 4, 'COMMENTO 7', 1),
(11, '2015-04-01', 415, 'TRANSLATION', 4, 'COMMENTO 11', 1),
(12, '2015-04-01', 416, 'TRANSLATION', 4, 'COMMENTO 12', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `EDUCATION`
--

CREATE TABLE IF NOT EXISTS `EDUCATION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `INSTITUTE` varchar(100) NOT NULL,
  `FIELD` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `USER_ID` (`USER_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

--
-- Dump dei dati per la tabella `EDUCATION`
--

INSERT INTO `EDUCATION` (`ID`, `USER_ID`, `INSTITUTE`, `FIELD`) VALUES
(33, 100, 'UniversitÃ di Torino', 'Droghe leggere e molestie');

-- --------------------------------------------------------

--
-- Struttura della tabella `JOBS_CORRECTION`
--

CREATE TABLE IF NOT EXISTS `JOBS_CORRECTION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_TRADUTTORE` int(11) DEFAULT NULL,
  `STATO` varchar(50) NOT NULL,
  `DATA_ASSEGNAZIONE` date NOT NULL,
  `DATA_SCADENZA` date NOT NULL,
  `ID_AGENZIA` int(11) DEFAULT NULL,
  `LINGUA_DA` varchar(50) NOT NULL,
  `LINGUA_A` varchar(50) NOT NULL,
  `JOB_PATH` varchar(128) NOT NULL,
  `TEXT_DONE` varchar(1024) NOT NULL,
  `NUM_KTR` int(11) NOT NULL,
  `PREZZO_KTR` decimal(8,3) NOT NULL,
  `PREZZO_TOT` decimal(8,3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_TRADUTTORE` (`ID_TRADUTTORE`),
  KEY `ID_AGENZIA` (`ID_AGENZIA`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='TABELLA DEI JOBS CORRECTION' AUTO_INCREMENT=34 ;

--
-- Dump dei dati per la tabella `JOBS_CORRECTION`
--

INSERT INTO `JOBS_CORRECTION` (`ID`, `ID_TRADUTTORE`, `STATO`, `DATA_ASSEGNAZIONE`, `DATA_SCADENZA`, `ID_AGENZIA`, `LINGUA_DA`, `LINGUA_A`, `JOB_PATH`, `TEXT_DONE`, `NUM_KTR`, `PREZZO_KTR`, `PREZZO_TOT`) VALUES
(1, 1, 'REVIEW', '1900-04-01', '1900-01-08', 4, 'Italian', 'English', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 12332, '11.110', '21344.230'),
(4, 1, 'CLOSED', '2015-04-23', '2015-01-07', 4, 'German', 'Greek', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 43, '51.110', '21344.230'),
(6, 100, 'REVIEW', '2015-04-23', '2015-01-08', 4, 'Italian', 'English', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 12332, '11.110', '21344.230'),
(7, 100, 'ACTIVE', '2015-04-23', '2015-01-07', 4, 'Italian', 'Greek', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 7474, '11.110', '21344.230'),
(8, 100, 'DECLINED', '2015-04-23', '2015-01-07', 4, 'German', 'Greek', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 43, '51.110', '21344.230'),
(33, NULL, 'COMPETITION', '2015-04-23', '2015-01-07', 4, 'Italian', 'Greek', '2013_08_02.pdf', '<p>testo tradotto preso dal DB', 7474, '11.110', '21344.230');

-- --------------------------------------------------------

--
-- Struttura della tabella `JOBS_TRANSLATION`
--

CREATE TABLE IF NOT EXISTS `JOBS_TRANSLATION` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_TRADUTTORE` int(11) DEFAULT NULL,
  `STATO` varchar(50) NOT NULL DEFAULT 'DISPONIBILE',
  `DATA_ASSEGNAZIONE` date NOT NULL,
  `DATA_SCADENZA` date NOT NULL,
  `ID_AGENZIA` int(11) NOT NULL,
  `LINGUA_DA` varchar(50) NOT NULL,
  `LINGUA_A` varchar(50) NOT NULL,
  `JOB_PATH` varchar(128) NOT NULL,
  `TEXT_DONE` varchar(1024) NOT NULL,
  `NUM_KTR` int(11) NOT NULL,
  `PREZZO_KTR` decimal(8,3) NOT NULL,
  `PREZZO_TOT` decimal(8,3) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_TRADUTTORE` (`ID_TRADUTTORE`),
  KEY `ID_AGENZIA` (`ID_AGENZIA`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='TABELLA DEI JOBS TRANSLATION' AUTO_INCREMENT=9 ;

--
-- Dump dei dati per la tabella `JOBS_TRANSLATION`
--

INSERT INTO `JOBS_TRANSLATION` (`ID`, `ID_TRADUTTORE`, `STATO`, `DATA_ASSEGNAZIONE`, `DATA_SCADENZA`, `ID_AGENZIA`, `LINGUA_DA`, `LINGUA_A`, `JOB_PATH`, `TEXT_DONE`, `NUM_KTR`, `PREZZO_KTR`, `PREZZO_TOT`) VALUES
(1, 1, 'ENGAGMENT', '2015-04-13', '2015-04-30', 4, 'Italian', 'French', '2013_08_02.pdf', '<p>testo tradotto preso dal DB 66</p>', 12332, '11.130', '99.999'),
(2, 100, 'REVIEW', '2015-04-23', '2015-01-08', 4, 'Italian', 'English', '2013_08_02.pdf', '<p>testo tradotto preso dal DB 66 77 88</p>', 12332, '11.110', '21344.230'),
(3, 1, 'REVIEW', '2015-04-23', '2015-01-07', 4, 'Italian', 'Greek', '2013_08_02.pdf', '', 7474, '11.110', '21344.230'),
(4, 1, 'CLOSED', '2015-04-23', '2015-01-07', 4, 'German', 'Greek', '2013_08_02.pdf', '<p>testo tradotto preso dal DB 66 ll</p>', 43, '51.110', '21344.230'),
(5, 100, 'ENGAGMENT', '2015-04-13', '2015-04-30', 4, 'Italian', 'French', '2013_08_02.pdf', '<p>testo tradotto preso dal DB 66</p>', 12332, '11.130', '99.999'),
(7, 100, 'CLOSED', '2015-04-23', '2015-01-07', 4, 'Italian', 'Greek', '2013_08_02.pdf', '<p>asdad</p>', 7474, '11.110', '21344.230'),
(8, 100, 'IN APPROVAL', '2015-04-23', '2015-01-07', 4, 'German', 'Greek', '2013_08_02.pdf', '<p>tr 55</p>', 43, '51.110', '21344.230');

-- --------------------------------------------------------

--
-- Struttura della tabella `LANGUAGE_PAIR`
--

CREATE TABLE IF NOT EXISTS `LANGUAGE_PAIR` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `FROM` varchar(50) NOT NULL,
  `TO` varchar(50) NOT NULL,
  `FIELD` varchar(50) NOT NULL,
  `SERVICE` varchar(50) NOT NULL,
  `PRICE` varchar(50) NOT NULL,
  `CURRENCY` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `USER_ID` (`USER_ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dump dei dati per la tabella `LANGUAGE_PAIR`
--

INSERT INTO `LANGUAGE_PAIR` (`ID`, `USER_ID`, `FROM`, `TO`, `FIELD`, `SERVICE`, `PRICE`, `CURRENCY`) VALUES
(9, 100, 'Italian', 'English', 'sciences', 'simultaneous interpretation', '5.00', 'EUR - Euro'),
(11, 100, 'Afrikanns', 'Armenian', 'areonautuca', 'simultaneous interpretation', '12', 'BBD - Barbados Dollar'),
(14, 100, 'Basque', 'Albanian', 'sciences', 'translation', '25', 'AFN - Afghani');

-- --------------------------------------------------------

--
-- Struttura della tabella `TRADUTTORE`
--

CREATE TABLE IF NOT EXISTS `TRADUTTORE` (
  `ID` int(11) NOT NULL,
  `NOME` varchar(100) NOT NULL,
  `COGNOME` varchar(100) NOT NULL,
  `DATA_NASCITA` date DEFAULT NULL,
  `MADRELINGUA` varchar(100) NOT NULL,
  `HAS_NEW_MESSAGE` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `TRADUTTORE`
--

INSERT INTO `TRADUTTORE` (`ID`, `NOME`, `COGNOME`, `DATA_NASCITA`, `MADRELINGUA`, `HAS_NEW_MESSAGE`) VALUES
(1, 'Luca1', 'Sapone', '1985-12-30', 'Italian', 'N'),
(100, 'Paolo', 'Limonaczxcz', '1986-01-11', 'Czech', 'Y');

-- --------------------------------------------------------

--
-- Struttura della tabella `UTENTE`
--

CREATE TABLE IF NOT EXISTS `UTENTE` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `SALE` varchar(100) NOT NULL,
  `RUOLO` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `CITTA` varchar(100) DEFAULT NULL,
  `PAESE` varchar(100) NOT NULL,
  `IMAGE` varchar(100) DEFAULT NULL,
  `PAYPAL` varchar(100) DEFAULT NULL,
  `IBAN` varchar(50) DEFAULT NULL,
  `VAT` varchar(20) DEFAULT NULL,
  `RATING` int(10) NOT NULL DEFAULT '0',
  `NUM_RATING` int(10) NOT NULL DEFAULT '0',
  `DATA_CREAZIONE` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=227 ;

--
-- Dump dei dati per la tabella `UTENTE`
--

INSERT INTO `UTENTE` (`ID`, `USERNAME`, `PASSWORD`, `SALE`, `RUOLO`, `EMAIL`, `CITTA`, `PAESE`, `IMAGE`, `PAYPAL`, `IBAN`, `VAT`, `RATING`, `NUM_RATING`, `DATA_CREAZIONE`) VALUES
(1, 'mirko90', 'ad691b4db7c9274ba79c90626f0121c7', '889d1f4c248652943c381934ce849a9e', 'TRADUTTORE', 'gterribilio@gmail.com', 'Torino', 'Italy', 'Hydrangeas.jpg', NULL, NULL, '777', 0, 0, '0000-00-00 00:00:00'),
(4, 'agenzia', 'ad691b4db7c9274ba79c90626f0121c7', '889d1f4c248652943c381934ce849a9e', 'AGENZIA', 'gterribilio@y', 'city3', 'United Arab Emirates', 'Hydrangeas.jpg', NULL, NULL, 'vat2', 11, 3, '0000-00-00 00:00:00'),
(6, 'lucasap', '0c390203cde3e58ca49704979c9f9559', '56eabf79be1e4c0c72aa381eaa8694be', 'AGENZIA', 'undefined', 'dfs', 'Austria', NULL, NULL, NULL, 'safsdfsdf', 152, 31, '0000-00-00 00:00:00'),
(100, 'lucasa', 'c4a7daa06e31417873a216845190824b', 'ada60f5df11cc307a1c80b3706060a12', 'TRADUTTORE', 'paolo.lidasdmo@gmail.com', 'Torino', 'Indonesia', 'PicsArt_1402995432128.jpg', NULL, NULL, '123456789', 8, 5, '0000-00-00 00:00:00'),
(224, 'gterribilio@libero.it', '1b9f7752752bae8689edcf9ab566f518', '0b62eb496fac9e0ee9d58d116db84e2a', 'AGENZIA', 'gterribilio@libero.it', '', '', 'imageProfile.jpg', NULL, NULL, NULL, 0, 0, '2015-05-22 14:43:17'),
(225, 'luca.sapone86@gmail.com', 'a7c7fd6fe23646e68207b780a9fc4d6e', '5bbe6c1a1f78ba208732adb45ac7b6a9', 'AGENZIA', 'luca.sapone86@gmail.com', 'Turin Area', ' Italy', 'imageProfile.jpg', NULL, NULL, NULL, 0, 0, '2015-05-22 14:44:23'),
(226, 'hydras_6@msn.com', 'f29cd5a5268fd4fc8a9b056e28419bc2', '1df3181c42c8994a860d3e004a4fe78e', 'AGENZIA', 'hydras_6@msn.com', '', '', 'imageProfile.jpg', NULL, NULL, NULL, 0, 0, '2015-05-23 13:32:59');

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `AGENZIA`
--
ALTER TABLE `AGENZIA`
  ADD CONSTRAINT `my_agenzia_FK` FOREIGN KEY (`ID`) REFERENCES `UTENTE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `CERTIFICATION`
--
ALTER TABLE `CERTIFICATION`
  ADD CONSTRAINT `CERTIFICATION_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `TRADUTTORE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `EDUCATION`
--
ALTER TABLE `EDUCATION`
  ADD CONSTRAINT `education_FK` FOREIGN KEY (`USER_ID`) REFERENCES `TRADUTTORE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `JOBS_TRANSLATION`
--
ALTER TABLE `JOBS_TRANSLATION`
  ADD CONSTRAINT `my_jobs_agenzia_fk` FOREIGN KEY (`ID_AGENZIA`) REFERENCES `AGENZIA` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `my_jobs_traduttore_fk` FOREIGN KEY (`ID_TRADUTTORE`) REFERENCES `TRADUTTORE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `LANGUAGE_PAIR`
--
ALTER TABLE `LANGUAGE_PAIR`
  ADD CONSTRAINT `my_language_pair_FK` FOREIGN KEY (`USER_ID`) REFERENCES `TRADUTTORE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `TRADUTTORE`
--
ALTER TABLE `TRADUTTORE`
  ADD CONSTRAINT `my_traduttore_FK` FOREIGN KEY (`ID`) REFERENCES `UTENTE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
