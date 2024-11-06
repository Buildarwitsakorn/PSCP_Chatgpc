from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    message = "dee"
    return render_template('Front-Board Game.html', message=message)

if __name__ == '__main__':
    # รันเซิร์ฟเวอร์ Flask บนพอร์ต 5500
    app.run(debug=True, port=5500)