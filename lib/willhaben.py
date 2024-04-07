# This file contains a class that can be used to create a query for the willhaben website and get the results as a json object.
# At the moment, the class is not fully complete. It is mainly made for querying apartments, but it can be extended to query other types of real estate.
# The query parameters are the same as on the website. If you need more parameters, simply add them to the query_params.py file and implement the setter methods in the WillhabenQuery class.

import time
from typing import List, Optional, Literal, Union
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from json import JSONEncoder
import json
from http import HTTPStatus
from lib.query_params import PROPERTY_TYPE, FREE_AREA_TYPE, ESTATE_PREFERENCE, AVAILABILITY, CATEGORY, STATE, DISTRICT
from lib.helpers import handle_argument_list
from fake_useragent import UserAgent
from datetime import datetime
from decimal import Decimal
from lib.db import  Db_handler

class WillhabenQueryBuilder:

    def __init__(self):

        self.max_pages = 100
        self._base_url: str = "https://www.willhaben.at/iad/immobilien"
        self._query_url: str = ""
        self._query_url_with_page: str = ""
        self.category: CATEGORY = None
        self.start_page: int = 1
        self.state: STATE = None
        self.district: Optional[DISTRICT] = None  # this can only be set if state is set
        self.rows: int = 30
        self.price_from: Optional[int] = None
        self.price_to: Optional[int] = None
        self.size_from: Optional[int] = None
        self.size_to: Optional[int] = None
        self.number_of_rooms: Optional[List[str]] = []  # 1,2,3,4,5,6-9,10+
        self.property_types: Optional[List[PROPERTY_TYPE]] = []  # Immobilientyp. if none is selected, the result will contain all types
        self.free_area_types: Optional[List[FREE_AREA_TYPE]] = []  # Freiflächen. if none is selected, the result will contain all types
        self.estate_preferences: Optional[List[ESTATE_PREFERENCE]] = []  # Ausstattung. if none is selected, the result will contain all types
        self.availabe_now: bool = None
        self.ua_header = {"User-Agent": UserAgent().random}
        self.sort_by = 1  # 1 = newest first, 2 = nearest 3 = cheapest first, 4 = most expensive first, 5 = smallest first, 6 = largest first, 7 = relevant first
        self.table_name = "test1"
        self.db_connection: Db_handler = Db_handler("./db/noData.db", self.table_name)
        

    def set_category(self, category: CATEGORY):
        self.category = category
        return self

    def set_state(self, state: STATE):
        self.state = state
        return self

    def set_district(self, district: DISTRICT):
        if self.state is None:
            raise Exception('You must set the state first.')
        self.district = district
        return self

    def set_rows(self, rows: int):
        if rows < 1:
            raise Exception('Rows must be greater than 0.')
        self.rows = rows
        return self

    def set_price_from(self, price_from: int):
        if price_from < 1:
            raise Exception('Price from must be greater than 0.')
        self.price_from = price_from
        return self

    def set_price_to(self, price_to: int):
        if price_to < 1:
            raise Exception('Price to must be greater than 0.')
        self.price_to = price_to
        return self

    def set_size_from(self, size_from: int):
        if size_from < 1:
            raise Exception('Size from must be greater than 0.')
        self.size_from = size_from
        return self

    def set_size_to(self, size_to: int):
        if size_to < 1:
            raise Exception('Size to must be greater than 0.')
        self.size_to = size_to
        return self

    def add_number_of_rooms(self, num: Literal['1', '2', '3', '4', '5', '6-9', '10+']):
        if num not in ['1', '2', '3', '4', '5', '6-9', '10+']:
            raise ValueError('Invalid number of rooms. Must be 1, 2, 3, 4, 5, 6-9 or 10+ in datatype str.')
        if num in ['1', '2', '3', '4', '5']:
            self.number_of_rooms.append(f'{num}X{num}')
        elif num == '6-9':
            self.number_of_rooms.append('6X9')
        elif num == '10+':
            self.number_of_rooms.append('10X')
        return self

    @handle_argument_list
    def add_property_type(self, property_type: Union[PROPERTY_TYPE, List[PROPERTY_TYPE]]):
        if property_type not in PROPERTY_TYPE:
            raise ValueError('Invalid property type.')
        self.property_types.append(property_type)
        return self

    @handle_argument_list
    def add_free_area_type(self, free_area_type: FREE_AREA_TYPE):
        if free_area_type not in FREE_AREA_TYPE:
            raise ValueError('Invalid free area type.')
        self.free_area_types.append(free_area_type)
        return self

    @handle_argument_list
    def add_estate_preference(self, estate_preference: ESTATE_PREFERENCE):
        if estate_preference not in ESTATE_PREFERENCE:
            raise ValueError('Invalid estate preference.')
        self.estate_preferences.append(estate_preference)
        return self

    def should_be_available_now(self, available_now: bool):
        self.availabe_now = available_now
        return self

    # example url: https://www.willhaben.at/iad/immobilien/mietwohnungen/salzburg/salzburg-stadt?rows=10&PRICE_FROM=100&PRICE_TO=200&ESTATE_SIZE/LIVING_AREA_FROM=50&ESTATE_SIZE/LIVING_AREA_TO=100&NO_OF_ROOMS_BUCKET=1X1
    def get_query_url(self, page: int = 1):
        if self._query_url == "":
            self._query_url = self._base_url
            # category
            if self.category is None:
                raise Exception('You must set the category before getting the query url.')
            self._query_url += f'/{self.category.value}'
            # state
            if self.state is not None:
                self._query_url += f'/{self.state.value}'
            # district
            if self.district is not None and self.state is None:
                raise Exception('You must set the state before setting the district.')
            elif self.district is not None and self.state is not None:
                self._query_url += f'/{self.district.value}'
            self._query_url += f'?rows={self.rows}'
            # price from
            if self.price_from is not None:
                self._query_url += f'&PRICE_FROM={self.price_from}'
            # price to
            if self.price_to is not None:
                self._query_url += f'&PRICE_TO={self.price_to}'
            # size from
            if self.size_from is not None:
                self._query_url += f'&ESTATE_SIZE/LIVING_AREA_FROM={self.size_from}'
            # size to
            if self.size_to is not None:
                self._query_url += f'&ESTATE_SIZE/LIVING_AREA_TO={self.size_to}'
            # number of rooms
            if self.number_of_rooms is not None:
                for num in self.number_of_rooms:
                    self._query_url += f'&NO_OF_ROOMS_BUCKET={num}'
            # property types
            if self.property_types is not None:
                for property_type in self.property_types:
                    self._query_url += f'&PROPERTY_TYPE={property_type.value}'
            # free area types
            if self.free_area_types is not None:
                for free_area_type in self.free_area_types:
                    self._query_url += f'&FREE_AREA/FREE_AREA_TYPE={free_area_type.value}'
            # estate preferences
            if self.estate_preferences is not None:
                for estate_preference in self.estate_preferences:
                    self._query_url += f'&ESTATE_PREFERENCE={estate_preference.value}'
            # available now
            if self.availabe_now is not None:
                self._query_url += f'&AVAILABLETODAY={AVAILABILITY.AVAILABLE_NOW.value}'
            # start page

            # sort
            if self.sort_by is not None:
                self._query_url += f'&sort={str(self.sort_by)}'
            else:
                self._query_url += '&sort=1'
        
        self._query_url_with_page = self.add_page_to_query_url(page)
        return self._query_url_with_page
            
    def add_page_to_query_url(self, page: int):
        if self._query_url == "":
            raise Exception('You must set the query url before adding a page.')
        self._query_url_with_page = f'{self._query_url}&page={str(page)}'
        return self._query_url_with_page
    
    def getRandomHeader(self):
        new_ua = UserAgent()
        header = {"User-Agent": new_ua.random}
        return header

    def get_full_listings_as_json(self) -> List[dict]:

        #loop pages
        for counter in range(1, self.max_pages):
            url = self.get_query_url(counter)
            print(counter)
            #get site
            response = requests.get(url, headers=self.ua_header)
            soup = BeautifulSoup(response.text, "html.parser")
            
            if response.status_code != HTTPStatus.OK:
                print(f"Error fetching data: {response.status_code}")
                #Todo handle error 
           #get api data 
            script_tag = soup.find("script", {"id": "__NEXT_DATA__"})
            if script_tag:
                try:
                    json_data = json.loads( script_tag.string)
                    if(len(json_data["props"]["pageProps"]["searchResult"]["advertSummaryList"]["advertSummary"]) <= 0):
                        print(f"ERROR no listings found on page {counter} i think iam done here :D")
                        break
                    listings = json_data["props"]["pageProps"]["searchResult"]["advertSummaryList"]["advertSummary"]
                    insertData = self.get_formatted_listings_as_list(listings)
                    self.db_connection.insert_data(self.table_name, insertData)
                except Exception as e:
                    print(f"Error in page {str(counter)} : {e}")
            else:
                print(f"Error in page {counter} : no script tag")
            #handle last page
            print(f"Page {counter} done")
            time.sleep(10)
            
        print(f"ERROR max pages reached: {self.max_pages}")

    # This method returns the listings as an array of json objects with only a selection of attributes.
    def tryConvert(self, value,  class_var, errorMassage):
        try:
            if class_var == int:
                return int(round(float(value)))
            elif class_var == datetime:
                return datetime.strptime(value[:-1], "%Y-%m-%dT%H:%M:%S").isoformat()
            return class_var(value)
        except:
            print("Error converting " + errorMassage + ":" + str(value))
            raise TypeError("Error converting " + errorMassage + ":" + str(value))

    def get_formatted_listings_as_list(self, listings ) -> List[dict]:
     #   listings = self.get_full_listings_as_json()

        listing_list = []
        for listing in listings:
            # jic i dont trust pythons new jit compiler
            attributes = ""
            attributeDict = {}
            #######
            attributes = listing['attributes']['attribute']
            attributeDict = {item['name']: item['values'][0] if item['values'] else None for item in attributes}

            property_type = attributeDict.get('PROPERTY_TYPE', "")
            number_of_rooms = attributeDict.get('NUMBER_OF_ROOMS', "69")
            published_date = attributeDict.get('PUBLISHED_String', "0001-01-01T01:01:01Z")
            # price = betterAttributeDict.get('PRICE_FOR_DISPLAY', "")
            price = attributeDict.get('PRICE', "69")
            location = attributeDict.get('LOCATION', "")
            description = attributeDict.get('BODY_DYN', "")
            state = attributeDict.get('STATE', "")
            district = attributeDict.get('DISTRICT', "")
            seller = attributeDict.get('ORGNAME', "")
            estate_size_living_area = attributeDict.get('ESTATE_SIZE/LIVING_AREA', "69")
            floor = attributeDict.get('FLOOR', "")
            published = attributeDict.get('PUBLISHED_String', "")
            country = attributeDict.get('COUNTRY', "")
            location_id = attributeDict.get('LOCATION_ID', "69")
            location_quality = attributeDict.get('LOCATION_QUALITY', "")
            address = attributeDict.get('ADDRESS', "")
            postcode = attributeDict.get('POSTCODE', "69")
            property_type_flat = attributeDict.get('PROPERTY_TYPE_FLAT', "")
            free_area_type_name = attributeDict.get('FREE_AREA_TYPE_NAME', "")
            free_area_total = attributeDict.get('FREE_AREA/FREE_AREA_AREA_TOTAL', "69")
            upselling_ad_searchresult = attributeDict.get('UPSELLING_AD_SEARCHRESULT', "")
            coordinates = attributeDict.get('COORDINATES', "")
            is_private = attributeDict.get('ISPRIVATE', "69")
            size_qm = attributeDict.get('ESTATE_SIZE', "69")
            url = attributeDict.get('SEO_URL', "")
            # convert int
            willhaben_id = self.tryConvert(listing.get('id', "0"), int, "willhaben_id int")
            size_qm = self.tryConvert(size_qm, int, "size_qm int")
            price = self.tryConvert(price, int, "price int")
            number_of_rooms = self.tryConvert(number_of_rooms, int, "number_of_rooms int")
            estate_size_living_area = self.tryConvert(estate_size_living_area, int, "estate_size_living_area int")
            location_id = self.tryConvert(location_id, int, "location_id int")
            postcode = self.tryConvert(postcode, int, "postcode int")
            free_area_total = self.tryConvert(free_area_total, int, "free_area_total int")
            is_private = self.tryConvert(is_private, int, "is_private int")
            #convertDate
            published_date = self.tryConvert(published_date, datetime, "published_date datetime")
            published = self.tryConvert(published, datetime, "published datetime")
            

            formatted_listing = {
                'willhaben_id': willhaben_id,
                'platform': 'willhaben',
                'summary': listing.get('description', ""),
                'property_type': property_type,
                'number_of_rooms': number_of_rooms,
                'date_published': published_date,
                'price': price,
                'size_qm': size_qm,
                'url': "https://www.willhaben.at/iad/" + url,
                'location': location,
                'description': description,
                'state': state,
                'district': district,
                'seller': seller,
                'estate_size_living_area': estate_size_living_area,
                'floor': floor,
                'published': published,
                'country': country,
                'location_id': location_id,
                'location_quality': location_quality,
                'address': address,
                'postcode': postcode,
                'property_type_flat': property_type_flat,
                'free_area_type_name': free_area_type_name,
                'free_area_total': free_area_total,
                'upselling_ad_searchresult': upselling_ad_searchresult,
                'coordinates': coordinates,
                'is_private': is_private,
            }
            
            listing_list.append(formatted_listing)
        return listing_list
