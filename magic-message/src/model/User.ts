import mongoose, { Schema, Document } from "mongoose";
import { Content } from "next/font/google";

export interface Messages extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Messages> = new Schema({
    // Schema<Message> this is custom schema of message. (TypeSafety)
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Messages[];
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [emailRegex, "Please use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "verifyCode is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verify code Expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>("User", UserSchema);

export default UserModel;
