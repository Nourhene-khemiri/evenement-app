const eventService = require("../services/eventService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await eventService.deleteEvent(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await eventService.getEventRegistrations(
      req.params.id,
    );
    res.json(registrations);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

const registerToEvent = async (req, res) => {
  try {
    // req.user.id vient du middleware protect (JWT)
    const registration = await eventService.registerToEvent(
      req.params.id,
      req.user.id,
    );
    res.status(201).json(registration);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
  getEventRegistrations,
  registerToEvent,
};
