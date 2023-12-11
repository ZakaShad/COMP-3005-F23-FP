-- Insert data into Users table
INSERT INTO Users
VALUES
  ('member1@example.com', 'John', 'Doe', '2023-01-01 00:00:00', '1990-01-01', 'member'),
  ('admin@example.com', 'Jane', 'Smith', '2023-01-02 00:00:00', '1985-05-15', 'admin'),
  ('trainer1@example.com', 'Train', 'Ner', '2023-01-02 00:00:00', '1995-06-14', 'trainer'),
  ('trainer2@example.com', 'First', 'Last', '2023-01-02 00:00:00', '1999-06-14', 'trainer'),
  ('member2@example.com', 'Abdou', 'Mohamed', '2023-01-01 00:00:00', '1997-01-023', 'member');
  
  -- Add more user data as needed;

-- Insert data into Admin table
INSERT INTO Admin (email)
VALUES
  ('admin@example.com');

-- Insert data into Trainer table
INSERT INTO Trainer (email)
VALUES
  ('trainer1@example.com'),
  ('trainer2@example.com');
  -- Add more trainer data as needed;

-- Insert data into Member table
INSERT INTO Member (email, membership_level, loyalty_points, desired_weight, height, weight, RHR, MHR)
VALUES
  ('member1@example.com', 'Gold', 100, 150, 170, 65, 60, 180),
  ('member2@example.com', 'Silver', 50, 140, 160, 55, 58, 175);
  -- Add more member data as needed;

-- Insert data into Training_Session table
INSERT INTO Training_Session 
VALUES
  (1, '2023-01-10 10:00:00', '2023-01-10 12:00:00', 'Session notes', 'trainer1@example.com', 'member1@example.com'),
  (2, '2023-01-11 11:00:00', '2023-01-11 13:00:00', 'Another session notes', 'trainer2@example.com', 'member2@example.com');
  -- Add more training session data as needed;

-- Insert data into Workout table
INSERT INTO Workout (name, description)
VALUES
  ('Workout1', 'Description for Workout1'),
  ('Workout2', 'Description for Workout2');
  -- Add more workout data as needed;

-- Insert data into Workouts_Performed table
INSERT INTO Workouts_Performed (workouts_performed_id, reps, weight, datetime, performed_by, workout_name)
VALUES
  (1, 10, 50, '2023-01-05 14:30:00', 'member1@example.com', 'Workout1'),
  (2, 15, 70, '2023-01-06 15:45:00', 'member2@example.com', 'Workout2');
  -- Add more workouts performed data as needed;

-- Insert data into Workout_Routine table
INSERT INTO Workout_Routine (routine_id, name)
VALUES
  (1, 'Routine1'),
  (2, 'Routine2');
  -- Add more workout routine data as needed;

-- Insert data into Event table
INSERT INTO Event
VALUES
  (1, 'Event1', 'Description for Event1', '2023-02-01 10:00:00', '2023-02-01 12:00:00', 'admin@example.com'),
  (2, 'Event2', 'Description for Event2', '2023-02-05 14:00:00', '2023-02-05 16:00:00', 'admin@example.com');
  -- Add more event data as needed;

-- Insert data into Goal_PRs table
INSERT INTO Goal_PRs (member, workout, weight, reps)
VALUES
  ('member1@example.com', 'Workout1', 60, 12),
  ('member2@example.com', 'Workout2', 75, 15);
  -- Add more goal PRs data as needed;

-- Insert data into Member_Event_Registration table
INSERT INTO Member_Event_Registration (member, event)
VALUES
  ('member1@example.com', 1),
  ('member2@example.com', 2);
  -- Add more member event registration data as needed;

-- Insert data into Member_Workout_Routine table
INSERT INTO Member_Workout_Routine (member, routine)
VALUES
  ('member1@example.com', 1),
  ('member2@example.com', 2);
  -- Add more member workout routine data as needed;

-- Insert data into Workouts_In_Routine table
INSERT INTO Workouts_In_Routine (routine, workout)
VALUES
  (1, 'Workout1'),
  (2, 'Workout2');
  -- Add more workouts in routine data as needed;

-- Insert data into Workout_Muscles table
INSERT INTO Workout_Muscles (workout, muscle)
VALUES
  ('Workout1', 'Muscle1'),
  ('Workout2', 'Muscle2');
  -- Add more workout muscles data as needed;

-- Insert data into Event_Feedback table
INSERT INTO Event_Feedback (member, event, comments, rating)
VALUES
  ('member1@example.com', 1, 'Great event!', 5),
  ('member2@example.com', 2, 'Awesome experience!', 4);
  -- Add more event feedback data as needed;
