CREATE TABLE Users (
  email varchar(30) PRIMARY KEY,
  first_name varchar(20) NOT NULL,
  last_name varchar(20) NOT NULL,
  registration_date timestamp NOT NULL,
  birthday date NOT NULL,
  type varchar(15) NOT NULL
);

CREATE TABLE Admin (
  email varchar(30) PRIMARY KEY
);

CREATE TABLE Trainer (
  email varchar(30) PRIMARY KEY
);

CREATE TABLE Member (
  email varchar(30) PRIMARY KEY,
  membership_level varchar(10) NOT NULL,
  loyalty_points int NOT NULL,
  desired_weight int,
  height int,
  weight int,
  RHR int,
  MHR int
);

CREATE TABLE Training_Session (
  training_session_id BIGINT PRIMARY KEY,
  begins_at timestamp NOT NULL,
  ends_at timestamp NOT NULL,
  notes varchar(1000),
  trainer varchar(30) NOT NULL,
  member varchar(30) NOT NULL
);

CREATE TABLE Workout (
  name varchar(50) PRIMARY KEY,
  description varchar(1000)
);

CREATE TABLE Workouts_Performed (
  workouts_performed_id BIGINT PRIMARY KEY,
  reps int DEFAULT 0,
  weight int DEFAULT 0,
  datetime timestamp,
  performed_by varchar(30),
  workout_name varchar(30)
);

CREATE TABLE Workout_Routine ( 
  routine_id BIGINT PRIMARY KEY,
  name varchar(50) NOT NULL
);

CREATE TABLE Event (
  event_id BIGINT PRIMARY KEY,
  title varchar(50) NOT NULL,
  description varchar(1000),
  begins_at timestamp NOT NULL,
  ends_at timestamp NOT NULL,
  createdBy varchar(30) 
);

CREATE TABLE Goal_PRs (
  member varchar(30),
  workout varchar(30),
  weight int DEFAULT 0,
  reps int DEFAULT 0,
  PRIMARY KEY (member, workout)
);

CREATE TABLE Member_Event_Registration (
  member varchar(30),
  event BIGINT,
  PRIMARY KEY (member, event)
);

CREATE TABLE Member_Workout_Routine (
  member varchar(30),
  routine BIGINT,
  PRIMARY KEY (member, routine)
);

CREATE TABLE Workouts_In_Routine (
  routine BIGINT,
  workout varchar(30),
  PRIMARY KEY (routine, workout)
);

CREATE TABLE Workout_Muscles (
  workout varchar(50),
  muscle varchar(50),
  PRIMARY KEY (workout, muscle)
);

CREATE TABLE Event_Feedback (
  member varchar(30),
  event BIGINT,
  comments varchar(10000),
  rating int,
  PRIMARY KEY (member, event)
);

ALTER TABLE Admin ADD FOREIGN KEY (email) REFERENCES Users (email);

ALTER TABLE Trainer ADD FOREIGN KEY (email) REFERENCES Users (email);

ALTER TABLE Member ADD FOREIGN KEY (email) REFERENCES Users (email);

ALTER TABLE Training_Session ADD FOREIGN KEY (trainer) REFERENCES Trainer (email);

ALTER TABLE Training_Session ADD FOREIGN KEY (member) REFERENCES Member (email);

ALTER TABLE Workouts_Performed ADD FOREIGN KEY (performed_by) REFERENCES Member (email);

ALTER TABLE Workouts_Performed ADD FOREIGN KEY (workout_name) REFERENCES Workout (name);

ALTER TABLE Event ADD FOREIGN KEY (createdBy) REFERENCES Admin (email);

ALTER TABLE Goal_PRs ADD FOREIGN KEY (member) REFERENCES Member (email);

ALTER TABLE Goal_PRs ADD FOREIGN KEY (workout) REFERENCES Workout (name);

ALTER TABLE Member_Event_Registration ADD FOREIGN KEY (member) REFERENCES Member (email);

ALTER TABLE Member_Event_Registration ADD FOREIGN KEY (event) REFERENCES Event (event_id);

ALTER TABLE Member_Workout_Routine ADD FOREIGN KEY (member) REFERENCES Member (email);

ALTER TABLE Member_Workout_Routine ADD FOREIGN KEY (routine) REFERENCES Workout_Routine (routine_id);

ALTER TABLE Workouts_In_Routine ADD FOREIGN KEY (routine) REFERENCES Workout_Routine (routine_id);

ALTER TABLE Workouts_In_Routine ADD FOREIGN KEY (workout) REFERENCES Workout (name);

ALTER TABLE Workout_Muscles ADD FOREIGN KEY (workout) REFERENCES Workout (name);

ALTER TABLE Event_Feedback ADD FOREIGN KEY (member) REFERENCES Member (email);

ALTER TABLE Event_Feedback ADD FOREIGN KEY (event) REFERENCES Event (event_id);
