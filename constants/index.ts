export const NavLinks = [
  {
    label: "Home",
    route: "/"
  },
  {
    label: "Saved Jobs",
    route: "/saved-jobs/"
  },
]

export const jobDefaultValues = {
  imageUrl: '',
  companyName: "",
  title: '',
  description: '',
  featured: false,
  roles: [],
  roleType: "",
  location: '',
  datePosted: new Date(),
  dateUpdated: new Date(),
  appliedUsers: [],
}