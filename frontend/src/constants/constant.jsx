import { School } from "lucide-react";
import { User } from "lucide-react";
import { BookmarkCheck } from "lucide-react";


import img1 from "../assets/images/codeforces.webp";
import img2 from "../assets/images/leetcode.svg";
import img3 from "../assets/images/gfg.png";
import img4 from "../assets/images/atcoder.png";
import img5 from "../assets/images/codechef.jpg";

export const navItems = [
  { label: "Bookmarks ", href: "/bookmark" },
  { label: "Rooms", href: "/Rooms" },
  {label : "Compiler" , href: "/compiler"},
  { label: "Profile", href: "/profile" }, 
];

export const features = [
  {
    icon:<User color="orange"/>,
    text: "Customised User Profiles",
    description:
      "Users can create and customize their unique coding identity.",
  },
  {
    icon: <School color="orange"/>,
    text: "Collaborative Learning",
    description:
      " Users can make rooms and discuss together.",
  },
  {
    icon: <BookmarkCheck color="orange"/>,
    text: "Bookmark Coding Problems",
    description:
      "Users can upload their coding problems from various platforms and can bookmark them.",
  },
  
];

export const resourcesLinks = [
   { text: "CSES", href: "https://cses.fi/problemset/" },
  { text: "CP Handbook", href: "https://cses.fi/book/book.pdf" },
  { text: "Algorithms", href: "https://cp-algorithms.com/index.html" },
  { text: "Tutorials", href: "https://www.w3schools.com/" },
];

export const compilerLinks = [
  { text: "C++ Compiler", href: "https://z-coder-one.vercel.app/home/compiler" },
  { text: "Python Compiler", href: "https://z-coder-one.vercel.app/home/compiler" },
  { text: "Java Compiler", href: "https://z-coder-one.vercel.app/home/compiler" },
  { text: "JavaScript Compiler", href: "https://z-coder-one.vercel.app/home/compiler" },
  { text: "C Compiler", href: "https://z-coder-one.vercel.app/home/compiler" },
];
export const platformLinks = [
  { href: "https://codeforces.com/", text: "Codeforces" ,image:img1},
  { href: "https://leetcode.com/problemset/", text: "Leetcode", image:img2},
  { href: "https://www.geeksforgeeks.org/", text: "Geeks for Geeks" ,image:img3},
  { href: "https://atcoder.jp/", text: "Atcoder" ,image:img4},
  { href: "https://www.codechef.com/dashboard", text: "Codechef",image:img5 },
];

