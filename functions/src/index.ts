/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { gql } from "apollo-server-express";
// // import * as ApolloServer from "apollo-server-express";
// const { ApolloServer } = require("apollo-server-express");

const { ApolloServer, gql } = require('apollo-server-cloud-functions');


// import * as admin from "firebase-admin";
// import * as functions from 'firebase-functions';
// import * as express from 'express';





// // For accessing Firestore database

// // const express = require("express");
// // GraphQL dependencies

// // Will initialize with default settings and database
// admin.initializeApp()
// const db = admin.firestore()
// const app = express();


// const server = new ApolloServer({ typeDefs, resolvers });
// server.applyMiddleware({ app, path: '/' })
// exports.graphql = functions.https.onRequest(app);

import * as admin from "firebase-admin";
import * as functions from 'firebase-functions';
// import * as express from 'express';
// const functions = require("firebase-functions");

admin.initializeApp()
const db = admin.firestore()
const typeDefs = gql`
   type User {
        firstName: String
        lastName: String 
        email: String
   }
   type Query {
        users : [User]
   }
`

const resolvers = {
    Query: {
        users: () => {
            return new Promise((resolve, reject) => {
                fetchAllUsers((data: unknown) => {
                    console.log("FETCHED:", data);
                    resolve(data);
                });
            });
        }
    }
}
// Function to fetch all users from database
const fetchAllUsers = (callback: { (data: unknown): void; (arg0: any[]): any; }) => {
    db.collection('users')
        .get()
        .then((item) => {
            console.log("ITEMS", item);
            const items: any[] = [];
            item.docs.forEach((item: any) => {
                items.push(item.data())
            });
            return callback(items);
        })
        .catch(e => console.log("ERROR", e));
}



// const app = express();
// app.get('/hey', (req, res) => res.status(200).send('Hey there!'));
// exports.app = functions.https.onRequest(app);


// const server = new ApolloServer.ApolloError({ typeDefs, resolvers });
// server.applyMiddleware({ app, path: '/' })
// exports.graphql = functions.https.onRequest(app);


const server = new ApolloServer({ typeDefs, resolvers });

exports.graphql = functions
    .region("europe-west3")
    .https.onRequest(server.createHandler())
