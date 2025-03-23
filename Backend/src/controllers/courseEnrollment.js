const db = require("../utils/config");
const courseEnroll = async (req, res, next) => {
  const data = req.body;
  console.log(data.courseId, data.userId);

  const courseId = parseInt(data.courseId);
  const userId = parseInt(data.userId);

  try {
    // Check for existing enrollment
    const existingEnrollment = await db.courseEnrollment.findFirst({
      where: {
        courseId,
        userId,
      },
    });if (existingEnrollment) {
      return res.status(307).json({ error: "User is already enrolled in this course" });
    }
    
    // Create new enrollment
   const courseEnrolled = await db.courseEnrollment.create({
      data: {
        courseId,
        userId,
      },
    });

    if (courseEnrolled) {
      res.status(201).json({
        message: "Successfully enrolled",
        courseEnrolled,
      });
    }
  } catch (error) {
    // Handle specific errors here (optional)
    if (error) {
      return res.status(400).json("Error: User already enrolled or invalid data");
    }
    next(error);  // Pass other errors to next middleware
  }
};

const getCourseEnrollbyid = async (req, res, next) => {
  const { id } = req.body;  // Extract the user ID from the request body

  try {
    // Fetch the enrollments based on the user ID
    const enrollments = await db.courseEnrollment.findMany({
      where: {
        userId: parseInt(id),  // Assuming userId is an integer
      },
    });
    const courses = await db.course.findMany();
    console.log(courses);

    if (!enrollments || enrollments.length === 0) {
      throw new Error("No enrollments found for the user");
    }
    console.log(enrollments);
    res.status(200).json({
      courses,
      enrollments,
    });

  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};

const getAllenroll = async (req, res, next) => {
  try {
    // Fetch all enrollments
    console.log("heii")
    const enrollments = await db.courseEnrollment.findMany();

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({
        message: "No enrollments found",
      });
    }

    res.status(200).json({
      message: "Enrollments fetched successfully",
      enrollments,
    });

  } catch (error) {
    next(error);  // Pass the error to the error handler middleware
  }
};

const courseDeroll = async (req, res, next) => {
  const { id } = req.body; // Assuming you pass the course enrollment ID in the request body

  try {
    const course = await db.courseEnrollment.delete({
      where: { id: parseInt(id) }, // Convert ID to integer before querying
    });

    if (!course) {
      throw new Error("Error derolling course");
    }

    res.status(200).json({
      message: "Course access removed for this user",
    });
  } catch (error) {
    next(error);  // Pass error to the next middleware
  }
};

module.exports = { courseEnroll, courseDeroll, getCourseEnrollbyid, getAllenroll };
