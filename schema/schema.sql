CREATE TABLE workers (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  hourly_wage DECIMAL(5, 2) NOT NULL
) ENGINE=INNODB;

CREATE TABLE locations (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=INNODB;

CREATE TABLE tasks (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL
) ENGINE=INNODB;

CREATE TABLE logged_time (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  time_seconds INT(11) NOT NULL,

  task_id INT(11) NOT NULL,
  worker_id INT(11) NOT NULL,
  location_id INT(11) NOT NULL,

  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY(worker_id) REFERENCES workers(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE task_locations (
  task_id INT(11) NOT NULL,
  location_id INT(11) NOT NULL,
  PRIMARY KEY (task_id, location_id),
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=INNODB;

INSERT INTO locations (name)
VALUES
  ('Argentina'),
  ('America'),
  ('Egypt'),
  ('Switzerland'),
  ('Peru'),
  ('China'),
  ('South Africa'),
  ('Greece'),
  ('South America'),
  ('Gabon'),
  ('Morocco'),
  ('Indonesia');

INSERT INTO tasks (description, status)
VALUES
  ('Plumbing & Medical Gas', 'complete'),
  ('Sludge Conditioning Systems', 'complete'),
  ('Stain the Wood and Plastic Doors', 'incomplete'),
  ('Water Supply and Treatment Equipment', 'incomplete'),
  ('Basic Mechanical Materials and Methods', 'complete'),
  ('Construction Scaffolding and Platforms', 'complete'),
  ('Soft Flooring and Base', 'complete'),
  ('Basic Door and Window Materials and Methods', 'complete'),
  ('Wood Fences and Gates', 'complete'),
  ('Check Electrical and Fire Alarm', 'complete'),
  ('Check the HVAC', 'incomplete'),
  ('Metal Deck', 'incomplete'),
  ('Cementitious Decks and Underlayments', 'incomplete'),
  ('inspect the Landscaping & Irrigation', 'incomplete'),
  ('Temporary Water', 'incomplete'),
  ('Furnishings and Accessories', 'complete'),
  ('build Structural and Misc Steel (Fabrication)', 'complete'),
  ('Product Substitution Procedures', 'complete'),
  ('Flexible Pavement Asphalt Pavement', 'complete'),
  ('apply the Waterproofing & Caulking', 'incomplete'),
  ('Commercial Laundry and Dry Cleaning Equipment', 'incomplete'),
  ('Planetarium Equipment', 'incomplete'),
  ('perform the Landscaping & Irrigation', 'complete'),
  ('PVC Fences and Gates', 'incomplete'),
  ('Air-Supported Structures', 'incomplete'),
  ('Grilles and Screens', 'incomplete'),
  ('Glazed Curtain Wall', 'incomplete'),
  ('Commercial Laundry and Dry Cleaning Equipment', 'incomplete'),
  ('inspect Epoxy Flooring', 'incomplete'),
  ('Owner Furnished Products', 'incomplete'),
  ('Roof Specialties and Accessories', 'incomplete'),
  ('Clay Unit Pavers', 'incomplete'),
  ('Hydraulic Gates and Valves', 'incomplete');

INSERT INTO workers (username, hourly_wage)
VALUES 
  ('tcowserf', 35.23),
  ('bcrossmang', 14.55),
  ('ksinnetth', 28.65),
  ('nhumani', 43.69),
  ('ewooffj', 37.66),
  ('bwaterk', 28.65),
  ('marntzenl', 31.52),
  ('akellum', 31.52),
  ('gmoore', 14.49),
  ('ekellum', 50.49);

INSERT INTO logged_time (time_seconds, task_id, worker_id, location_id)
VALUES 
(209571, 32, 10, 11),
(237189, 14, 4, 8),
(251196, 14, 8, 3),
(226645, 7, 5, 6),
(166887, 28, 10, 4),
(239831, 33, 8, 9),
(213083, 9, 5, 12),
(161971, 4, 9, 2),
(203196, 26, 1, 8),
(278610, 31, 2, 3),
(251035, 2, 10, 1),
(173867, 28, 5, 2),
(202169, 30, 3, 11),
(214839, 24, 1, 8),
(214931, 19, 6, 1),
(230267, 21, 3, 10),
(164485, 20, 3, 12),
(156235, 31, 2, 4),
(274328, 8, 8, 7),
(226461, 15, 1, 8),
(221936, 13, 10, 2),
(176852, 13, 4, 7),
(186637, 3, 9, 3),
(283854, 33, 10, 1),
(174943, 19, 8, 11),
(182707, 9, 10, 12),
(186315, 2, 3, 7),
(152687, 12, 10, 11),
(150755, 18, 2, 10),
(153768, 10, 9, 10),
(274404, 14, 6, 2),
(195447, 23, 5, 9),
(174152, 16, 8, 10),
(161560, 25, 1, 10),
(259469, 33, 4, 11),
(181959, 6, 8, 10),
(189392, 10, 1, 3),
(199316, 5, 7, 5),
(152668, 4, 2, 5),
(156539, 6, 6, 1),
(238429, 8, 5, 3),
(170477, 33, 4, 8),
(223506, 16, 6, 7),
(175945, 22, 5, 10),
(179931, 28, 7, 3),
(179425, 28, 8, 5),
(165497, 16, 10, 7),
(156434, 6, 9, 4),
(182880, 24, 2, 7),
(216719, 24, 2, 1),
(212615, 24, 9, 8),
(227500, 17, 9, 11),
(211388, 26, 9, 4),
(223938, 2, 9, 5),
(181096, 21, 10, 10),
(281886, 4, 5, 6),
(239002, 11, 1, 7),
(165102, 1, 10, 9),
(244904, 32, 1, 2),
(214684, 4, 8, 8),
(155724, 18, 9, 7),
(177365, 32, 5, 3),
(207228, 24, 7, 11),
(168130, 22, 9, 12),
(286526, 32, 5, 2),
(158962, 20, 8, 8),
(237266, 14, 10, 5),
(277890, 19, 1, 10),
(160294, 6, 1, 10),
(174099, 9, 2, 3),
(153479, 10, 1, 10),
(193833, 12, 9, 1),
(186113, 30, 8, 8),
(175163, 28, 8, 12),
(271250, 15, 4, 9),
(269481, 24, 8, 6),
(285948, 4, 5, 12),
(274247, 6, 8, 4),
(204998, 32, 3, 11),
(244742, 5, 3, 4),
(223513, 26, 2, 7),
(166578, 6, 4, 7),
(166866, 17, 4, 6),
(151350, 13, 7, 2),
(175946, 17, 10, 5),
(218906, 32, 9, 3),
(207107, 10, 4, 11),
(219260, 30, 5, 9),
(162973, 25, 4, 4),
(288546, 20, 9, 6),
(204339, 16, 9, 4),
(215024, 26, 7, 10),
(154614, 1, 8, 9),
(181525, 27, 6, 2),
(161473, 1, 5, 1),
(168506, 31, 10, 12),
(191567, 9, 4, 1),
(228785, 13, 9, 6),
(220969, 2, 9, 6),
(242731, 25, 10, 11);

INSERT INTO task_locations (task_id, location_id)
VALUES 
(4, 7),
(1, 11),
(27, 9),
(9, 3),
(1, 1),
(4, 12),
(24, 11),
(13, 6),
(26, 11),
(2, 10),
(25, 4),
(30, 6),
(14, 5),
(2, 6),
(15, 6),
(11, 11),
(12, 1),
(19, 7),
(32, 5),
(1, 8),
(2, 7),
(30, 2),
(16, 5),
(11, 2),
(10, 12),
(2, 4),
(31, 9),
(27, 11),
(27, 8),
(11, 7),
(27, 6),
(2, 2),
(21, 7),
(11, 4),
(28, 10),
(31, 10),
(7, 11),
(11, 1),
(20, 2),
(28, 8),
(29, 10),
(29, 11),
(17, 2),
(5, 8),
(8, 3),
(13, 1),
(8, 4),
(13, 12),
(1, 4),
(13, 4),
(5, 9),
(5, 11),
(24, 10),
(4, 9),
(33, 11),
(6, 5),
(10, 5),
(3, 9),
(24, 1),
(31, 6),
(11, 5),
(27, 10),
(15, 5),
(12, 4),
(17, 5),
(23, 8),
(22, 3),
(10, 11),
(21, 8),
(32, 7),
(20, 11),
(5, 5),
(28, 6),
(5, 12),
(16, 2),
(22, 6),
(30, 3),
(19, 6),
(18, 8),
(15, 2),
(18, 10),
(27, 12);
