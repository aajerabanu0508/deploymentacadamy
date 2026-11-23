import os
import re
import secrets
import sqlite3
from contextlib import closing, contextmanager
from pathlib import Path

from flask import Blueprint, current_app, jsonify, render_template, request

quest = Blueprint("cat_quest", __name__, url_prefix="/cat-quest")

MISSIONS = (
    ("Linux", "🐧"),
    ("Networking", "🌐"),
    ("Git & GitHub", "🐙"),
    ("CI", "⚙️"),
    ("Docker", "🐳"),
    ("Registry", "📦"),
    ("Kubernetes", "☸️"),
    ("Operations", "📡"),
)


@contextmanager
def database():
    url = os.environ.get("DATABASE_URL")
    if url:
        import psycopg

        connection = psycopg.connect(url)
        placeholder = "%s"
    else:
        folder = Path(current_app.instance_path)
        folder.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(folder / "cat_quest.sqlite3")
        placeholder = "?"
    with closing(connection), connection:
        connection.execute(
            "CREATE TABLE IF NOT EXISTS cat_quest_progress "
            "(player_id TEXT PRIMARY KEY, checkpoint INTEGER NOT NULL)"
        )
        yield connection, placeholder


def player_id():
    token = request.cookies.get("cat_quest_player", "")
    return token if re.fullmatch(r"[0-9a-f]{64}", token) else None


def game_state(checkpoint):
    return {"checkpoint": checkpoint, "xp": checkpoint * 100, "total": len(MISSIONS)}


@quest.get("/")
def play():
    return render_template("cat_quest.html", missions=MISSIONS)


@quest.get("/progress")
def progress():
    token = player_id() or secrets.token_hex(32)
    with database() as (connection, param):
        connection.execute(
            f"INSERT INTO cat_quest_progress VALUES ({param}, 0) ON CONFLICT (player_id) DO NOTHING",
            (token,),
        )
        checkpoint, = connection.execute(
            f"SELECT checkpoint FROM cat_quest_progress WHERE player_id = {param}", (token,)
        ).fetchone()
    response = jsonify(game_state(checkpoint))
    response.headers["Cache-Control"] = "no-store"
    response.set_cookie("cat_quest_player", token, max_age=31536000, httponly=True,
                        samesite="Lax", secure=request.is_secure, path=request.script_root + "/cat-quest/")
    return response


@quest.post("/collect")
def collect():
    token = player_id()
    data = request.get_json(silent=True)
    if not token or not isinstance(data, dict):
        return jsonify(error="Load the game before collecting a badge."), 400
    stage = data.get("stage")
    if type(stage) is not int or not 0 <= stage < len(MISSIONS):
        return jsonify(error="Invalid stage."), 400

    with database() as (connection, param):
        updated = connection.execute(
            f"UPDATE cat_quest_progress SET checkpoint = checkpoint + 1 "
            f"WHERE player_id = {param} AND checkpoint = {param}", (token, stage)
        )
        if not updated.rowcount:
            return jsonify(error="Your mission changed. Reloading progress."), 409
    return jsonify(game_state(stage + 1))


@quest.post("/restart")
def restart():
    token = player_id()
    if not token or request.get_json(silent=True) != {"restart": True}:
        return jsonify(error="Load the game before restarting."), 400
    with database() as (connection, param):
        updated = connection.execute(
            f"UPDATE cat_quest_progress SET checkpoint = 0 WHERE player_id = {param}", (token,)
        )
        if not updated.rowcount:
            return jsonify(error="Player not found."), 409
    return jsonify(game_state(0))
