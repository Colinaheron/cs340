#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jan 29 17:27:56 2024

@author: colinaheron_snhu
"""

from pymongo import MongoClient
from bson.objectid import ObjectId

class AnimalShelter(object):
    """ CRUD operations for Animal collection in MongoDB """

    def __init__(self):
        # Initializing the MongoClient. This helps to 
        # access the MongoDB databases and collections.
        # This is hard-wired to use the aac database, the 
        # animals collection, and the aac user.
        # Definitions of the connection string variables are
        # unique to the individual Apporto environment.
        #
        # You must edit the connection variables below to reflect
        # your own instance of MongoDB!
        #
        # Connection Variables
        #
        USER = 'aacuser'
        PASS = 'yourpassword'
        HOST = 'nv-desktop-services.apporto.com'
        PORT = 31828
        DB = 'AAC'
        COL = 'animals'
        #
        # Initialize Connection
        #
        # self.client = MongoClient('mongodb://%s:%s@%s:%d' % (USER,PASS,HOST,PORT))
        self.client = pymongo.MongoClient("mongodb://localhost:27017")
        self.database = self.client['%s' % (DB)]
        self.collection = self.database['%s' % (COL)]

# Method to implement the C in CRUD.
    def create(self, data):
        if data is not None:
            self.database.animals.insert_one(data)  # data should be dictionary 
            return True
        else:
            raise Exception("Nothing to save, because data parameter is empty")
            return False

# Method to implement the R in CRUD.
    def read(self, query):
           """
           Read records from the collection based on the query.
   
           Parameters:
           - query (dict): A dictionary representing the query conditions.
   
           Returns:
           - list: A list of documents matching the query conditions.
           """
           if query is not None:
               result = self.collection.find(query)
               return list(result)
           else:
               raise Exception("Query parameter is empty. Provide a valid query.")
               
# Method to implement the U in CRUD.
    def update(self, query, new_data):
        """
        Update records in the collection based on the query.

        Parameters:
        - query (dict): A dictionary representing the query conditions to identify the documents to update.
        - new_data (dict): A dictionary containing the updated data.

        Returns:
        - int: The number of documents updated.
        """
        if query is not None and new_data is not None:
            result = self.collection.update_many(query, {"$set": new_data})
            return result.modified_count
        else:
            raise Exception("Both query and new_data parameters are required.")

# Method to implement the D in CRUD.
    def delete(self, query):
        """
        Delete records from the collection based on the query.

        Parameters:
        - query (dict): A dictionary representing the query conditions to identify the documents to delete.

        Returns:
        - int: The number of documents deleted.
        """
        if query is not None:
            result = self.collection.delete_many(query)
            return result.deleted_count
        else:
            raise Exception("Query parameter is empty. Provide a valid query.")

# mongocrud.py
import pandas as pd
from pymongo import MongoClient

class MongoDBHelper:
    def __init__(self, db_name, collection_name):
        """Initializes MongoDB connection"""
        self.client = MongoClient("mongodb://localhost:27017")
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]

    def import_csv_to_mongo(self, csv_file):
        """Imports CSV data into MongoDB"""
        df = pd.read_csv(csv_file)  # Read the CSV file into a DataFrame
        records = df.to_dict(orient="records")  # Convert DataFrame to a list of dictionaries
        self.collection.insert_many(records)  # Insert records into MongoDB
        print(f"Data from {csv_file} imported successfully!")

    def fetch_all_records(self):
        """Fetches all records from MongoDB collection"""
        records = list(self.collection.find({}))
        for record in records:
            record["_id"] = str(record["_id"])  # Convert MongoDB _id to string for easier JSON handling
        return records

    def clear_collection(self):
        """Clear the MongoDB collection (for testing purposes)"""
        self.collection.delete_many({})

