const Lead = require('../models/lead.model');

const getManagerLeads = async (req, res) => {
  try {
    const managerId = req.user._id;
    const leads = await Lead.find({ managerId });
    res.status(200).json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const createLead = async (req, res) => {
    try {
      const { contactName, contactEmail, companyName, status, notes } = req.body;
  
      const newLead = new Lead({
        contactName,
        contactEmail,
        companyName,
        status,
        notes,
        managerId: req.user._id
      });
  
      await newLead.save();
  
      res.status(201).json({ message: 'Lead created successfully', lead: newLead });
    } catch (error) {
      console.error('Error creating lead:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { 
    
    getManagerLeads ,
    createLead

};
