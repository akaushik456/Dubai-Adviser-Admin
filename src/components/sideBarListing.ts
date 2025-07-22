import { ListAlt, AddBox, Category, PlaylistAdd } from '@mui/icons-material';
interface SideBarListing {
  list: string;
  subcategory: {
    list: string;
    pathname: string;
    icon: React.ElementType;
  }[];
}

interface BottomListing {
  list: string;
  src: string;
  pathname: string;
}
[];


export const sidebarlisting: SideBarListing[] = [
  {
    list: "listing",
    subcategory: [
      {
        list: "all listing",
        pathname: "/home/alllisting",
        icon: ListAlt,
      },
      {
        list: "add new listing",
        pathname: "/home/newlisting",
        icon: AddBox,
      },
      {
        list: "all listing categories",
        pathname: "/home/alllistingcategories",
        icon: Category,
      },
      {
        list: "add listing categories",
        pathname: "/home/addlistingcategories",
        icon: PlaylistAdd,
      },
    ],
  },
];


export const bottomlisting: BottomListing[] = [
  {
    list: "Restaurants",
    src: "/restaurant.svg",
    pathname: "/home/Restaurants",
  },
  {
    list: "Top Activities",
    src: "/restaurant.svg",
    pathname: "/home/TopActivities",
  },
  {
    list: "Dubai Desert",
    src: "/restaurant.svg",
    pathname: "/home/DubaiDesert",
  },
  // {
  //   list: "Users",
  //   src: "/user.svg",
  //   pathname: "/home/Users",
  // },
  {
    list: "Blog & Articles",
    src: "/blog.svg",
    pathname: "/home/BlogArticles",
  },
  {
    list: "Import CSV File",
    src: "/blog.svg",
    pathname: "/home/ImportCsvFile",
  },
];
