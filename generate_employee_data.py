import pandas as pd
import random
from faker import Faker
from datetime import datetime

fake = Faker()

data = []

# Create the CEO
first_name = fake.first_name()
last_name = fake.last_name()
email = fake.email()
phone_number = fake.phone_number()
date_of_birth = fake.date_of_birth(minimum_age=35, maximum_age=65).strftime("%Y-%m-%d")
date_of_joining = fake.date_between(start_date='-4y', end_date='today').strftime("%Y-%m-%d")
is_current = random.choice([True, False])
date_of_leaving = fake.date_between(start_date=datetime.strptime(date_of_joining, "%Y-%m-%d"), end_date='today').strftime("%Y-%m-%d") if not is_current else None
position = "CEO"
department = "Executive"
salary = round(random.uniform(100000, 150000), 2)
supervisor_email = None

data.append([first_name, last_name, email, phone_number, date_of_birth, date_of_joining, date_of_leaving, position, department, salary, is_current, supervisor_email])

supervisors = [email]
for _ in range(499):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = fake.email()
    phone_number = fake.phone_number()
    date_of_birth = fake.date_of_birth(minimum_age=20, maximum_age=65).strftime("%Y-%m-%d")
    date_of_joining = fake.date_between(start_date='-4y', end_date='today').strftime("%Y-%m-%d")
    is_current = random.choice([True, False])
    date_of_leaving = fake.date_between(start_date=datetime.strptime(date_of_joining, "%Y-%m-%d"), end_date='today').strftime("%Y-%m-%d") if not is_current else None
    position = fake.job()
    department = random.choice(['HR', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Support'])
    salary = round(random.uniform(30000, 120000), 2)
    supervisor_email = random.choice(supervisors)
    
    data.append([first_name, last_name, email, phone_number, date_of_birth, date_of_joining, date_of_leaving, position, department, salary, is_current, supervisor_email])
    supervisors.append(email)

df = pd.DataFrame(data, columns=[
    'First Name', 'Last Name', 'Email', 'Phone Number', 'Date of Birth', 'Date of Joining', 'Date of Leaving',
    'Position', 'Department', 'Salary', 'Is Current', 'Supervisor Email'
])

df.to_csv('employees.csv', index=False)
