-- phpMyAdmin SQL Dump
-- version 4.1.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Giu 26, 2015 alle 15:22
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
(4, 'Alpe SRL2', '16 - 20', 'www.google.it', 'address2', '74189', '666'),
(6, 'lucasap123', '16 - 20', 'asdada', 'asdasda', 'sfdsfs', '234232afsdadas'),
(286, 'Agenzia 1', '0 - 5', 'undefined', NULL, NULL, NULL),
(296, 'sdfsdf', 'null', 'undefined', NULL, NULL, NULL),
(300, 'Luca', '', '', NULL, NULL, NULL),
(301, 'Giuseppe', '', '', NULL, NULL, NULL);

<!-- PMA-SQL-ERROR -->
    <div class="error"><h1>Errore</h1>
<p><strong>Query SQL:</strong>
<a href="tbl_sql.php?sql_query=SHOW+TABLE+STATUS+FROM+%60my_explico%60+LIKE+%27CERTIFICATION%27&amp;show_query=1&amp;db=my_explico&amp;table=CERTIFICATION&amp;token=174675874a02214ca8c67af38ef592bf"><span class="nowrap"><img src="themes/dot.gif" title="Modifica" alt="Modifica" class="icon ic_b_edit" /> Modifica</span></a>    </p>
<p>
<code class="sql"><pre>
SHOW TABLE STATUS FROM `my_explico` LIKE 'CERTIFICATION'
</pre></code>
</p>
<p>
    <strong>Messaggio di MySQL: </strong><a href="./url.php?url=http%3A%2F%2Fdev.mysql.com%2Fdoc%2Frefman%2F5.1%2Fen%2Ferror-messages-server.html&amp;token=174675874a02214ca8c67af38ef592bf" target="mysql_doc"><img src="themes/dot.gif" title="Documentazione" alt="Documentazione" class="icon ic_b_help" /></a>
</p>
<code>
#2006 - MySQL server has gone away
</code><br />
</div>