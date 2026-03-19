import Project from "../models/Project.js";
import fs from "fs"
import path from "path"
// GET ALL PROJECTS
export const getProjects = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 6

        const skip = (page - 1) * limit

        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        const total = await Project.countDocuments()

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            projects
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE
export const createProject = async (req, res) => {
    try {

        console.log("BODY:", req.body)
        console.log("FILE:", req.file)

        const { title, description, tech, github, demo } = req.body

        const newProject = new Project({
            title,
            description,
            tech: tech
                ? tech.split(",").map(t => t.trim())
                : [],
            github,
            demo,
            image: req.file ? `/uploads/${req.file.filename}` : null
        })

        const savedProject = await newProject.save()

        res.status(201).json(savedProject)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// UPDATE
export const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//delete project

export const deleteProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        // delete image
        if (project.image) {

            const imagePath = path.join(process.cwd(), project.image)

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Error deleting image:", err)
                }
            })

        }

        await Project.findByIdAndDelete(req.params.id)

        res.json({ message: "Project deleted" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};