from enum import Enum

class CATEGORY(Enum):
    ALL_CATEGORIES = "" #alle Immobilien
    NEW_CONSTRUCTION = "neubauprojekte" #Neubauprojekt
    BUY_HOUSE = "haus-kaufen" #Haus kaufen
    RENT_HOUSE = "haus-mieten" #Haus mieten
    BUY_APARTMENT = "eigentumswohnung" #Wohnung kaufen
    RENT_APARTMENT = "mietwohnungen" #Wohnung mieten
    BUY_LAND = "grundstuecke" #Grundstück kaufen
    BUY_COMMERCIAL = "gewerbeimmobilien-kaufen" #Gewerbeimmobilien kaufen
    RENT_COMMERCIAL = "gewerbeimmobilien-mieten" #Gewerbeimmobilien mieten
    RENT_VACATION_PROPERTIES = "ferienimmobilien-mieten" #Ferienimmobilien
    BUY_VACATION_PROPERTIES = "ferienimmobilien-kaufen" #Ferienimmobilien kaufen
    MISCELLANEOUS = "sonstige" #Sonstige Immobilien

class STATE(Enum):
    BURGENLAND = "burgenland"
    KAERNTEN = "kaernten"
    NIEDEROESTERREICH = "niederoesterreich"
    OBEROESTERREICH = "oberoesterreich"
    SALZBURG = "salzburg"
    STEIERMARK = "steiermark"
    TIROL = "tirol"
    VORARLBERG = "vorarlberg"
    WIEN = "wien"
    
class DISTRICT(Enum):
    BURGENLAND_EISENSTADT = "eisenstadt"
    BURGENLAND_EISENSTADT_UMGEBUNG = "eisenstadt-umgebung"
    BURGENLAND_GUESSING = "guessing"
    BURGENLAND_JENNERSDORF = "jennersdorf"
    BURGENLAND_MATTERSBURG = "mattersburg"
    BURGENLAND_NEUSIEDL_AM_SEE = "neusiedl-am-see"
    BURGENLAND_OBERPULLENDORF = "oberpullendorf"
    BURGENLAND_OBERWART = "oberwart"
    BURGENLAND_RUST = "rust-stadt"

    KAERNTEN_FELDKIRCHEN = "feldkirchen"
    KAERNTEN_HERMAGOR = "hermagor"
    KAERNTEN_KLAGENFURT = "klagenfurt"
    KAERNTEN_KLAGENFURT_LAND = "klagenfurt-land"
    KAERNTEN_SANKT_VEIT_AN_DER_GLAN = "sankt-veit-an-der-glan"
    KAERNTEN_SPITTAL_AN_DER_DRAU = "spittal-an-der-drau"
    KAERNTEN_VILLACH = "villach"
    KAERNTEN_VILLACH_LAND = "villach-land"
    KAERNTEN_VOELKERMARKT = "voelkermarkt"
    KAERNTEN_WOLFSBERG = "wolfsberg"

    NIEDEROESTERREICH_AMSTETTEN = "amstetten"
    NIEDEROESTERREICH_BADEN = "baden"
    NIEDEROESTERREICH_BRUCK_AN_DER_LEITHA = "bruck-an-der-leitha"
    NIEDEROESTERREICH_GAENSERNDORF = "gaenserndorf"
    NIEDEROESTERREICH_GMUEND = "gmuend"
    NIEDEROESTERREICH_HOLLABRUNN = "hollabrunn"
    NIEDEROESTERREICH_HORN = "horn"
    NIEDEROESTERREICH_KORNEUBURG = "korneuburg"
    NIEDEROESTERREICH_KREMS_AN_DER_DONAU = "krems-an-der-donau"
    NIEDEROESTERREICH_KREMS_LAND = "krems-land"
    NIEDEROESTERREICH_LILIENFELD = "lilienfeld"
    NIEDEROESTERREICH_MELK = "melk"
    NIEDEROESTERREICH_MISTELBACH = "mistelbach"
    NIEDEROESTERREICH_MOEDLING = "moedling"
    NIEDEROESTERREICH_NEUNKIRCHEN = "neunkirchen"
    NIEDEROESTERREICH_SANKT_POELTEN = "sankt-poelten"
    NIEDEROESTERREICH_SANKT_POELTEN_LAND = "sankt-poelten-land"
    NIEDEROESTERREICH_SCHEIBBS = "scheibbs"
    NIEDEROESTERREICH_TULLN = "tulln"
    NIEDEROESTERREICH_WAIDHOFEN_AN_DER_THAYA = "waidhofen-an-der-thaya"
    NIEDEROESTERREICH_WAIDHOFEN_AN_DER_YBBS = "waidhofen-an-der-ybbs"
    NIEDEROESTERREICH_WIENER_NEUSTADT = "wiener-neustadt"
    NIEDEROESTERREICH_WIENER_NEUSTADT_LAND = "wiener-neustadt-land"
    NIEDEROESTERREICH_ZWETTL = "zwettl"

    OBEROESTERREICH_BRAUNAU_AM_INN = "braunau-am-inn"
    OBEROESTERREICH_EFERDING = "eferding"
    OBEROESTERREICH_FREISTADT = "freistadt"
    OBEROESTERREICH_GMUNDEN = "gmuenden"
    OBEROESTERREICH_GRIESKIRCHEN = "grieskirchen"
    OBEROESTERREICH_KIRCHDORF_AN_DER_KREMS = "kirchdorf-an-der-krems"
    OBEROESTERREICH_LINZ = "linz"
    OBEROESTERREICH_LINZ_LAND = "linz-land"
    OBEROESTERREICH_PERG = "perg"
    OBEROESTERREICH_RIED_IM_INNKREIS = "ried-im-innkreis"
    OBEROESTERREICH_ROHRBACH = "rohrbach"
    OBEROESTERREICH_SCHAERDING = "schaerding"
    OBEROESTERREICH_STEYR = "steyr"
    OBEROESTERREICH_STEYR_LAND = "steyr-land"
    OBEROESTERREICH_URFAHR_UMGEBUNG = "urfahr-umgebung"
    OBEROESTERREICH_VOECKLABRUCK = "voecklabruck"
    OBEROESTERREICH_WELS = "wels"
    OBEROESTERREICH_WELS_LAND = "wels-land"

    SALZBURG_HALLEIN = "hallein"
    SALZBURG_SALZBURG_STADT = "salzburg-stadt"
    SALZBURG_SALZBURG_UMGEBUNG = "salzburg-umgebung"
    SALZBURG_SANKT_JOHANN_IM_PONGAU = "sankt-johann-im-pongau"
    SALZBURG_TAMSWEG = "tamsweg"
    SALZBURG_ZELL_AM_SEE = "zell-am-see"

    STEIERMARK_BRUCK_MUERZZUSCHLAG = "bruck-muerzzuschlag"
    STEIERMARK_DEUTSCHLANDSBERG = "deutschlandsberg"
    STEIERMARK_GRAZ = "graz"
    STEIERMARK_GRAZ_UMGEBUNG = "graz-umgebung"
    STEIERMARK_HARTBERG_FUERSTENFELD = "hartberg-fuerstenfeld"
    STEIERMARK_LEIBNITZ = "leibnitz"
    STEIERMARK_LEOBEN = "leoben"
    STEIERMARK_LIEZEN = "liezen"
    STEIERMARK_MURAU = "murau"
    STEIERMARK_MURTAL = "murtal"
    STEIERMARK_SUEDOSTSTEIERMARK = "suedoststeiermark"
    STEIERMARK_VOITSBERG = "voitsberg"
    STEIERMARK_WEIZ = "weiz"

    TIROL_IMST = "imst"
    TIROL_INNSBRUCK = "innsbruck"
    TIROL_INNSBRUCK_LAND = "innsbruck-land"
    TIROL_KITZBUEHEL = "kitzbuehel"
    TIROL_KUFSTEIN = "kufstein"
    TIROL_LANDECK = "landeck"
    TIROL_LIENZ = "lienz"
    TIROL_REUTTE = "reutte"
    TIROL_SCHWAZ = "schwaz"

    VORARLBERG_BLUDENZ = "bludenz"
    VORARLBERG_BREGENZ = "bregenz"
    VORARLBERG_DORNBIRN = "dornbirn"
    VORARLBERG_FELDKIRCH = "feldkirch"

    WIEN_WIEN_01_INNERE_STADT = "wien-1010-innere-stadt"
    WIEN_WIEN_02_LEOPOLDSTADT = "wien-1020-leopoldstadt"
    WIEN_WIEN_03_LANDSTRASSE = "wien-1030-landstrasse"
    WIEN_WIEN_04_WIEDEN = "wien-1040-wieden"
    WIEN_WIEN_05_MARGARETEN = "wien-1050-margareten"
    WIEN_WIEN_06_MARIAHILF = "wien-1060-mariahilf"
    WIEN_WIEN_07_NEUBAU = "wien-1070-neubau"
    WIEN_WIEN_08_JOSEFSTADT = "wien-1080-josefstadt"
    WIEN_WIEN_09_ALSERGRUND = "wien-1090-alsergrund"
    WIEN_WIEN_10_FAVORITEN = "wien-1100-favoriten"
    WIEN_WIEN_11_SIMMERING = "wien-1110-simmering"
    WIEN_WIEN_12_MEIDLING = "wien-1120-meidling"
    WIEN_WIEN_13_HIETZING = "wien-1130-hietzing"
    WIEN_WIEN_14_PENZING = "wien-1140-penzing"
    WIEN_WIEN_15_RUDOLFSHEIM_FUENFHAUS = "wien-1150-rudolfsheim-fuenfhaus"
    WIEN_WIEN_16_OTTAKRING = "wien-1160-ottakring"
    WIEN_WIEN_17_HERNALS = "wien-1170-hernals"
    WIEN_WIEN_18_WAHRING = "wien-1180-waehring"
    WIEN_WIEN_19_DOEBLING = "wien-1190-doebling"
    WIEN_WIEN_20_BRIGITTENAU = "wien-1200-brigittenau"
    WIEN_WIEN_21_FLORIDSDORF = "wien-1210-floridsdorf"
    WIEN_WIEN_22_DONAUSTADT = "wien-1220-donaustadt"
    WIEN_WIEN_23_LIESING = "wien-1230-liesing"

    #GET parameter PROPERTY_TYPE (Immobilientyp)
class PROPERTY_TYPE(Enum):
    ATTIC_APARTMENT = 110           #Dachgeschosswohnung
    GROUND_FLOOR_APARTMENT = 105    #Erdgeschosswohnung
    GARCONNIERE = 111
    COOPERATIVE_APARTMENT = 113     #Genossenschaftswohnung
    LOFT = 100
    MAISONETTE = 101
    PENTHOUSE = 102
    RAW_ATTIC = 112                 #Rohdachboden
    APARTMENT = 3
    SHARED_FLAT = 16
    OTHER = 27

#GET parameter FREE_AREA/FREE_AREA_TYPE (Freiflächen)
class FREE_AREA_TYPE(Enum):
    BALCONY = 20
    ROOF_TERRACE = 40
    GARDEN = 60
    LOGGIA = 30
    TERRACE = 10
    WINTER_GARDEN = 50

#GET parameter ESTATE_PREFERENCE (Ausstattung)
class ESTATE_PREFERENCE(Enum):
    STORAGE_ROOM = 24
    BARRIER_FREE = 25
    CARPORT = 26
    KITCHEN = 27
    ELEVATOR = 4
    GARAGE = 23
    CELLAR = 250
    PARKING_SPACE = 15
    FURNISHED = 28

#GET parameter AVAILABLETODAY
class AVAILABILITY(Enum):
    AVAILABLE_NOW = 1
