
// @deno-types="npm:@types/express@4"
import express from "express";
import mongoose from "mongoose"
import { postBooking, postClient, postRestaurant } from "./resolvers/posts.ts";
import { getBooking, getClient, getRestaurant } from "./resolvers/gets.ts";
import { delBooking, delRestaurant, delall,delallRestaurants } from "./resolvers/deletes.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL)



const app = express()
app.use(express.json());

app
//posts
.post("/client",postClient)
.post("/restaurant",postRestaurant)
.post("/booking",postBooking)
//gets
.get("/client/:id",getClient)
.get("/restaurant/:id",getRestaurant)
.get("/booking/:id",getBooking)
//deletes
.delete("/booking/:id",delBooking)
.delete("/restaurant/:id",delRestaurant)
.delete("/restaurant",delallRestaurants)
//Borrado total
.delete("/x",delall)
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});