export const NavLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Profile",
    route: "/profile/saved-jobs"
  },
]

export const JobNavLinks = [
  {
    label: "Saved Jobs",
    route: "/profile/saved-jobs"
  },
  {
    label: "Applied Jobs",
    route: "/profile/applied-jobs"
  },
  {
    label: "Posted Jobs",
    route: "/profile/posted-jobs"
  },
]
export const jobDefaultValues = {
  imageUrl: '',
  companyName: "",
  title: '',
  location: '',
  description: '',
  roles: [],
  roleType: "",
  datePosted: new Date(),
  dateUpdated: new Date(),
  featured: false,
}

export const jobRoles = [
  {
    id: "Frontend",
    label: "Front-End",
  },
  {
    id: "Backend",
    label: "Back-end",
  },
  {
    id: "Fullstack",
    label: "Fullstack",
  },
  {
    id: "Devops",
    label: "Devops",
  },
  {
    id: "Senior",
    label: "Senior",
  },
  {
    id: "Junior",
    label: "Junior",
  },
] as const;