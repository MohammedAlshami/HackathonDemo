import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import { notFound } from "next/navigation";
// import { routing } from "@/i18n/routing";
import "./globals.css";
import PrelineScript from "@/app/components/PrelineScript";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  // if (!routing.locales.includes(locale as any)) {
  //   notFound();
  // }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning={true}
      className="bg-white light"
    >
      <body className={` antialiased bg-white light`}>
        <NextIntlClientProvider messages={messages}>
          <div className="relative h-svh	">
            {/* Content */}
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
