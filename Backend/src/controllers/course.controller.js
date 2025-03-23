const db = require("../utils/config");

const getCourses = async (req, res, next) => {
  try {
    const courses = await db.course.findMany();

    if (!courses) {
      throw new CustomError("Error getting courses", 500);
    }
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  const {courseName,fees,subject,videoUrl,courseDescription} = req.body;
  

  try {
    const newCourse = await db.course.create({
      data: {
        courseName,
        fees:parseInt(fees),
        subject,
        videoUrl,
       courseDescription,
      },
    });

    if (!newCourse) {
      throw new CustomError("Error creating course", 500);
    }

    res.status(200).json(newCourse);
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  const id = req.params.id;

  const deletedCourse = await db.course.delete({
    where: {
      id:parseInt(id),
    },
  });

  if (!deletedCourse) {
    throw new CustomError("Error deleting course", 500);
  }

  res.status(200).json(deletedCourse);
};

const updateCourse = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedCourse = await db.course.update({
      where: { id },
      data,
    });

    if (!updatedCourse) {
      throw new CustomError("Error updating course", 500);
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

module.exports = { addCourse, deleteCourse, getCourses, updateCourse };
