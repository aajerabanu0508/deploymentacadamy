import os
from flask import Flask, redirect, render_template, url_for
from cat_quest import quest, MISSIONS

app = Flask(__name__)
app.register_blueprint(quest)


@app.get("/")
def home():
    """Default entry point for standalone Cat Quest game."""
    return render_template("cat_quest.html", missions=MISSIONS)


@app.get("/health")
def health():
    return {"status": "healthy", "service": "cat-quest", "version": "1.0.0"}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    print(f"🐾 Starting Cat Quest Game on http://127.0.0.1:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
