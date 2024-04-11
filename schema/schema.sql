CREATE TABLE locations (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
) ENGINE=INNODB;

CREATE TABLE tasks (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  location_id INT(11) NOT NULL,

  FOREIGN KEY(location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=INNODB;

CREATE TABLE workers (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  hourly_wage DECIMAL(5, 2) NOT NULL
) ENGINE=INNODB;

CREATE TABLE logged_time (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  time_seconds INT(11) NOT NULL,

  task_id INT(11) NOT NULL,
  worker_id INT(11) NOT NULL,

  FOREIGN KEY(task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  FOREIGN KEY(worker_id) REFERENCES workers(id) ON DELETE CASCADE
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

INSERT INTO tasks (description, status, location_id)
VALUES
  ('Plumbing & Medical Gas', 'complete', 1),
  ('Soft Flooring and Base', 'complete', 2),
  ('Check Electrical and Fire Alarm', 'complete', 3),
  ('Check the HVAC', 'incomplete', 4),
  ('inspect the Landscaping & Irrigation', 'incomplete', 5),
  ('build Structural and Misc Steel (Fabrication)', 'complete', 6),
  ('apply the Waterproofing & Caulking', 'incomplete', 7),
  ('perform the Landscaping & Irrigation', 'complete', 8),
  ('inspect Epoxy Flooring', 'incomplete', 9);

INSERT INTO workers (username, hourly_wage)
VALUES 
  ('tcowserf', 35.92),
  ('bcrossmang', 14.55),
  ('ksinnetth', 28.65),
  ('nhumani', 43.69),
  ('ewooffj', 37.66),
  ('bwaterk', 28.65),
  ('marntzenl', 31.52),
  ('akellum', 31.52),
  ('bgarreltsm', 14.49);

INSERT INTO logged_time (time_seconds, task_id, worker_id)
VALUES 
  (180000, 1, 1),
  (10000, 1, 1),
  (216000, 2, 2),
  (115200, 3, 3),
  (288000, 4, 4),
  (252000, 5, 5),
  (187200, 6, 6),
  (252300, 7, 7),
  (205200, 8, 8),
  (162000, 9, 9),
  (254000, 3, 1),
  (123000, 5, 1),
  (165000, 6, 1),
  (235450, 8, 1),
  (216000, 6, 2),
  (216000, 8, 2),
  (216000, 9, 2),
  (113200, 2, 3),
  (145540, 3, 3),
  (165750, 7, 3),
  (245350, 8, 3);
  