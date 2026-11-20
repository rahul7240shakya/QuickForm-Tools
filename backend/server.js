// Import Express framework
const express = require("express");

// Import Multer for handling file uploads
const multer = require("multer");

// Import Sharp for image resizing and compression
const sharp = require("sharp");


const cors = require("cors");

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
