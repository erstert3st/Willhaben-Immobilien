import sqlite3
connection = sqlite3.connect("db/noData.db")
print(connection.total_changes)