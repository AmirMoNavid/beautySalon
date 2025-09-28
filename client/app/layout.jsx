import "./globals.css";
import { AuthContextProvider } from "./config/contexts/authContext";
import Header from "./components/header";
import Footer from "./components/footer/Footer";

export const metadata = {
  title: "سالن زیبایی آرمیس",
  description:
    "سالن زیبایی و آموزشگاه آرمیس با 20 سال سابقه فعالیت در زمینه خدمات و آموزش رشته های مختلف آرایش و ﭘیرایش در خدمت شما عزیزان میباشد",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <AuthContextProvider>
        <body className={`antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </AuthContextProvider>
    </html>
  );
}
