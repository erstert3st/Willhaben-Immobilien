import sys
sys.path.append('.')
from lib.willhaben import WillhabenQueryBuilder
from lib.query_params import CATEGORY, STATE, DISTRICT, PROPERTY_TYPE, FREE_AREA_TYPE, ESTATE_PREFERENCE
import debugpy 
willhaben_query = WillhabenQueryBuilder()
willhaben_query.set_category(CATEGORY.RENT_APARTMENT) \
    .set_state(STATE.STEIERMARK) \
    .set_district(DISTRICT.STEIERMARK_GRAZ) \
    .set_rows(250) \
    .set_price_from(200) \
    .set_price_to(1000) \
    .set_size_from(20) \
    .set_size_to(10000) \

    
URl = willhaben_query.get_query_url()
full_listings_list = willhaben_query.get_full_listings_as_json()
formated_list = willhaben_query.get_formatted_listings_as_list()

print("Query URL: " + URl)
print("\n\nFull Listings (not formatted and confusing): " + str(full_listings_list))
print("\n\nFormatted listings as JSON: " + str(formated_list))
print("done")