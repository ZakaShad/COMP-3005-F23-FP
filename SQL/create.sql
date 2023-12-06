CREATE TABLE Users(
  username VARCHAR(255) PRIMARY KEY,
  passwrd VARCHAR(255),
  email VARCHAR(255),
  registration_date timestamp,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  birthday DATE
);

CREATE TABLE Trainer (
  username VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Member (
  username VARCHAR(255) PRIMARY KEY,
  height NUMERIC,
  weight NUMERIC,
  RHR NUMERIC,
  MHR NUMERIC,
  desired_weight NUMERIC,
  membership_level VARCHAR(255),
  loyalty_points NUMERIC
);

CREATE TABLE Admin_Staff (
  username VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Workouts_Performed (
  workout_performed_id NUMERIC PRIMARY KEY,
  weight NUMERIC,
  datetime timestamp,
  reps NUMERIC,
  member_username VARCHAR(255),
  workout_name VARCHAR(255)
);

CREATE TABLE Workout (
  name VARCHAR(255) PRIMARY KEY,
  description VARCHAR(255),
  approved BOOLEAN
);

CREATE TABLE Goal_PR (
  member_username VARCHAR(255),
  workout_name VARCHAR(255),
  weight NUMERIC,
  reps NUMERIC,
  PRIMARY KEY (member_username, workout_name)
);

CREATE TABLE Workout_Muscles (
  workout_name VARCHAR(255),
  targets VARCHAR(255),
  PRIMARY KEY (workout_name, targets)
);

CREATE TABLE Workout_Routine (
  workout_routine_id NUMERIC PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE Training_Session (
  training_session_id NUMERIC PRIMARY KEY,
  training_notes VARCHAR(255)
);

CREATE TABLE Trained (
  trainer_username VARCHAR(255),
  training_session NUMERIC,
  PRIMARY KEY (trainer_username, training_session)
);

CREATE TABLE Trained_In (
  member_username VARCHAR(255),
  training_session_id NUMERIC,
  PRIMARY KEY (member_username, training_session_id)
);

CREATE TABLE Workouts_In_Routine (
  workout_name VARCHAR(255),
  workout_routine_id NUMERIC,
  PRIMARY KEY (workout_name, workout_routine_id)
);

CREATE TABLE Member_Workout_Routines (
  workout_routine_id NUMERIC,
  member_username VARCHAR(255),
  PRIMARY KEY (workout_routine_id, member_username)
);

CREATE TABLE Event (
  event_id NUMERIC PRIMARY KEY,
  trainer_username VARCHAR(255),
  created_by VARCHAR(255),
  name VARCHAR(255),
  starts_at timestamp ,
  ends_at timestamp,
  description VARCHAR(255)
);

CREATE TABLE Member_Event_Registration (
  member_username VARCHAR(255),
  event_id NUMERIC,
  PRIMARY KEY (member_username, event_id)
);

ALTER TABLE Trainer ADD FOREIGN KEY (username) REFERENCES Users (username);

ALTER TABLE Member ADD FOREIGN KEY (username) REFERENCES Users (username);

ALTER TABLE Admin_Staff ADD FOREIGN KEY (username) REFERENCES Users (username);

ALTER TABLE Workouts_Performed ADD FOREIGN KEY (member_username) REFERENCES Users (username);

ALTER TABLE Workouts_Performed ADD FOREIGN KEY (workout_name) REFERENCES Workout (name);

ALTER TABLE Goal_PR ADD FOREIGN KEY (member_username) REFERENCES Member (username);

ALTER TABLE Goal_PR ADD FOREIGN KEY (workout_name) REFERENCES Workout (name);

ALTER TABLE Workout_Muscles ADD FOREIGN KEY (workout_name) REFERENCES Workout (name);

ALTER TABLE Trained ADD FOREIGN KEY (trainer_username) REFERENCES Trainer (username);

ALTER TABLE Trained ADD FOREIGN KEY (training_session) REFERENCES Training_Session (training_session_id);

ALTER TABLE Trained_In ADD FOREIGN KEY (member_username) REFERENCES Member (username);

ALTER TABLE Trained_In ADD FOREIGN KEY (training_session_id) REFERENCES Training_Session (training_session_id);

ALTER TABLE Workouts_In_Routine ADD FOREIGN KEY (workout_name) REFERENCES Workout (name);

ALTER TABLE Workouts_In_Routine ADD FOREIGN KEY (workout_routine_id) REFERENCES Workout_Routine (workout_routine_id);

ALTER TABLE Member_Workout_Routines ADD FOREIGN KEY (workout_routine_id) REFERENCES Workout_Routine (workout_routine_id);

ALTER TABLE Member_Workout_Routines ADD FOREIGN KEY (member_username) REFERENCES Member (username);

ALTER TABLE Event ADD FOREIGN KEY (trainer_username) REFERENCES Trainer (username);

ALTER TABLE Event ADD FOREIGN KEY (created_by) REFERENCES Admin_Staff (username);

ALTER TABLE Member_Event_Registration ADD FOREIGN KEY (member_username) REFERENCES Member (username);

ALTER TABLE Member_Event_Registration ADD FOREIGN KEY (event_id) REFERENCES Event (event_id);