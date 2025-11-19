from flask import Flask, jsonify, render_template
from datetime import datetime
import socket

app = Flask(__name__)

@app.route("/")
def index():
    hostname = socket.gethostname()
    return render_template("index.html", hostname=hostname)

@app.route("/health")
def health():
    return jsonify({
        "status": "OK",
        "time": datetime.utcnow().isoformat() + "Z"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
