CREATE TABLE HarvestedSearch (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    willhaben_id TEXT,
    platform TEXT,
    description TEXT,
    property_type TEXT,
    number_of_rooms INTEGER,
    date_published TEXT,
    price_per_month REAL,
    size_sqm REAL,
    url TEXT
);