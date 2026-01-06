ALTER TABLE transactions
    ADD COLUMN category_id BIGINT,
    ADD COLUMN memo VARCHAR(255);

ALTER TABLE transactions
    ADD CONSTRAINT fk_transactions_category
        FOREIGN KEY (category_id) REFERENCES categories(id);