const { response } = require("express");
const Event = require("../models/eventModel");

const createEvent = async (req, res = response) => {
  const { body } = req;
  const event = new Event(body);
  event.user = req.uid;

  try {
    const savedEvent = await event.save();

    res.status(200).send({
      ok: true,
      msg: "Event created successfully",
      savedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Event could not be created",
    });
  }
};

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user");

  try {
    res.status(200).send({
      ok: true,
      msg: "Events retrieved successfully, if you are not logged in, no events will be provided",
      events: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Events could not be retrieved",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { body } = req;
  const event = new Event(body);
  event.user = req.uid;
  event._id = eventId;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, event, {
      new: true,
    });
    if (!updatedEvent) {
      res.status(404).send({
        ok: false,
        msg: "Event not found",
      });
    }
    if (updatedEvent.user.toString() !== req.uid) {
      res.status(401).send({
        ok: false,
        msg: "You are not authorized to update this event",
      });
    }

    res.status(200).send({
      ok: true,
      msg: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Event could not be updated",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404).send({
      ok: false,
      msg: "Event not found",
    });
  }
  if (event.user.toString() !== req.uid) {
    res.status(401).send({
      ok: false,
      msg: "You are not authorized to delete this event",
    });
  }
  
  try {

    await Event.findByIdAndDelete(eventId);
    res.status(200).send({
      ok: true,
      msg: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      msg: "Event could not be deleted",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
