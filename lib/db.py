import sqlite3


class Db_handler:
    def __init__(self, db_name, table_name):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.table_name = table_name
        self.check_table_exists(table_name)

    def __del__(self):
        self.conn.close()
        
        
    def insert_data(self, table_name, listings):
        try:
            self.insert_listings(table_name, listings)
        # for listing in listings:
        #     try:
        #         self.insert_single_listing(table_name, listing)
            # print(f"Failed to insert listing {listing['willhaben_id']}")
            # print(f"Listing: {listing}")
        except Exception as exec:
            print(f"Table: {table_name}")
            print (f"exec: {exec}")
                
    
    def check_table_exists(self, table_name):
        self.cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}'")
        if self.cursor.fetchone() is None:
            self.create_table(table_name)
            print(f"Table {table_name} created")
            return
        print(f"Table {table_name} exists")
        return             
              
    def insert_listings(self, table_name, listings):
        columns = 'willhaben_id, platform, summary, property_type, number_of_rooms, date_published, price, size_qm, url, location, description, state, district, seller, estate_size_living_area, floor, published, country, location_id, location_quality, address, postcode, property_type_flat, free_area_type_name, free_area_total, upselling_ad_searchresult, coordinates, is_private'
        placeholders = ', '.join('?' * len(listings[0]))
        sql = f"INSERT OR REPLACE INTO {table_name} ({columns}) VALUES ({placeholders})"
        self.cursor.executemany(sql, [list(listing.values()) for listing in listings])
        self.commit()          
            
    def commit(self):
        self.conn.commit()
        print(str(self.cursor.rowcount) + " rows affected")              
 
                
    # we need the single listing insert method later :D 
    def insert_listing(self, table_name, listing):
        columns = 'willhaben_id, platform, summary, property_type, number_of_rooms, date_published, price, size_qm, url,image_urlsm  location, description, state, district, seller, estate_size_living_area, floor, published, country, location_id, location_quality, address, postcode, property_type_flat, free_area_type_name, free_area_total, upselling_ad_searchresult, coordinates, is_private'
        placeholders = ', '.join('?' * len(listing))
        sql = f"INSERT OR REPLACE INTO {table_name} ({columns}) VALUES ({placeholders})"
        self.cursor.execute(sql, list(listing.values()))
        self.commit()

    def create_table(self, table_name):
        self.cursor.execute(f"""
            CREATE TABLE {table_name} (
                willhaben_id INTEGER PRIMARY KEY  ,
                platform TEXT,
                summary TEXT,
                property_type TEXT,
                number_of_rooms INTEGER,
                date_published TEXT,
                price INTEGER,
                size_qm INTEGER,
                url TEXT,
                image_urls TEXT,
                location TEXT,
                description TEXT,
                state TEXT,
                district TEXT,
                seller TEXT,
                estate_size_living_area INTEGER,
                floor TEXT,
                published TEXT,
                country TEXT,
                location_id INTEGER,
                location_quality TEXT,
                address TEXT,
                postcode INTEGER,
                property_type_flat TEXT,
                free_area_type_name TEXT,
                free_area_total INTEGER,
                upselling_ad_searchresult TEXT,
                coordinates TEXT,
                is_private INTEGER
            )
        """)
        self.commit()
