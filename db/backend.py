import sys
sys.path.append('.')
from lib.db import  Db_handler
from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
import json

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

@app.route('/insertDraw', methods=['POST'])
def insert():
    insert_data = request.get_json().get('sql', '')
    json_data = json.loads(insert_data)


    # Assuming insert_data is a dictionary with keys 'name' and 'data'
    draw_name = json_data.get('name', '')
    data_js = json_data.get('data', '')
    data_js = json.dumps(data_js)
    # Create the SQL query
    try:
        # Connect to SQLite database
        conn = sqlite3.connect('db/noData.db')

        # Create a cursor object
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM draw_data WHERE draw_name = ?", (draw_name,))
        data = cursor.fetchone()

        if data is None:
            # If draw_name does not exist, insert new data
            cursor.execute('INSERT INTO draw_data (draw_name, data_Js) VALUES (?, ?)', (draw_name, data_js))
        else:
            # If draw_name exists, update the existing data
            cursor.execute('UPDATE draw_data SET data_Js = ? WHERE draw_name = ?', (data_js, draw_name))

        # Commit the changes
        cursor.connection.commit()
    except sqlite3.Error as e:
        print(f"An error occurred: {e}")

    if conn:
        conn.close()

    return jsonify({'status': 'success'})



if __name__ == '__main__':
    db_connection: Db_handler = Db_handler("./db/noData.db", "draw_data")

    app.run(debug=True, port=4201)

