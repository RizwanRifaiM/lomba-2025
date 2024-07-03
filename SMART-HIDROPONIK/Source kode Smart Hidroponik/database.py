from flask import Flask, request, jsonify # Memanggil flask untuk membuat local server , request untuk  dan jsonify
import paho.mqtt.client as mq
from pymongo import MongoClient as mongo

web = Flask(__name__)

