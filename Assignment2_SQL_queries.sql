select * from courses 
where date > Current_Date();

Select s.reg_no,s.name,s.email,s.mobile_no,s.course_id,c.course_name
From students s join courses c on s.course_id=c.course_id;

Select s.reg_no,s.name,s.email,s.mobile_no,
    s.profile_pic,c.course_id,c.course_name,
    c.description AS course_description,
    c.fees, c.start_date,
    c.end_date, c.video_expire_days
	from students s
	join courses c 
    on s.course_id = c.course_id
	where s.email = 'student_email@gmail.com';
    
Select  c.course_id,c.course_name,c.start_date,c.end_date,c.video_expire_days,v.video_id,v.title,v.added_at
from Courses c Join videos v on c.course_id=v.course_id
Join students s on s.course_id=c.course_id
where s.email = 'student_email@gmail.com' and v.added_at >= DATE_SUB(current_date, INTERVAL c.video_expire_days DAY); ;



