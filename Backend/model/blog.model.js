import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            trim: true,
            default: 'General',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // Automatically manages `createdAt` and `updatedAt`
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
