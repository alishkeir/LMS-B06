# Learning Management System

## Project Description

One of the most common applications over the past couple of years, particularly due to Covid-19, is the Learning Management System. Many if not most companies now have worked on at least one LMS or something similar. This project allows teachers, admins, and students continue working as if they never left campus.

## Expected Solution Description

A learning management system is required. For the sake of simplicity we will only be handling the admin side of it. An admin can't sign up, but is added by one of the existing admins.

Every admin should be able to track several aspects of the academic life.
He/She should be able to:
1. Create and manage students and their profiles (Web App).
2. Create and manage admins (Web App)
3. Create and manage classes. (Web App)
4. Create and manage class sections. (Web App)
5. Assign students to a section and class. (Web App)
6. Take student daily attendance (Mobile App)
7. Generate Reports (Web and Mobile Apps)

## Students
- Every student must have a profile.
- An admin can go over a list of students that can be filtered by class and section and select any student profile to be viewed and edited.
- A student should have a unique id (example: 20200001) that must be automatically generated, first name, last name, email, phone number, picture. Any thing else you like to add would be fine.
- A student must be assigned to only one class and one section.
- A student can't sign in. Only admins can.

## Classes and Sections
- A class can have several sections.
- A section can contain a specific number of students.

## Attendance
- Through the mobile app, an admin can access the attendance sheets of every section and fill it accordingly.
- There are 3 possible entries: Present, Late, Absent.
- The Admin can also search for a student by name in the attendance sheet.

## Reports
- Through the mobile app, the admin can generate attendance reports.
- These reports show individual and class attendance records. They must reflect the number of absences, presents, and lateness. You should use graphs and charts to make it more visually appealing.

<hr>

## Rules and Restrictions
- You can't delete a class while it has sections related to it.
- You can't delete a section while it has students assigned to it.
- Students can only be assigned to one class and one section.
- All the business rules and requirements are very important and should be amended (unless otherwise stated or communicated).
- There are no restrictions on the user interface and design, it just needs to be user friendly and intuitive.
- The candidate should not be using packages or libraries that achieves / solves a key requirement of the solution (Like taking attendance).

<hr>

## Evaluation Criteria
The evaluation criteria are divided into 2 main parts:
1. Overall project completion :
  - All the business rules and requirements should be achieved and met.
  - The solution should have the functional work flow as described in the expected solution.
  - The solution should be working properly and provided the expected results.
2. The code is to be examined to check for the good programming practices, including but not limited to :
  - Performance optimization,
  - Secure coding,
  - OOP (Object-oriented programming).
  - Re-usability and maintainability.
