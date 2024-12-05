import Kash_Flying from "@/public/images/Kash_Flying.png";
import Kash_Pointing from "@/public/images/Kash_Pointing_Cropped.png";
import Kash_Walking from "@/public/images/Kash_Walking.png";

export const slides = [
  {
    id: "gradial-fly",
    header: "Trove On The Go",
    description:
      "With the Trove Mobile App, it's easy to request or send their sibling money or they can request a loan from you for something they can't currently afford.",
    buttonText: "Download the App!",
    image: Kash_Flying,
    imageAlt: "Kash Flying",
    textAlign: "text-center items-center md:text-right md:items-end",
    reverseLayout: true,
    phoneIcon: true,
  },
  {
    id: "gradial-point",
    header: "What Is Trove",
    description:
      "With Trove, your child can learn financial literacy and critical life skills like how to create a savings account, what it means to borrow money, and even what taxes are in a safe environment.",
    buttonText: "Get Started Today!",
    image: Kash_Pointing,
    imageAlt: "Kash Pointing",
    textAlign: "text-center items-center md:text-left md:items-start",
    reverseLayout: false,
  },
  {
    id: "gradial-walk",
    header: "Money Management",
    description:
      "Once you've created your Trove Account, keeping track of which child did what chore and how much allowance each one gets just got a whole lot easier.",
    buttonText: "Start Managing Money!",
    image: Kash_Walking,
    imageAlt: "Kash Walking",
    textAlign: "text-center items-center md:text-left md:items-start",
    reverseLayout: false,
    flipImage: true,
  },
];
