import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect("mongodb+srv://Sahisk1010:sahilsk1010@cluster0.zt7oku9.mongodb.net/Unisys", {
         
        });
        console.log("Connection successful");
    } catch (error) {
        console.error("Connection failed:", error);
    }
}


export async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log("Disconnected");
    } catch (error) {
        console.error("Disconnection failed:", error);
    }
}
