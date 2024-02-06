import sys
sys.path.append('.')
from lib.willhaben import WillhabenQueryBuilder
from lib.query_params import CATEGORY, STATE, DISTRICT, PROPERTY_TYPE, FREE_AREA_TYPE, ESTATE_PREFERENCE

willhaben_query = WillhabenQueryBuilder()
willhaben_query.set_category(CATEGORY.RENT_APARTMENT) \
    .set_state(STATE.SALZBURG) \
    .set_district(DISTRICT.SALZBURG_SALZBURG_STADT) \
    .set_rows(2) \
    .set_price_from(500) \
    .set_price_to(1500) \
    .set_size_from(40) \
    .set_size_to(100) \
    .add_property_type([PROPERTY_TYPE.APARTMENT, PROPERTY_TYPE.GARCONNIERE]) \
    .add_free_area_type([FREE_AREA_TYPE.BALCONY])

print("Query URL: ")
print(willhaben_query.get_query_url())
print("\n\nFull Listings (not formatted and confusing): ")
print(willhaben_query.get_full_listings_as_json())
print("\n\nFormatted listings as JSON: ")
print(willhaben_query.get_formatted_listings_as_json())

