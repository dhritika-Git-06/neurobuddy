const Subject = require('../models/Subject');

const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({ fieldOfStudy: req.user.fieldOfStudy });
    res.json({ success: true, subjects });
  } catch (error) {
    next(error);
  }
};

const getSubjectById = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json({ success: true, subject });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSubjects, getSubjectById };
