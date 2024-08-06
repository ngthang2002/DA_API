const mongoose = require("mongoose");
// const faker = require("faker");
const { faker } = require("@faker-js/faker");
const Post = require("./models/Post.js"); // Đường dẫn đến file model Post

// Kết nối tới MongoDB
const connectDb = async () => {
    try {
        mongoose.set("strictQuery", true);
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const createFakeData = async () => {
    try {
        for (let i = 0; i < 10; i++) {
            const post = new Post({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraphs(),
                author: new mongoose.Types.ObjectId(), // Giả định bạn có các ObjectId của user
                media: [
                    {
                        type: "image",
                        url: faker.image.url(),
                    },
                ],
                comments: [
                    {
                        userId: new mongoose.Types.ObjectId(),
                        text: faker.lorem.sentence(),
                        replies: [
                            {
                                userId: new mongoose.Types.ObjectId(),
                                text: faker.lorem.sentence(),
                            },
                        ],
                    },
                ],
                likes: [
                    new mongoose.Types.ObjectId(),
                    new mongoose.Types.ObjectId(),
                ],
                tags: [faker.lorem.word(), faker.lorem.word()],
                status: "public",
            });
            await post.save();
        }
        console.log("Fake data inserted successfully");
    } catch (error) {
        console.error("Error inserting fake data:", error);
    } finally {
        mongoose.connection.close();
    }
};

// createFakeData();

module.exports = createFakeData;
