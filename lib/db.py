import sqlite3


class DB:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def __del__(self):
        self.conn.close()


hi = {'willhaben_id': '744606590', 'platform': 'willhaben', 'summary': 'PROVISIONSFREI - Erstbezug - GATE 17 - Puntigam - 33m² - 2 Zimmer - optimale Pendlerwohnung - Balkon', 'property_type': 'Wohnung', 'number_of_rooms': '2',
      'date_published': '2024-04-06T01:43:00Z', 'price_per_month': '460', 'size_sqm': '33',
      'url': 'https://www.willhaben.at/iad/immobilien/d/mietwohnungen/steiermark/graz/provisionsfrei-erstbezug-gate-17-puntigam-33m-2-zimmer-optimale-pendlerwohnung-balkon-744606590/',
      'location': 'Puntigam', 'description': 'Diese geräumige 2 Zimmerwohnung (Typ B2) beeindruckt durch ihre durchdachte Raumaufteilung. Sie ist in einen Wohn-/Essbereich, ein separates Schlafzimmer sowie ein Badezimmer mit Dusche und WC aufgeteilt. Die eingebaute Tischlerküche verfügt über alle...',
      'state': 'Steiermark', 'district': 'Graz', 'seller': 'C&P Immobilien AG', 'estate_size_living_area': '33', 'floor': '', 'published': '2024-04-06T01:43:00Z', 'country': 'Österreich', 'location_id': '101028',
      'location_quality': '1.0', 'address': 'Grenzgasse 2', 'postcode': '8055', 'property_type_flat': 'true', 'free_area_type_name': 'Balkon', 'free_area_free_area_area_total': '23', 'upselling_ad_searchresult': 'true',
      'coordinates': '47.0211,15.43706', 'is_private': '0'}
