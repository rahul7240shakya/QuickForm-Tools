
// =====================================
// 1. SELECT HTML ELEMENTS
// =====================================

const navbarSearch = document.querySelector(".nav-search input");

const heroSearch = document.querySelector(".hero-search input");

const searchButton = document.querySelector(".hero-search button");

const toolCards = document.querySelectorAll(".tool-card");

const toolsContainer = document.querySelector(".tools-container");

// =====================================
// GOOGLE ANALYTICS TOOL TRACKING
// =====================================

function trackToolUsage(toolName) {
    if (typeof gtag === "function") {
        gtag("event", "tool_used", {
            tool_name: toolName
        });
    }
}

// =====================================
// INLINE NOTIFICATION FUNCTION
// =====================================

function showToolMessage(element, message, type = "info") {

    element.textContent = message;

    element.style.padding = "10px";
    element.style.marginTop = "10px";
    element.style.fontSize = "14px";

    if (type === "error") {
        element.style.color = "#dc2626";
    } else if (type === "success") {
        element.style.color = "#15803d";
    } else {
        element.style.color = "#6839e8";
    }

}


// =====================================
// 2. CREATE NO RESULTS MESSAGE
// =====================================

const noResults = document.createElement("p");

noResults.textContent = "No tools found! Try another search.";

noResults.style.textAlign = "center";
noResults.style.padding = "20px";
noResults.style.color = "#6839e8";

noResults.style.display = "none";

toolsContainer.after(noResults);


// =====================================
// 3. SEARCH FUNCTION
// =====================================

function searchTools(searchText) {

    let found = 0;

    // Convert search text into lowercase
    searchText = searchText.toLowerCase().trim();

    // Check every tool card
    toolCards.forEach(function(card) {

        const toolName = card.textContent.toLowerCase();

        if (toolName.includes(searchText)) {

            card.style.display = "block";

            found++;

        } else {

            card.style.display = "none";

        }

    });


    // Show message if no tool is found
    if (found === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// =====================================
// 4. NAVBAR SEARCH
// =====================================

navbarSearch.addEventListener("input", function() {

    const searchText = navbarSearch.value;

    heroSearch.value = searchText;

    searchTools(searchText);

});


// =====================================
// 5. HERO SEARCH BUTTON
// =====================================

searchButton.addEventListener("click", function() {

    const searchText = heroSearch.value;

    navbarSearch.value = searchText;

    searchTools(searchText);

    document.querySelector("#popular-tools").scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================
// 6. HERO SEARCH ENTER KEY
// =====================================

heroSearch.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchButton.click();

    }

});

/* Word count JS */

const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const characterCount = document.getElementById("characterCount");

textInput.addEventListener("input", function () {

    const text = textInput.value;

    const characters = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    wordCount.textContent = words;
    characterCount.textContent = characters;
});


const clearButton = document.getElementById("clearButton");

clearButton.addEventListener("click", function () {

    textInput.value = "";

    wordCount.textContent = 0;

    characterCount.textContent = 0;

});

/* word counter window */


/* Reusable Modal System */

const toolModal = document.getElementById("toolModal");

const modalClose = document.getElementById("modalClose");

// Open popup
function openModal() {
    toolModal.style.display = "flex";
}

// Close popup
function closeModal() {
    toolModal.style.display = "none";
}

// Cross button click
modalClose.addEventListener("click", closeModal);

// Background click
toolModal.addEventListener("click", function(event) {

    if (event.target === toolModal) {
        closeModal();
    }

});

// Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});

// Select Word Counter card

const wordCounterCard = document.querySelectorAll(".tool-card")[3];

wordCounterCard.addEventListener("click", function(event) {

    // Prevent unwanted scrolling
    event.preventDefault();

    trackToolUsage("Word Counter");

    // Open Word Counter popup
    openModal();

});

// Stop unwanted scrolling on other tool cards

const allToolCards = document.querySelectorAll(".tool-card");

allToolCards.forEach(function(card) {

    card.addEventListener("click", function(event) {

        event.preventDefault();

    });

});

/* hightlight animation */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const targetId = link.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            targetSection.classList.remove("highlight-section");

            void targetSection.offsetWidth;

           // targetSection.classList.add("highlight-section");
           window.addEventListener("scrollend", function() {

    targetSection.classList.remove("highlight-section");

    void targetSection.offsetWidth;

    targetSection.classList.add("highlight-section");

}, { once: true });

        }

    });

});


// ==================================
// CASE CONVERTER MODAL FUNCTIONALITY
// ==================================

// Select Case Converter Modal
const caseModal = document.getElementById("caseModal");

// Select Modal Close Button
const caseModalClose = document.getElementById("caseModalClose");

// Select Case Converter Card (5th Tool Card)
const caseConverterCard = document.querySelectorAll(".tool-card")[4];

// Select Use Tool Link
const caseConverterLink = caseConverterCard.querySelector("a");


// OPEN CASE CONVERTER MODAL
function openCaseModal() {
    caseModal.style.display = "flex";
}


// CLOSE CASE CONVERTER MODAL
function closeCaseModal() {
    caseModal.style.display = "none";
}


// OPEN MODAL WHEN USER CLICKS USE TOOL
caseConverterLink.addEventListener("click", function(event) {

    event.preventDefault();

    trackToolUsage("Case Converter");

    openCaseModal();

});


// CLOSE MODAL USING CROSS BUTTON
caseModalClose.addEventListener("click", closeCaseModal);


// CLOSE MODAL WHEN USER CLICKS OUTSIDE THE POPUP
caseModal.addEventListener("click", function(event) {

    if (event.target === caseModal) {
        closeCaseModal();
    }

});


// CLOSE MODAL USING ESCAPE KEY
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeCaseModal();
    }

});

// ==================================
// CASE CONVERTER FUNCTIONALITY
// ==================================

// Select Textarea
const caseInput = document.getElementById("caseInput");

// Select All Conversion Buttons
const upperCase = document.getElementById("upperCase");
const lowerCase = document.getElementById("lowerCase");
const titleCase = document.getElementById("titleCase");
const sentenceCase = document.getElementById("sentenceCase");

// UPPERCASE BUTTON FUNCTIONALITY

upperCase.addEventListener("click", function() {

    const text = caseInput.value;

    caseInput.value = text.toUpperCase();

});

// ==================================
// LOWERCASE BUTTON FUNCTIONALITY
// ==================================

lowerCase.addEventListener("click", function() {

    // Get text from textarea
    const text = caseInput.value;

    // Convert text into lowercase
    caseInput.value = text.toLowerCase();

});

// ==================================
// TITLE CASE BUTTON FUNCTIONALITY
// ==================================

titleCase.addEventListener("click", function() {

    // Get text from textarea
    const text = caseInput.value;

    // Convert first letter of every word into uppercase
    const convertedText = text.toLowerCase().replace(/\b\w/g, function(letter) {
        return letter.toUpperCase();
    });

    // Display converted text
    caseInput.value = convertedText;

});

// ==================================
// SENTENCE CASE BUTTON FUNCTIONALITY
// ==================================

sentenceCase.addEventListener("click", function() {

    // Get text from textarea
    const text = caseInput.value;

    // Convert entire text into lowercase
    const lowerText = text.toLowerCase();

    // Capitalize first letter and letters after sentence-ending punctuation
    const convertedText = lowerText.replace(/(^\s*\w|[.!?]\s+\w)/g, function(letter) {
        return letter.toUpperCase();
    });

    // Display converted text
    caseInput.value = convertedText;

});


// ==================================
// PDF COMPRESSOR MODAL
// ==================================

// Select PDF Modal Elements
const pdfModal = document.getElementById("pdfModal");
const pdfModalClose = document.getElementById("pdfModalClose");

// Select PDF Compressor Card
const pdfCompressorCard = document.querySelectorAll(".tool-card")[0];

// Select Use Tool Link
const pdfCompressorLink = pdfCompressorCard.querySelector("a");

// Open PDF Modal
function openPdfModal() {
    pdfModal.style.display = "flex";
}

// Close PDF Modal
function closePdfModal() {
    console.log("PDF Modal Close Triggered");
    console.trace();
    pdfModal.style.display = "none";
}

// Open popup on Use Tool click
pdfCompressorLink.addEventListener("click", function(event) {

    event.preventDefault();

    trackToolUsage("PDF Compressor");

    openPdfModal();

});

// Close popup using cross button
pdfModalClose.addEventListener("click", closePdfModal);

// Close popup by clicking outside
pdfModal.addEventListener("click", function(event) {

    if (event.target === pdfModal) {
        closePdfModal();
    }

});

// Close popup using Escape key
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closePdfModal();
    }

});


// ==================================
// PDF FILE SELECTION
// ==================================

// Select PDF Input
const pdfInput = document.getElementById("pdfInput");

// Select File Name Display
const pdfFileName = document.getElementById("pdfFileName");

// Detect when user selects a PDF

pdfInput.addEventListener("change", function() {
    const file = pdfInput.files[0];
    const removePdfBtn = document.getElementById("removePdfBtn");

    if (file) {
        const fileSize = (file.size / (1024 * 1024)).toFixed(2);
        pdfFileName.textContent = file.name + " (" + fileSize + " MB)";

        // Show Remove File button
        removePdfBtn.style.display = "block";

    } else {
        pdfFileName.textContent = "No file selected";

        // Hide Remove File button
        removePdfBtn.style.display = "none";
    }
});




// ==================================
// PDF COMPRESSION FUNCTIONALITY
// ==================================

// Select Compress Button and Result Area
const compressPdfBtn = document.getElementById("compressPdfBtn");
const pdfResult = document.getElementById("pdfResult");


// Compress PDF Button Click
compressPdfBtn.addEventListener("click", async function(event) {
    console.log("PDF BUTTON HANDLER STARTED");
    event.preventDefault();
    // alert"Button Click Detected!");
    console.log("Current page URL:", window.location.href);

    // Get selected PDF file
    const file = pdfInput.files[0];

    // Check whether a file is selected
    if (!file) {
        pdfResult.textContent = "Please select a PDF file first.";
        return;
    }

    try {

        // Disable button during compression
        compressPdfBtn.disabled = true;
        compressPdfBtn.textContent = "Compressing...";
        compressPdfBtn.classList.add("is-loading");

        pdfResult.textContent = "Compressing your PDF. Please wait...";


        // Create FormData to send PDF to backend
        const formData = new FormData();

        formData.append("file", file);


        
// Send PDF to Node.js backend
console.log("Sending PDF to backend...");

const response = await fetch("https://quickform-tools.onrender.com/compress-pdf", {
    method: "POST",
    body: formData
});

console.log("Backend response status:", response.status);

// Check whether compression was successful
if (!response.ok) {
    throw new Error("PDF compression failed.");
}


        // Receive compressed PDF from backend
        console.log("Receiving compressed PDF...");
        const compressedBlob = await response.blob();
        console.log("PDF received. Size:", compressedBlob.size);
        // alert"Backend response received!");


        // Calculate file sizes
        const originalSize = file.size / (1024 * 1024);

        const compressedSize = compressedBlob.size / (1024 * 1024);

        const savedSize = originalSize - compressedSize;

        const reduction = (savedSize / originalSize) * 100;


        // Create download link
        const downloadUrl = URL.createObjectURL(compressedBlob);

        const downloadLink = document.createElement("a");

        downloadLink.href = downloadUrl;

        downloadLink.download = "compressed_" + file.name;

        downloadLink.textContent = "Download Compressed PDF";


        // Display compression result
        pdfResult.innerHTML = "";

        const resultText = document.createElement("p");

        resultText.textContent =
            "Original: " + originalSize.toFixed(2) + " MB | " +
            "New: " + compressedSize.toFixed(2) + " MB";

        pdfResult.appendChild(resultText);


        // Display size reduction
        const message = document.createElement("p");

        if (savedSize > 0) {
            message.textContent =
                "File size reduced by " + reduction.toFixed(2) + "%";
        } else {
            message.textContent =
                "File size could not be reduced further.";
        }

        pdfResult.appendChild(message);


        // Add download link
        downloadLink.style.display = "inline-block";

        downloadLink.style.marginTop = "15px";

        pdfResult.appendChild(downloadLink);


    } catch (error) {

        console.error("PDF Compression Error:", error);

        pdfResult.textContent =
            "Unable to compress PDF. Please try again.";

    } finally {

        // Enable button again
        compressPdfBtn.disabled = false;

        compressPdfBtn.textContent = "Compress PDF";

        compressPdfBtn.classList.remove("is-loading");

    }

});




// REMOVE PDF FILE FUNCTIONALITY

const removePdfBtn = document.getElementById("removePdfBtn");

removePdfBtn.addEventListener("click", function() {

    // Remove selected PDF
    pdfInput.value = "";

    // Reset file name
    pdfFileName.textContent = "No file selected";

    // Clear compression results
    pdfResult.innerHTML = "";

    // Hide Remove File button
    removePdfBtn.style.display = "none";

    // Reset Compress button
    compressPdfBtn.disabled = false;
    compressPdfBtn.textContent = "Compress PDF";

});

// Detect unexpected page refresh
window.addEventListener("beforeunload", function() {
    console.log("WARNING: PAGE IS RELOADING!");
    console.trace();
});

// =====================================
// IMAGE TOOL MODAL FUNCTIONALITY
// =====================================

// Select Image Tool Cards
const imageToolCards = document.querySelectorAll("#image-tools .tool-card");

// Select Image Resizer Modal Elements
const resizeModal = document.getElementById("resizeModal");
const resizeModalClose = document.getElementById("resizeModalClose");

// Select Image Compressor Modal Elements
const compressImageModal = document.getElementById("compressImageModal");
const compressImageModalClose = document.getElementById("compressImageModalClose");


// Open Image Resizer Modal
function openResizeModal() {
    resizeModal.style.display = "flex";
}

// Close Image Resizer Modal
function closeResizeModal() {
    resizeModal.style.display = "none";
}

// Open Image Compressor Modal
function openCompressImageModal() {
    compressImageModal.style.display = "flex";
}

// Close Image Compressor Modal
function closeCompressImageModal() {
    compressImageModal.style.display = "none";
}


// Open Image Resizer on Card Click
imageToolCards[0].querySelector("a").addEventListener("click", function(event) {
    event.preventDefault();
    openResizeModal();
});

// Open Image Compressor on Card Click
imageToolCards[1].querySelector("a").addEventListener("click", function(event) {
    event.preventDefault();
    openCompressImageModal();
});


// Close Image Resizer Modal
resizeModalClose.addEventListener("click", closeResizeModal);

resizeModal.addEventListener("click", function(event) {
    if (event.target === resizeModal) {
        closeResizeModal();
    }
});


// Close Image Compressor Modal
compressImageModalClose.addEventListener("click", closeCompressImageModal);

compressImageModal.addEventListener("click", function(event) {
    if (event.target === compressImageModal) {
        closeCompressImageModal();
    }
});


// Close Image Tool Modals Using Escape Key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeResizeModal();
        closeCompressImageModal();
    }
});


// =====================================
// IMAGE FILE SELECTION FUNCTIONALITY
// =====================================

// Select Image Resizer Elements
const resizeImageInput = document.getElementById("resizeImageInput");
const resizeImageFileName = document.getElementById("resizeImageFileName");
const removeResizeImageBtn = document.getElementById("removeResizeImageBtn");

// Select Image Compressor Elements
const compressImageInput = document.getElementById("compressImageInput");
const compressImageFileName = document.getElementById("compressImageFileName");
const removeCompressImageBtn = document.getElementById("removeCompressImageBtn");


// Display Selected Image Details
function displayImageDetails(input, fileNameElement, removeButton) {

    const file = input.files[0];

    if (!file) {
        return;
    }

    // Validate Image File Type
    if (!file.type.startsWith("image/")) {
        // alert"Please select a valid image file.");
        input.value = "";
        return;
    }

    // Validate File Size
    if (file.size > 100 * 1024 * 1024) {
        // alert"Image size must not exceed 100 MB.");
        input.value = "";
        return;
    }

    // Display File Name and Size
    const fileSize = (file.size / (1024 * 1024)).toFixed(2);

    fileNameElement.textContent = `${file.name} (${fileSize} MB)`;

    removeButton.style.display = "block";
}


// Image Resizer File Selection
resizeImageInput.addEventListener("change", function() {
    displayImageDetails(
        resizeImageInput,
        resizeImageFileName,
        removeResizeImageBtn
    );
});


// Image Compressor File Selection
compressImageInput.addEventListener("change", function() {
    displayImageDetails(
        compressImageInput,
        compressImageFileName,
        removeCompressImageBtn
    );
});


// Remove Selected Resizer Image
removeResizeImageBtn.addEventListener("click", function() {
    resizeImageInput.value = "";
    resizeImageFileName.textContent = "No image selected";
    removeResizeImageBtn.style.display = "none";
});


// =====================================
// IMAGE RESIZER FUNCTIONALITY
// =====================================

const resizeImageBtn = document.getElementById("resizeImageBtn");

resizeImageBtn.addEventListener("click", async function() {

    const file = resizeImageInput.files[0];

    if (!file) {
        // alert"Please select an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    resizeImageBtn.disabled = true;
    resizeImageBtn.textContent = "Resizing...";

    try {

        const response = await fetch("https://quickform-tools.onrender.com/resize-image", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const blob = await response.blob();

        const downloadUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "resized-" + file.name;

        downloadLink.textContent = "Download Resized Image";
        downloadLink.style.display = "inline-block";
        downloadLink.style.marginTop = "15px";
        downloadLink.style.color = "#6839e8";
        downloadLink.style.fontWeight = "bold";

        const result = document.getElementById("resizeImageResult");
        result.innerHTML = "";
        result.appendChild(downloadLink);

        downloadLink.addEventListener("click", function() {
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        });

    } catch (error) {

        console.error("Image Resizing Error:", error);
        // alert"Image resizing failed. Please try again.");

    } finally {

        resizeImageBtn.disabled = false;
        resizeImageBtn.textContent = "Resize Image";

    }

});

// =====================================
// IMAGE COMPRESSOR FUNCTIONALITY
// =====================================

const compressImageBtn = document.getElementById("compressImageBtn");

compressImageBtn.addEventListener("click", async function() {

    const file = compressImageInput.files[0];

    if (!file) {
        // alert"Please select an image first.");
        return;
    }

    trackToolUsage("Image Compressor");

    const formData = new FormData();
    formData.append("file", file);

    compressImageBtn.disabled = true;
    compressImageBtn.textContent = "Compressing...";

    try {

        const response = await fetch("https://quickform-tools.onrender.com/compress-image", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const blob = await response.blob();

        const downloadUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "compressed-" + file.name.split(".")[0] + ".webp";

        downloadLink.textContent = "Download Compressed Image";
        downloadLink.style.display = "inline-block";
        downloadLink.style.marginTop = "15px";
        downloadLink.style.color = "#6839e8";
        downloadLink.style.fontWeight = "bold";

        const result = document.getElementById("compressImageResult");
        result.innerHTML = "";
        result.appendChild(downloadLink);

        downloadLink.addEventListener("click", function() {
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        });

    } catch (error) {

        console.error("Image Compression Error:", error);
        // alert"Image compression failed. Please try again.");

    } finally {

        compressImageBtn.disabled = false;
        compressImageBtn.textContent = "Compress Image";

    }

});

// Remove Selected Compressor Image
removeCompressImageBtn.addEventListener("click", function() {
    compressImageInput.value = "";
    compressImageFileName.textContent = "No image selected";
    removeCompressImageBtn.style.display = "none";
});

// =====================================
// ABOUT MODAL FUNCTIONALITY
// =====================================

const aboutLearnMore = document.getElementById("aboutLearnMore");
const aboutModal = document.getElementById("aboutModal");
const aboutClose = document.getElementById("aboutClose");

aboutLearnMore.addEventListener("click", function(event) {
    event.preventDefault();
    aboutModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

aboutClose.addEventListener("click", function() {
    aboutModal.style.display = "none";
    document.body.style.overflow = "";
});

aboutModal.addEventListener("click", function(event) {
    if (event.target === aboutModal) {
        aboutModal.style.display = "none";
        document.body.style.overflow = "";
    }
});


// =====================================
// REVIEWS MODAL FUNCTIONALITY
// =====================================

const openReviews = document.getElementById("openReviews");
const reviewsModal = document.getElementById("reviewsModal");
const reviewsClose = document.getElementById("reviewsClose");

// Open Reviews Modal
openReviews.addEventListener("click", function() {
    reviewsModal.style.display = "flex";
    document.body.style.overflow = "hidden";
});

// Close Reviews Modal
reviewsClose.addEventListener("click", function() {
    reviewsModal.style.display = "none";
    document.body.style.overflow = "";
});

// Close Modal on Background Click
reviewsModal.addEventListener("click", function(event) {
    if (event.target === reviewsModal) {
        reviewsModal.style.display = "none";
        document.body.style.overflow = "";
    }
});


// =====================================
// REVIEW STAR RATING FUNCTIONALITY
// =====================================

const ratingButtons = document.querySelectorAll("#ratingInput button");
let selectedRating = 0;

ratingButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        selectedRating = Number(button.dataset.rating);

        ratingButtons.forEach(function(star) {
            const rating = Number(star.dataset.rating);

            if (rating <= selectedRating) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });

    });
});



// =====================================
// REVIEW CARD FUNCTIONALITY
// =====================================

const submitReview = document.getElementById("submitReview");
const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");
const reviewsContainer = document.getElementById("reviewsContainer");

const reviewStorageKey = "quickformReviews";
const API_BASE_URL = "https://quickform-tools.onrender.com";
// Load Saved Reviews
function getSavedReviews() {
    try {

        const reviews = JSON.parse(localStorage.getItem(reviewStorageKey)) || [];

        let updated = false;

        reviews.forEach(function(review) {

            if (!review.id) {
                review.id = Date.now().toString() + Math.random().toString(36).slice(2);
                updated = true;
            }

            if (typeof review.helpful !== "number") {
                review.helpful = 0;
                updated = true;
            }

            if (!Array.isArray(review.helpfulBy)) {
                review.helpfulBy = [];
                updated = true;
            }

        });

        if (updated) {
            localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
        }

        return reviews;

    } catch (error) {
        return [];
    }
}

//Review


async function loadReviewsFromServer() {

    try {

        const response = await fetch(`${API_BASE_URL}/reviews`);

        if (!response.ok) {
            throw new Error("Failed to load reviews");
        }

        const data = await response.json();

        const reviews = data.map(review => ({
            id: String(review.id),
            name: review.name,
            rating: Number(review.rating),
            feedback: review.comment,
            timestamp: new Date(review.created_at).getTime(),
            helpful: review.helpful || 0,
            helpfulBy: review.helpful_by || []
        }));

        localStorage.setItem(
            reviewStorageKey,
            JSON.stringify(reviews)
        );

        displayReviews();

    } catch (error) {

        console.error("Reviews Loading Error:", error);
        displayReviews();

    }

}


// Display Reviews
function displayReviews() {

    const savedReviews = getSavedReviews();

    reviewsContainer.innerHTML = "";

    if (savedReviews.length === 0) {

        reviewsContainer.innerHTML = `
            <div class="no-reviews">
                <div class="empty-stars">★★★★★</div>
                <h3>Be the First to Review!</h3>
                <p>Your feedback helps us improve QuickForm.</p>
            </div>
        `;

        return;
    }

    // Create Rating Groups
    for (let ratingValue = 5; ratingValue >= 1; ratingValue--) {

       const groupReviews = savedReviews
    .filter(review => Number(review.rating) === ratingValue)
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

        if (groupReviews.length === 0) {
            continue;
        }

        const ratingGroup = document.createElement("div");
        ratingGroup.className = "review-group";
        ratingGroup.dataset.rating = ratingValue;

        const groupHeading = document.createElement("h3");
        groupHeading.textContent = `${ratingValue}-Star Reviews`;

        const groupCards = document.createElement("div");
        groupCards.className = "review-group-cards";

        groupReviews.forEach(function(review, index) {

            const reviewCard = document.createElement("div");
            reviewCard.className = "review-card";

            const heading = document.createElement("h4");
            heading.textContent = review.name;

            const rating = document.createElement("div");
            rating.className = "review-card-stars";
            rating.textContent =
                "★".repeat(Number(review.rating)) +
                "☆".repeat(5 - Number(review.rating));

            const message = document.createElement("p");
            message.textContent = review.feedback;

            reviewCard.appendChild(heading);
            reviewCard.appendChild(rating);
            reviewCard.appendChild(message);

            // Create Helpful Button
const helpfulButton = document.createElement("button");

let visitorId = localStorage.getItem("quickformVisitorId");

if (!visitorId) {
    visitorId = Date.now().toString() + Math.random().toString(36).slice(2);
    localStorage.setItem("quickformVisitorId", visitorId);
}

const hasVoted = review.helpfulBy.includes(visitorId);

helpfulButton.className = "helpful-btn";
helpfulButton.textContent = hasVoted
    ? `👍 Helpful (${review.helpful})`
    : `👍 Helpful (${review.helpful})`;

helpfulButton.disabled = hasVoted;


helpfulButton.addEventListener("click", async function() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/reviews/${review.id}/helpful`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    visitorId: visitorId
                })
            }
        );

        if (response.status === 409) {
            return;
        }

        if (!response.ok) {
            throw new Error("Helpful update failed");
        }

        await loadReviewsFromServer();

    } catch (error) {

        console.error("Helpful Error:", error);
        alert("Could not update Helpful vote. Please try again.");

    }

});


reviewCard.appendChild(helpfulButton);

            if (index > 0) {
                reviewCard.style.display = "none";
            }

            groupCards.appendChild(reviewCard);

        });

        ratingGroup.appendChild(groupHeading);
        ratingGroup.appendChild(groupCards);

        // Add See More Button
        if (groupReviews.length > 1) {

            const seeMoreButton = document.createElement("button");

            seeMoreButton.className = "see-more-btn";
            seeMoreButton.textContent = "See More ↓";
            seeMoreButton.dataset.expanded = "false";

            seeMoreButton.addEventListener("click", function() {

                const cards = groupCards.querySelectorAll(".review-card");

                const isExpanded =
                    seeMoreButton.dataset.expanded === "true";

                cards.forEach(function(card, index) {

                    card.style.display =
                        isExpanded && index > 0 ? "none" : "block";

                });

                seeMoreButton.dataset.expanded = String(!isExpanded);

                seeMoreButton.textContent = isExpanded
                    ? "See More ↓"
                    : "See Less ↑";

            });

            ratingGroup.appendChild(seeMoreButton);
        }

        reviewsContainer.appendChild(ratingGroup);

    }

}

// Submit Review
submitReview.addEventListener("click", async function() {

    const name = reviewName.value.trim();
    const feedback = reviewText.value.trim();

    if (name === "" || feedback === "") {
        alert("Please enter your name and review!");
        return;
    }

    if (selectedRating === 0) {
        alert("Please select a star rating!");
        return;
    }

    
    // Save New Review to Backend

    let visitorId = localStorage.getItem("quickformVisitorId");

    if (!visitorId) {
        visitorId = Date.now().toString() + Math.random().toString(36).slice(2);
        localStorage.setItem("quickformVisitorId", visitorId);
    }

    try {

        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                rating: selectedRating,
                comment: feedback,
                user_id: visitorId
            })
        });

        if (!response.ok) {
            throw new Error("Review submission failed");
        }

        await loadReviewsFromServer();

    } catch (error) {

        console.error("Review Submit Error:", error);
        alert("Review could not be submitted. Please try again.");
        return;

    }


    // Reset Form
    reviewName.value = "";
    reviewText.value = "";
    selectedRating = 0;

    ratingButtons.forEach(function(star) {
        star.classList.remove("active");
    });

});

// Load Reviews When Page Opens
loadReviewsFromServer();
// =====================================
// DARK MODE FUNCTIONALITY
// =====================================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Enable light mode");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Enable dark mode");
    }

});



// =====================================
// REVIEW EMOJI CURSOR
// =====================================

const reviewCursor = document.createElement("div");

reviewCursor.id = "reviewEmojiCursor";
reviewCursor.style.display = "none";

document.body.appendChild(reviewCursor);

document.addEventListener("mousemove", function(event) {

    const card = event.target.closest(".review-card");

    if (!card) {
        reviewCursor.style.display = "none";
        return;
    }

    const ratingElement = card.querySelector(".review-card-stars");

    const ratingValue = ratingElement.textContent
        .split("")
        .filter(star => star === "★").length;

    if (ratingValue >= 4) {
        reviewCursor.textContent = "😊";
    } else if (ratingValue <= 2) {
        reviewCursor.textContent = "😢";
    } else {
        reviewCursor.style.display = "none";
        return;
    }

    reviewCursor.style.display = "block";
    reviewCursor.style.left = (event.clientX + 15) + "px";
    reviewCursor.style.top = (event.clientY + 15) + "px";

});

