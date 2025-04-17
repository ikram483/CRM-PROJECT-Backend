const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Lead = require('../models/lead.model');


const getDashboardStats = async (req, res) => {
    try {
        // Pour le moment, on renvoie des stats fictives
        const stats = {
          totalManagers: 5,
          totalClients: 42,
          recentActivity: [
            { type: 'clientAdded', name: 'Client A', date: '2025-04-16' },
            { type: 'managerHired', name: 'Manager B', date: '2025-04-15' },
          ],
        };
    
        res.status(200).json(stats);
      } catch (error) {
        console.error('Erreur dans dashboard-stats:', error);
        res.status(500).json({ message: 'Erreur serveur' });
      }};

const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find()
    res.json(managers);
  } catch (error) {
    console.error('Error fetching managers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const createManager = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Vérifie si le manager existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Manager already exists' });
      }
  
      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Création du manager
      const newManager = new User({
        name,
        email,
        password: hashedPassword,
        role: 'manager'
      });
  
      await newManager.save();
      res.status(201).json({ message: 'Manager created successfully', manager: newManager });
    } catch (error) {
      console.error('Error creating manager:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const deleteManager = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifie si le user est un manager
      const manager = await User.findById(id);
      if (!manager || manager.role !== 'manager') {
        return res.status(404).json({ message: 'Manager not found' });
      }
  
      // Supprime le manager
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      console.error('Error deleting manager:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateManager = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
  
      const manager = await User.findById(id);
      if (!manager || manager.role !== 'manager') {
        return res.status(404).json({ message: 'Manager not found' });
      }
  
      // Mise à jour
      if (name) manager.name = name;
      if (email) manager.email = email;
  
      await manager.save();
  
      res.status(200).json({ message: 'Manager updated successfully', manager });
    } catch (error) {
      console.error('Error updating manager:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  //Leads 
// Créer une nouvelle tâche (lead) pour un manager
const createLeadForManager = async (req, res) => {
  try {
    const { contactName, contactEmail, companyName, notes, managerId } = req.body;

    // Vérifier si le manager existe
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager') {
      return res.status(400).json({ message: 'Invalid manager ID' });
    }

    const newLead = new Lead({
      contactName,
      contactEmail,
      companyName,
      notes,
      managerId,
    });

    await newLead.save();
    res.status(201).json({ message: 'Lead assigned to manager', lead: newLead });
  } catch (error) {
    console.error('Error assigning lead:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// (Optionnel) Lister tous les leads créés par l’employer (tous les leads assignés)
const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate('managerId', 'email role');
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error getting leads:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  getDashboardStats,
  getAllManagers,
  createManager,
  deleteManager,
  updateManager,
  createLeadForManager,
  getAllLeads



};

