CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(20) NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    quantity DECIMAL NOT NULL,
    unit VARCHAR(20) NOT NULL,
    storage_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 