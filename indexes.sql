CREATE INDEX idx_client_login ON client (email);

CREATE INDEX idx_client_password ON client (password);

CREATE INDEX idx_client_auth ON client (email, password);

CREATE INDEX idx_car_dealership_login ON car_dealership (email);

CREATE INDEX idx_car_dealership_password ON car_dealership (passcode);

CREATE INDEX idx_car_dealership_auth ON car_dealership (email, passcode);

CREATE INDEX idx_employee_login ON employee (email);

CREATE INDEX idx_employee_password ON employee (passcode);

CREATE INDEX idx_employee_auth ON employee (email, passcode);

CREATE INDEX idx_my_order_ids ON my_order (service_id, employee_id, car_id);

CREATE INDEX idx_payment_order_id ON payment (order_id);
