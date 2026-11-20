// Import Express framework
const express = require("express");

// Import Multer for handling file uploads
const multer = require("multer");

// Import Sharp for image resizing and compression
const sharp = require("sharp");


const cors = require("cors");

// Supabase client
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

// Child Process ko import karna
const { execFile } = require("child_process");

// File paths handle karne ke liye
const path = require("path");

// Files manage karne ke liye
const fs = require("fs");

// Create required folders if they do not exist
["uploads", "processed", "compressed"].forEach((folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
});

// Ghostscript executable ka location
const ghostscriptPath = process.platform === "win32"
    ? "C:\\Program Files\\gs\\gs10.08.0\\bin\\gswin64c.exe"
    : "gs";


// Express application create kar rahe hain
const app = express();
app.use(express.json());
// Enable CORS
app.use(cors());

// Uploaded files ko save karne ki location
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

// Multer upload configuration
const upload = multer({
    storage: storage,

    limits: {
        fileSize: 100 * 1024 * 1024
    }
});


// Server ka port number
const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.send("QuickForm Tools Backend is Running!");
});

// Get all reviews from Supabase
app.get("/reviews", async (req, res) => {

    try {

        const { data, error } = await supabase
            .from("reviews")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Reviews Fetch Error:", error);
            return res.status(500).json({ error: "Failed to fetch reviews" });
        }

        res.json(data);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server error" });

    }

});

// Submit a new review to Supabase
app.post("/reviews", async (req, res) => {

    try {

        const { name, category, rating, comment, user_id } = req.body;

        const { data, error } = await supabase
            .from("reviews")
            .insert([
                {
                    name,
                    category,
                    rating,
                    comment,
                    helpful: 0,
                    user_id
                }
            ])
            .select();

        if (error) {
            console.error("Review Submit Error:", error);
            return res.status(500).json({ error: "Failed to submit review" });
        }

        res.status(201).json(data[0]);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server error" });

    }

});


// Update helpful count
app.patch("/reviews/:id/helpful", async (req, res) => {

    try {

        const { id } = req.params;
        const { visitorId } = req.body;

        if (!visitorId) {
            return res.status(400).json({ error: "Visitor ID is required" });
        }

        const { data: review, error: fetchError } = await supabase
            .from("reviews")
            .select("helpful, helpful_by")
            .eq("id", id)
            .single();

        if (fetchError || !review) {
            return res.status(404).json({ error: "Review not found" });
        }

        const helpfulBy = review.helpful_by || [];

        if (helpfulBy.includes(visitorId)) {
            return res.status(409).json({ error: "Already voted" });
        }

        helpfulBy.push(visitorId);

        const { data, error } = await supabase
            .from("reviews")
            .update({
                helpful: (review.helpful || 0) + 1,
                helpful_by: helpfulBy
            })
            .eq("id", id)
            .select();

        if (error) throw error;

        res.json(data[0]);

    } catch (error) {

        console.error("Helpful Update Error:", error);
        res.status(500).json({ error: "Failed to update helpful count" });

    }

});



// File Upload API
app.post("/upload", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).send("Please upload a file.");
    }

    res.send({
        message: "File uploaded successfully!",
        filename: req.file.filename
    });

});

// Image Resizing API
app.post("/resize-image", upload.single("file"), async (req, res) => {

    // Check whether an image file was uploaded
    if (!req.file) {
        return res.status(400).send("Please upload an image.");
    }

    try {

        // Get the uploaded image path
        const inputPath = path.resolve(req.file.path);

        // Generate the output file name
        const outputName = "resized-" + req.file.filename;

        // Define the output file path
        const outputPath = path.resolve("processed", outputName);

        // Resize the image while maintaining its aspect ratio
        await sharp(inputPath)
            .resize({
                width: 800,
                height: 800,
                fit: "inside",
                withoutEnlargement: true
            })
            .toFile(outputPath);

        // Send the resized image to the user
        res.download(outputPath);

    } catch (error) {

        // Handle image processing errors
        console.error("Image Resizing Error:", error);

        res.status(500).send("Image resizing failed.");
    }

});

// Image Compression API
app.post("/compress-image", upload.single("file"), async (req, res) => {

    if (!req.file) {
        return res.status(400).send("Please upload an image.");
    }

    try {

        const inputPath = path.resolve(req.file.path);

        const outputName = "compressed-" + path.parse(req.file.filename).name + ".webp";

        const outputPath = path.resolve("processed", outputName);

        await sharp(inputPath)
            .rotate()
            .webp({
                quality: 75
            })
            .toFile(outputPath);

        res.download(outputPath);

    } catch (error) {

        console.error("Image Compression Error:", error);

        res.status(500).send("Image compression failed.");

    }

});


// PDF Compression API
app.post("/compress-pdf", upload.single("file"), (req, res) => {

    if (!req.file) {
        return res.status(400).send("Please upload a PDF file.");
    }

    const inputPath = path.resolve(req.file.path);

    const outputName = "compressed-" + req.file.filename;
    const outputPath = path.resolve("compressed", outputName);

    const args = [
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/ebook",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        `-sOutputFile=${outputPath}`,
        inputPath
    ];

    execFile(ghostscriptPath, args, (error) => {

        if (error) {
            console.log("Compression Error:", error);
            return res.status(500).send("PDF compression failed.");
        }

        res.download(outputPath);

    });

});

// Server start karna
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
