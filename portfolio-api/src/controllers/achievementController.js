import Achievement from "../models/Achievement.js";

// CREATE
export const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAchievements = async (req, res) => {
  try {

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.type) {
      filter.type = req.query.type;
    }

    const achievements = await Achievement
      .find(filter)
      .sort({ issueDate: -1 });

    res.json(achievements);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteAchievement = async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: "Achievement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//GET BY ID
export const getAchievementsById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: "achievement not found" });
    }

    res.json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}