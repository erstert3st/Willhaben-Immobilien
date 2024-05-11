import sys
sys.path.append('.')
from lib.db import  Db_handler
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/query', methods=['POST'])
def query():
    sql = request.get_json().get('sql', '')

    # Connect to SQLite database
    conn = sqlite3.connect('db/noData.db')
    conn.row_factory = sqlite3.Row

    # Create a cursor object
    cursor = conn.cursor()
    # Execute the query
    cursor.execute(sql)

    # Fetch all rows from the query
    rows = cursor.fetchall()

    # Convert rows to JSON
    data = [dict(ix) for ix in rows]  # convert sqlite3.Row objects to dicts

    return jsonify(data)

@app.route('/insert', methods=['POST'])
def insert():
    data = request.get_json()
    table = data.get('table', '')
    values = data.get('values', {})

    # Create a list of column names and a list of corresponding placeholders
    columns = ', '.join(values.keys())
    placeholders = ', '.join('?' for _ in values)

    # Create the SQL query
    sql = f'INSERT INTO {table} ({columns}) VALUES ({placeholders})'

    # Connect to SQLite database
    conn = sqlite3.connect('db/noData.db')

    # Create a cursor object
    cursor = conn.cursor()

    # Execute the query
    cursor.execute(sql, list(values.values()))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    return jsonify({'status': 'success'})



if __name__ == '__main__':
    db_connection: Db_handler = Db_handler("./db/noData.db", "draw_data")

    app.run(debug=True, port=4201)

