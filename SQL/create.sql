CREATE TABLE "User" (
  "username" string PRIMARY KEY,
  "password" string,
  "email" string,
  "registration_date" datetime,
  "first_name" string,
  "last_name" string,
  "birthday" date
);

CREATE TABLE "Trainer" (
  "username" string PRIMARY KEY
);

CREATE TABLE "Member" (
  "username" string PRIMARY KEY,
  "height" num,
  "weight" num,
  "RHR" num,
  "MHR" num,
  "desired_weight" num,
  "membership_level" string,
  "loyalty_points" num
);

CREATE TABLE "Admin_Staff" (
  "username" string PRIMARY KEY
);

CREATE TABLE "Workouts_Performed" (
  "workout_performed_id" num PRIMARY KEY,
  "weight" num,
  "datetime" datetime,
  "reps" num,
  "member_username" string,
  "workout_name" string
);

CREATE TABLE "Workout" (
  "name" string PRIMARY KEY,
  "description" string,
  "approved" bool
);

CREATE TABLE "Goal_PR" (
  "member_username" string,
  "workout_name" string,
  "weight" num,
  "reps" num,
  PRIMARY KEY ("member_username", "workout_name")
);

CREATE TABLE "Workout_Muscles" (
  "workout_name" string,
  "targets" string,
  PRIMARY KEY ("workout_name", "targets")
);

CREATE TABLE "Workout_Routine" (
  "workout_routine_id" num PRIMARY KEY,
  "name" string
);

CREATE TABLE "Training_Session" (
  "training_session_id" num PRIMARY KEY,
  "training_notes" string
);

CREATE TABLE "Trained" (
  "trainer_username" string,
  "training_session" num,
  PRIMARY KEY ("trainer_username", "training_session")
);

CREATE TABLE "Trained_In" (
  "member_username" string,
  "training_session_id" num,
  PRIMARY KEY ("member_username", "training_session_id")
);

CREATE TABLE "Workouts_In_Routine" (
  "workout_name" string,
  "workout_routine_id" num,
  PRIMARY KEY ("workout_name", "workout_routine_id")
);

CREATE TABLE "Member_Workout_Routines" (
  "workout_routine_id" num,
  "member_username" string,
  PRIMARY KEY ("workout_routine_id", "member_username")
);

CREATE TABLE "Event" (
  "event_id" num PRIMARY KEY,
  "trainer_username" string,
  "created_by" string,
  "name" string,
  "starts_at" datetime,
  "ends_at" datetime,
  "description" string
);

CREATE TABLE "Member_Event_Registration" (
  "member_username" string,
  "event_id" num,
  PRIMARY KEY ("member_username", "event_id")
);

ALTER TABLE "Trainer" ADD FOREIGN KEY ("username") REFERENCES "User" ("username");

ALTER TABLE "Member" ADD FOREIGN KEY ("username") REFERENCES "User" ("username");

ALTER TABLE "Admin_Staff" ADD FOREIGN KEY ("username") REFERENCES "User" ("username");

ALTER TABLE "Workouts_Performed" ADD FOREIGN KEY ("member_username") REFERENCES "User" ("username");

ALTER TABLE "Workouts_Performed" ADD FOREIGN KEY ("workout_name") REFERENCES "Workout" ("name");

ALTER TABLE "Goal_PR" ADD FOREIGN KEY ("member_username") REFERENCES "Member" ("username");

ALTER TABLE "Goal_PR" ADD FOREIGN KEY ("workout_name") REFERENCES "Workout" ("name");

ALTER TABLE "Workout_Muscles" ADD FOREIGN KEY ("workout_name") REFERENCES "Workout" ("name");

ALTER TABLE "Trained" ADD FOREIGN KEY ("trainer_username") REFERENCES "Trainer" ("username");

ALTER TABLE "Trained" ADD FOREIGN KEY ("training_session") REFERENCES "Training_Session" ("training_session_id");

ALTER TABLE "Trained_In" ADD FOREIGN KEY ("member_username") REFERENCES "Member" ("username");

ALTER TABLE "Trained_In" ADD FOREIGN KEY ("training_session_id") REFERENCES "Training_Session" ("training_session_id");

ALTER TABLE "Workouts_In_Routine" ADD FOREIGN KEY ("workout_name") REFERENCES "Workout" ("name");

ALTER TABLE "Workouts_In_Routine" ADD FOREIGN KEY ("workout_routine_id") REFERENCES "Workout_Routine" ("workout_routine_id");

ALTER TABLE "Member_Workout_Routines" ADD FOREIGN KEY ("workout_routine_id") REFERENCES "Workout_Routine" ("workout_routine_id");

ALTER TABLE "Member_Workout_Routines" ADD FOREIGN KEY ("member_username") REFERENCES "Member" ("username");

ALTER TABLE "Event" ADD FOREIGN KEY ("trainer_username") REFERENCES "Trainer" ("username");

ALTER TABLE "Event" ADD FOREIGN KEY ("created_by") REFERENCES "Admin_Staff" ("username");

ALTER TABLE "Member_Event_Registration" ADD FOREIGN KEY ("member_username") REFERENCES "Member" ("username");

ALTER TABLE "Member_Event_Registration" ADD FOREIGN KEY ("event_id") REFERENCES "Event" ("event_id");
