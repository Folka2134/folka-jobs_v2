// import Navbar from "@/components/shared/Navbar";

import JobNav from "@/components/shared/JobNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <JobNav />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
