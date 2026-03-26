const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

// Routes publiques
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);

// Routes protégées (admin / web)
router.post("/", eventController.createEvent);
router.delete("/:id", eventController.deleteEvent);

// Voir les inscrits d'un événement
router.get("/:id/registrations", eventController.getEventRegistrations);

// S'inscrire à un événement — client authentifié (mobile)
router.post("/:id/register", protect, eventController.registerToEvent);

module.exports = router;
