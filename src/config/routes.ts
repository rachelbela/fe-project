export const routesTable = [
  {
    name: "home",
    pathname: "/",
    path: [{ name: "home", link: "/" }],
  },
  {
    name: "talk-library",
    pathname: "/talkLibrary",
    path: [
      { name: "home", link: "/" },
      { name: "management", link: "/" },
      { name: "talk-library", link: "/talkLibrary" },
    ],
  },
  {
    name: "people-management",
    pathname: "/peopleManagement",
    path: [
      { name: "home", link: "/" },
      { name: "management", link: "/" },
      { name: "people-management", link: "/peopleManagement" },
    ],
  },
  {
    name: "customer-chat",
    pathname: "/customerChat",
    path: [
      { name: "home", link: "/" },
      { name: "management", link: "/" },
      { name: "customer-chat", link: "/customerChat" },
    ],
  },
  {
    name: "workbench",
    pathname: "/workbench",
    path: [
      { name: "home", link: "/" },
      { name: "management", link: "/" },
      { name: "workbench", link: "/workbench" },
    ],
  },
  {
    name: "chat-history",
    pathname: "/list",
    path: [
      { name: "home", link: "/" },
      { name: "management", link: "/" },
      { name: "chat-history", link: "/list" },
    ],
  },
];
