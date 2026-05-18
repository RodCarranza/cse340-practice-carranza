import {
  getFacultyById,
  getSortedFaculty,
} from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
  // Handle sorting if requested
  const sortBy = req.query.sort || "name";
  const faculty = getSortedFaculty(sortBy);

  res.render("faculty/list", {
    title: "Faculty",
    faculty: faculty,
    currentSort: sortBy,
  });
};

// Route handler for individual faculty detail pages
const facultyDetailPage = (req, res, next) => {
  const facultyId = req.params.facultyId;
  const facultyMember = getFacultyById(facultyId);

  // If faculty member doesn't exist, create 404 error
  if (!facultyMember) {
    const err = new Error(`Faculty member ${facultyId} not found`);
    err.status = 404;
    return next(err);
  }

  res.render("faculty/detail", {
    title: facultyMember.name,
    facultyMember: facultyMember,
  });
};

export { facultyListPage, facultyDetailPage };
