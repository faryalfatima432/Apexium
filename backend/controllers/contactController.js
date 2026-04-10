import Contact from "../models/Contact.js";


// CREATE MESSAGE
export const createContact = async (req, res) => {

  try {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL MESSAGES (ADMIN)
export const getContacts = async (req, res) => {

  try {

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json(contacts);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};


// DELETE MESSAGE
export const deleteContact = async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({ message: "Message deleted" });

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }

};