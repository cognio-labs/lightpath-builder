import { Plus_Jakarta_Sans } from "next/font/google";

// Body font of the Mahotsav page. (Its display font, Cormorant Garamond, is
// already loaded site-wide as --font-cormorant.)
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});
