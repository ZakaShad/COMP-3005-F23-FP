 -- Insert data into the Users table
INSERT INTO Users (username, passwrd, email, registration_date, first_name, last_name, birthday)
VALUES
  ('user1', 'password1', 'user1@example.com', '2023-01-01', 'John', 'Doe', '1990-01-15'),
  ('user2', 'password2', 'user2@example.com', '2023-01-02', 'Jane', 'Smith', '1985-03-22'), 
  ('trainer1', 'password3', 'train1@example.com', '2023-01-01', 'tes', 'bill', '2002-01-15'), 
  ('member1', 'password5', 'mem1@example.com', '2023-01-01', 'jiff', 'za', '1990-02-16'), 
  ('member2', 'password6', 'mem2@example.com', '2023-01-01', 'mo', 'salah', '2002-01-22'), 
  ('admin1','password7','adm1@example.com','2023-01-01','donald','trump','2001-08-30');



-- Insert data into the Trainer table
INSERT INTO Trainer (username)
VALUES ('trainer1');

-- Insert data into the Member table
INSERT INTO Member (username, height, weight, RHR, MHR, desired_weight, membership_level, loyalty_points)
VALUES
  ('member1', 175, 70, 60, 180, 65, 'Gold', 100),
  ('member2', 160, 55, 65, 170, 50, 'Silver', 50);

-- Insert data into the Admin_Staff table
INSERT INTO Admin_Staff (username)
VALUES ('admin1');

-- Insert data into the Workout table
INSERT INTO Workout (name, description, approved)
VALUES
  ('Push-up', 'Upper body exercise', true),
  ('Sit-up', 'Core exercise', true);

-- Insert data into the Workouts_Performed table
INSERT INTO Workouts_Performed (workout_performed_id, weight, datetime, reps, member_username, workout_name)
VALUES
  (1, 50, '2023-01-03 08:00:00', 10, 'member1', 'Push-up'),
  (2, 30, '2023-01-04 09:30:00', 15, 'member2', 'Sit-up');

-- Insert data into the Goal_PR table
INSERT INTO Goal_PR (member_username, workout_name, weight, reps)
VALUES
  ('member1', 'Push-up', 60, 15),
  ('member2', 'Sit-up', 40, 20);

-- Insert data into the Workout_Muscles table
INSERT INTO Workout_Muscles (workout_name, targets)
VALUES
  ('Push-up', 'Chest, Arms'),
  ('Sit-up', 'Abdominals');

-- Insert data into the Workout_Routine table
INSERT INTO Workout_Routine (workout_routine_id, name)
VALUES
  (1, 'Morning Routine'),
  (2, 'Evening Routine');

-- Insert data into the Training_Session table
INSERT INTO Training_Session (training_session_id, training_notes)
VALUES
  (1, 'Focus on form and consistency'),
  (2, 'Increase intensity gradually');

-- Insert data into the Trained table
INSERT INTO Trained (trainer_username, training_session)
VALUES ('trainer1', 1);

-- Insert data into the Trained_In table
INSERT INTO Trained_In (member_username, training_session_id)
VALUES ('member1', 1);

-- Insert data into the Workouts_In_Routine table
INSERT INTO Workouts_In_Routine (workout_name, workout_routine_id)
VALUES
  ('Push-up', 1),
  ('Sit-up', 1);

-- Insert data into the Member_Workout_Routines table
INSERT INTO Member_Workout_Routines (workout_routine_id, member_username)
VALUES
  (1, 'member1'),
  (1, 'member2');

-- Insert data into the Event table
INSERT INTO Event (event_id, trainer_username, created_by, name, starts_at, ends_at, description)
VALUES
  (1, 'trainer1', 'admin1', 'Fitness Workshop', '2023-02-01 10:00:00', '2023-02-01 12:00:00', 'Learn new workout techniques'),
  (2, 'trainer1', 'admin1', 'Yoga Class', '2023-02-10 18:30:00', '2023-02-10 20:00:00', 'Relaxing yoga session');

-- Insert data into the Member_Event_Registration table
INSERT INTO Member_Event_Registration (member_username, event_id)
VALUES
  ('member1', 1),
  ('member2', 2);