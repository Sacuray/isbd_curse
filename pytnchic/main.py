import string

from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

def print_values(vals):
    i = 1
    for val in vals:
        l = []
        for key in val:
            if str(val[key])[0].isalpha() or key == 'password' or key == 'passcode' or str(val[key]).__contains__("-"):
                val[key] = "'" + str(val[key]) + "'"
            l.append(str(val[key]))
        k = ", ".join(l)
        k = '(' + k + ')'
        if i == len(vals):
            print(k + ";")
        else:
            print(k + ",")
        i += 1


def generate_phone():
    l = "'89"
    r = random.randint(100000000, 999999999)
    return l + str(r) + "'"

def generate_password():
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    return ran

# Генерация клиентов
def generate_clients(num_clients):
    clients = []
    i = 1
    for _ in range(num_clients):
        client = {
            'id': i,
            'full_name': fake.name(),
            'birth_date': fake.date_of_birth(minimum_age=18, maximum_age=65),
            'gender': random.choice(['MALE', 'FEMALE']),
            'email': fake.email(),
            'phone_number': generate_phone(),
            'password': generate_password(),
        }
        i += 1
        clients.append(client)
    return clients

# Генерация автомобилей
def generate_cars(num_cars):
    cars = []
    i = 1
    for _ in range(num_cars):
        car = {
            'id': i,
            'year_of_release': fake.date_between(start_date='-10y', end_date='-0d'),
            'model': random.choice(['BMW_M5_COMPETITION', 'BMW_M5_CS', 'BMW_i8', 'BMW_M8_COMPETITION_COUPE', 'BMW_M4_COMPETITION']),
            'colour': fake.color_name(),
        }
        i += 1
        cars.append(car)
    return cars

# Генерация дилерских центров
def generate_car_dealerships(num_dealerships):
    dealerships = []
    i = 1
    for _ in range(num_dealerships):
        dealership = {
            'id': i,
            'name_car_dealership': fake.company(),
            'email': fake.email(),
            'phone_number': generate_phone(),
            'passcode': generate_password(),
        }
        i += 1
        dealerships.append(dealership)
    return dealerships

# Генерация сотрудников
def generate_employees(num_employees, car_dealerships):
    employees = []
    i = 1
    for _ in range(num_employees):
        employee = {
            'id': i,
            'full_name_employee': fake.name(),
            'post': random.choice(['CUSTOMER_SERVICE_MANAGER', 'MECHANIC', 'ADMINISTRATOR']),
            'phone_number': generate_phone(),
            'email': fake.email(),
            'passcode': generate_password(),
            'car_dealership_id': i//2 + 1,
        }
        i += 1
        employees.append(employee)
    return employees

# Генерация заказов
def generate_orders(num_orders, services, employees, cars):
    orders = []
    i = 1
    for _ in range(num_orders):
        order = {
            'id': i,
            'datetime_order': fake.date_time_between(start_date='-1y', end_date='-0d'),
            'status_order': random.choice(['NEW',
    'IN_PROCESSING',
    'COMPLETED',
    'CANCELLED',
    'REJECTED',
    'AWAITING_PAYMENT']),
            'start_time': fake.date_time_between(start_date='now', end_date='+1y'),
            'end_time': fake.date_time_between(start_date='+1h', end_date='+1d'),
            'service_id': random.randint(1, 90),
            'employee_id': random.randint(1, 40),
            'car_id': i,
        }
        i += 1
        orders.append(order)
    return orders

# Генерация платежей
def generate_payments(num_payments, orders):
    payments = []
    i = 1
    for _ in range(num_payments):
        payment = {
            'id': i,
            'sum_price': random.randint(50, 500),
            'datetime_payment': fake.date_time_between(start_date='-1y', end_date='now'),
            'description_payment': fake.text(),
            'order_id': i,
        }
        i += 1
        payments.append(payment)
    return payments
# Генерация автозапчастей
def generate_autoparts(num_autoparts, cars):
    autoparts = []
    i = 1
    for _ in range(num_autoparts):
        autopart = {
            'id': i,
            'name_autopart': fake.word(),
            'description_autopart': fake.text(),
            'model': random.choice(['BMW_M5_COMPETITION',
    'BMW_M5_CS',
    'BMW_i8',
    'BMW_M8_COMPETITION_COUPE',
    'BMW_M4_COMPETITION']),
            'price': random.randint(10, 200),
            'count': random.randint(1, 50),
        }
        i += 1
        autoparts.append(autopart)
    return autoparts

# Генерация услуг
def generate_services(num_services, autoparts):
    services = []
    i = 1
    for _ in range(num_services):
        service = {
            'id': i,
            'name_service': fake.word(),
            'description_service': fake.text(),
            'price': random.randint(50, 500),
            'autopart_id': i,
        }
        i += 1
        services.append(service)
    return services

# Генерация чатов
def generate_chats(num_chats, clients, employees):
    chats = []
    i = 1
    for _ in range(num_chats):
        chat = {
            'id': i,
            'client_id': random.randint(1, 40),
            'employee_id': random.randint(1, 40),
        }
        i += 1
        chats.append(chat)
    return chats

# Генерация сообщений
def generate_messages(num_messages, chats):
    messages = []
    i = 1
    for _ in range(num_messages):
        message = {
            'id': i,
            'type_message': random.choice(['INCOMING',
    'OUTGOING']),
            'datetime_message': fake.date_time_between(start_date='-1y', end_date='now'),
            'chat_id': i//2+1,
        }
        i += 1
        messages.append(message)
    return messages

# Генерация владений
def generate_possessions(num_possessions, clients, cars):
    possessions = []
    i = 1
    for _ in range(num_possessions):
        possession = {
            'id': i,
            'client_id': i//2+1,
            'car_id': i//2+1,
        }
        i += 1
        possessions.append(possession)
    return possessions

# Вызываем функции для генерации данных
num_clients = 500
num_cars = 310
num_dealerships = 100
num_employees = 50
num_services = 100
num_orders = 300
num_payments = 200
num_autoparts = 150
num_chats = 200
num_messages = 150
num_possessions = 100

clients = generate_clients(num_clients)
cars = generate_cars(num_cars)
dealerships = generate_car_dealerships(num_dealerships)
employees = generate_employees(num_employees, dealerships)
autoparts = generate_autoparts(num_autoparts, cars)
services = generate_services(num_services, autoparts)
orders = generate_orders(num_orders, services, employees, cars)
payments = generate_payments(num_payments, orders)
chats = generate_chats(num_chats, clients, employees)
messages = generate_messages(num_messages, chats)
possessions = generate_possessions(num_possessions, clients, cars)


print("INSERT INTO client (id, full_name, birth_date, gender, email, phone_number, password) VALUES")
print_values(clients)
print("")
print("INSERT INTO car (id, year_of_release, model, colour) VALUES")
print_values(cars)
print("")
print("INSERT INTO car_dealership (id, name_car_dealership, email, phone_number, passcode) VALUES")
print_values(dealerships)
print("")
print("INSERT INTO autopart (id, name_autopart, description_autopart, model, price, count) VALUES")
print_values(autoparts)
print("")
print("INSERT INTO employee (id, full_name_employee, post, phone_number, email, passcode, car_dealership_id) VALUES")
print_values(employees)
print("")
print("INSERT INTO service (id, name_service, description_service, price, autopart_id) VALUES")
print_values(services)
print("")
print("INSERT INTO chat (id, client_id, employee_id) VALUES")
print_values(chats)
print("")
print("INSERT INTO message (id, type_message, datetime_message, chat_id) VALUES")
print_values(messages)
print("")
print("INSERT INTO possession (id, client_id, car_id) VALUES")
print_values(possessions)
print("")
print("INSERT INTO my_order (id, datetime_order, status_order, start_time, end_time, service_id, employee_id, car_id) VALUES")
print_values(orders)
print("")
print("INSERT INTO payment (id, sum_price, datetime_payment, description_payment, order_id) VALUES")
print_values(payments)
print("")





