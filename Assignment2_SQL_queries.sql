-- Q1. Write a Sql query that will fetch all upcoming courses.

select * from courses 
where start_date > Current_Date();

-- Q2. Write a Sql query that will fetch all the registered 
-- students along with course name

Select s.reg_no,s.name,s.email,s.mobile_no,
s.course_id,c.course_name
From students s join courses c on s.course_id=c.course_id;

-- Q3. Write an SQL query to fetch the complete details of a
-- student (based on their email) along with the details of 
-- the course they are enrolled in

Select s.reg_no,s.name,s.email,s.mobile_no,
c.course_id,c.course_name,
c.description AS course_description,
c.fees, c.start_date,
c.end_date, c.video_expire_days
from students s
join courses c 
on s.course_id = c.course_id
where s.email = 'student_email@gmail.com';

--  Q4. Write an SQL query to retrieve the course details 
-- and the list of non-expired videos for a specific student
-- using their email address. A video is considered active (not expired) if its added_at date plus the course’s
-- video_expire_days has not yet passed compared to the current date.
-- Example: A video added on 2025-01-01 with 
-- 30 video_expire_days remains active until 2025-01-31.  

Select  c.course_id,c.course_name,c.start_date,c.end_date,c.video_expire_days,v.video_id,v.title,v.added_at
from Courses c Join videos v on c.course_id=v.course_id
Join students s on s.course_id=c.course_id
where s.email = 'student_email@gmail.com' and v.added_at >= DATE_SUB(current_date, INTERVAL c.video_expire_days DAY);



