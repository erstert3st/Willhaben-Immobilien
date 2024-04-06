#This file contains a class that can be used to create a query for the willhaben website and get the results as a json object.
#At the moment, the class is not fully complete. It is mainly made for querying apartments, but it can be extended to query other types of real estate.
#The query parameters are the same as on the website. If you need more parameters, simply add them to the query_params.py file and implement the setter methods in the WillhabenQuery class.

from typing import List, Optional, Literal, Union
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import json
from http import HTTPStatus
from lib.query_params import PROPERTY_TYPE, FREE_AREA_TYPE, ESTATE_PREFERENCE, AVAILABILITY, CATEGORY, STATE, DISTRICT
from lib.helpers import handle_argument_list


class WillhabenQueryBuilder:

    def __init__(self):

        self.max_pages = 100
        self._base_url: str = 'https://www.willhaben.at/iad/immobilien'
        self._query_url: str = None
        self.category: CATEGORY = None
        self.state: STATE = None
        self.district: Optional[DISTRICT] = None #this can only be set if state is set
        self.rows: int = 30
        self.price_from: Optional[int] = None
        self.price_to: Optional[int] = None
        self.size_from: Optional[int] = None
        self.size_to: Optional[int] = None
        self.number_of_rooms: Optional[List[str]] = []    #1,2,3,4,5,6-9,10+
        self.property_types: Optional[List[PROPERTY_TYPE]] = [] #Immobilientyp. if none is selected, the result will contain all types
        self.free_area_types: Optional[List[FREE_AREA_TYPE]] = [] #Freiflächen. if none is selected, the result will contain all types
        self.estate_preferences: Optional[List[ESTATE_PREFERENCE]] = [] #Ausstattung. if none is selected, the result will contain all types
        self.availabe_now: bool = None
        self.ua_header = UserAgent().random   


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

    #example url: https://www.willhaben.at/iad/immobilien/mietwohnungen/salzburg/salzburg-stadt?rows=10&PRICE_FROM=100&PRICE_TO=200&ESTATE_SIZE/LIVING_AREA_FROM=50&ESTATE_SIZE/LIVING_AREA_TO=100&NO_OF_ROOMS_BUCKET=1X1
    def get_query_url(self):
        self._query_url = self._base_url
        if self.category is None:
            raise Exception('You must set the category before getting the query url.')
        self._query_url += f'/{self.category.value}'
        if self.state is not None:
            self._query_url += f'/{self.state.value}'
        if self.district is not None and self.state is None:
            raise Exception('You must set the state before setting the district.')
        elif self.district is not None and self.state is not None:
            self._query_url += f'/{self.district.value}'
        self._query_url += f'?rows={self.rows}'
        if self.price_from is not None:
            self._query_url += f'&PRICE_FROM={self.price_from}'
        if self.price_to is not None:
            self._query_url += f'&PRICE_TO={self.price_to}'
        if self.size_from is not None:
            self._query_url += f'&ESTATE_SIZE/LIVING_AREA_FROM={self.size_from}'
        if self.size_to is not None:
            self._query_url += f'&ESTATE_SIZE/LIVING_AREA_TO={self.size_to}'
        if self.number_of_rooms is not None:
            for num in self.number_of_rooms:
                self._query_url += f'&NO_OF_ROOMS_BUCKET={num}'
        if self.property_types is not None:
            for property_type in self.property_types:
                self._query_url += f'&PROPERTY_TYPE={property_type.value}'
        if self.free_area_types is not None:
            for free_area_type in self.free_area_types:
                self._query_url += f'&FREE_AREA/FREE_AREA_TYPE={free_area_type.value}'
        if self.estate_preferences is not None:
            for estate_preference in self.estate_preferences:
                self._query_url += f'&ESTATE_PREFERENCE={estate_preference.value}'
        if self.availabe_now is not None:
            self._query_url += f'&AVAILABLETODAY={AVAILABILITY.AVAILABLE_NOW.value}'
        return self._query_url
    
    def getRandomHeader(self):
        new_ua = UserAgent()
        header = {'User-Agent': new_ua.random}
        return  header
    
    def get_full_listings_as_json(self) -> List[dict]:
        url = self.get_query_url()
        response = requests.get(url, headers=self.ua_header)
        if response.status_code == HTTPStatus.OK:
                li_elements = soup.find_all('li')
                pageCount = len(li_elements) - 2
                print(pageCount)
        else:
            print(f"Error fetching data: {response.status_code}")
        for counter in range(1, self.max_pages):
            print(counter)
            soup = BeautifulSoup(response.text, 'html.parser')
            script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
            if script_tag:
                script_content = script_tag.string
                try:
                    json_data = json.loads(script_content)
                    listings = json_data['props']['pageProps']['searchResult']['advertSummaryList']['advertSummary']
                    return listings
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")
        print(f"ERROR max pages reached: {self.max_pages}")

##skip-to-content > div > div.Box-sc-wfmb7k-0.fvLiku > div.Box-sc-wfmb7k-0.kZCrvi > div.Box-sc-wfmb7k-0.fqBXQo > div.Box-sc-wfmb7k-0.iQyfXD > div.Box-sc-wfmb7k-0.eKLASN > div.Box-sc-wfmb7k-0.kIeNoy > nav > ul
    #This method returns the listings as an array of json objects with only a selection of attributes.
    def get_formatted_listings_as_json(self) -> List[dict]:
        listings = self.get_full_listings_as_json()
        listings_json = []
        for listing in listings:
            attributes = listing['attributes']['attribute']
            property_type, number_of_rooms, published_date, price, size_sqm = None, None, None, None, None
            for attribute in attributes:
                if attribute['name'] == 'PROPERTY_TYPE':
                    property_type = attribute['values'][0]
                if attribute['name'] == 'NUMBER_OF_ROOMS':
                    number_of_rooms = attribute['values'][0]
                if attribute['name'] == 'PUBLISHED_String':
                    published_date_str = attribute['values'][0]
                    date_format = "%Y-%m-%dT%H:%M:%SZ"
                    try:
                        published_date = datetime.strptime(published_date_str, date_format).isoformat()
                    except ValueError:
                        print(f"Error parsing date: {published_date_str}")
                        published_date = None
                if attribute['name'] == 'PRICE_FOR_DISPLAY':
                    price = attribute['values'][0]
                if attribute['name'] == 'ESTATE_SIZE':
                    size_sqm = attribute['values'][0]
                if attribute['name'] == 'SEO_URL':
                    url = attribute['values'][0]
            formatted_listing = {
                'id': listing['id'],
                'platform': 'willhaben',
                'description': listing['description'],
                'property_type': property_type,
                'number_of_rooms': number_of_rooms,
                'date_published': published_date,
                'price_per_month': price,
                'size_sqm': size_sqm,
                'url': "https://www.willhaben.at/iad/" + url

            }
            listings_json.append(formatted_listing)
        return listings_json
