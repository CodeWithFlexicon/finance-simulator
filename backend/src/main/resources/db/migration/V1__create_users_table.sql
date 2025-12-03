CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    name VARCHAR(255),
    provider VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);