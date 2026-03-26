const Event = require("../models/eventModel");
const Registration = require("../models/registrationModel");
const User = require("../models/userModel");

// Récupérer tous les événements
const getAllEvents = async () => {
  return await Event.findAll({ order: [["date", "ASC"]] });
};

// Récupérer un événement par ID
const getEventById = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) {
    throw { status: 404, message: "Événement introuvable" };
  }
  return event;
};

// Créer un événement
const createEvent = async ({
  title,
  description,
  date,
  location,
  capacity,
}) => {
  if (!title || !date) {
    throw { status: 400, message: "Le titre et la date sont requis" };
  }

  const event = await Event.create({
    title,
    description,
    date,
    location,
    capacity,
  });
  return event;
};

// Supprimer un événement
const deleteEvent = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) {
    throw { status: 404, message: "Événement introuvable" };
  }

  await event.destroy();
  return { message: "Événement supprimé avec succès" };
};

// Voir les clients inscrits à un événement
const getEventRegistrations = async (eventId) => {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw { status: 404, message: "Événement introuvable" };
  }

  const registrations = await Registration.findAll({
    where: { event_id: eventId },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"], // on n'expose jamais le mot de passe
      },
    ],
  });

  return registrations;
};

// S'inscrire à un événement (client authentifié)
const registerToEvent = async (eventId, userId) => {
  const event = await Event.findByPk(eventId);
  if (!event) {
    throw { status: 404, message: "Événement introuvable" };
  }

  // Vérifier si déjà inscrit
  const alreadyRegistered = await Registration.findOne({
    where: { user_id: userId, event_id: eventId },
  });

  if (alreadyRegistered) {
    throw { status: 409, message: "Vous êtes déjà inscrit à cet événement" };
  }

  // Vérifier la capacité
  if (event.capacity) {
    const count = await Registration.count({ where: { event_id: eventId } });
    if (count >= event.capacity) {
      throw { status: 400, message: "L'événement est complet" };
    }
  }

  const registration = await Registration.create({
    user_id: userId,
    event_id: eventId,
  });

  return registration;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
  getEventRegistrations,
  registerToEvent,
};
