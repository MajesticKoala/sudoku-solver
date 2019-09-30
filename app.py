from flask import Flask, request, render_template, url_for, jsonify
from sudoku import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-sudoku', methods=['POST'])
def generateSudoku():
    if request.method == 'POST':
        sudokuArray = GenerateSudoku(1,50)
        return jsonify(sudokuArray.tolist())

if __name__ == "__main__":
    app.run(debug=True)