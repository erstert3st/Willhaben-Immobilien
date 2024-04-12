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


if __name__ == '__main__':
    app.run(debug=True, port=4201)

