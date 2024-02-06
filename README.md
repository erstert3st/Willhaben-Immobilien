# Willhaben Real Estate Scraper

## Description

This project is a web scraper that collects real estate listings from the website [willhaben.at](https://www.willhaben.at/).
By specifying a search query, the scraper will collect all the listings that match the query and returns them as json.

At the moment you can use the following methods to specify your search query:

| Method   | Description |
| -------- | -------     |
| set_category | Set the category of the listing (e.g. rent apartment, buy house, etc.) |
| set_state | Set the state of the listing (e.g. Salzburg, Vienna, etc.) |
| set_district | Set the district of the listing (e.g. Salzburg Stadt, Leopoldstadt, etc.) |
| set_rows | Set the number of listings to be returned |
| set_price_from | Set the minimum price of the listing |
| set_price_to | Set the maximum price of the listing |
| set_size_from | Set the minimum size of the listing in sqm |
| set_size_to | Set the maximum size of the listing in sqm |
| add_property_type | Add a property type to the query (e.g. apartment, house, etc.) |
| add_free_area_type | Add a free area type to the query the listings should have (e.g. balcony, terrace, etc.) |
| add_estate_preference | Add an estate preference to the query (e.g. has a storage room, is barrier free, etc.) |
| should_be_available_now | Set the query to only return listings that are available now |

### Example

```python
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

print(willhaben_query.get_formatted_listings_as_json())
```

The result will be an array of json objects, each representing a real estate listing. For example:
    
```python
[
   {
      "id":"770070361",
      "platform":"willhaben",
      "description":"THE VIEW² | Wohnen über Salzburg | 2,5-Zimmer-Terrassenwohnung mit Grünblick 4L-Top 5",
      "property_type":"Wohnung",
      "number_of_rooms":"2",
      "date_published":"2024-02-06T15:05:00",
      "price_per_month":"€ 1.464,39",
      "size_sqm":"74",
      "url":"https://www.willhaben.at/iad/immobilien/d/mietwohnungen/salzburg/salzburg-stadt/the-view-wohnen-ueber-salzburg-2-5-zimmer-terrassenwohnung-mit-gruenblick-4l-top-5-770070361/"
   },
   {
      "id":"768159418",
      "platform":"willhaben",
      "description":"Wunderschöne 2 Zimmer Wohnung / neu renoviert!",
      "property_type":"Wohnung",
      "number_of_rooms":"2",
      "date_published":"2024-02-05T17:24:00",
      "price_per_month":"€ 800",
      "size_sqm":"40",
      "url":"https://www.willhaben.at/iad/immobilien/d/mietwohnungen/salzburg/salzburg-stadt/wunderschoene-2-zimmer-wohnung-neu-renoviert-768159418/"
   }
]
```
