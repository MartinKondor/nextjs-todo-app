import "./globals.css";
import "./bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SuperTokensProvider } from "./components/supertokensProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SuperTokens 💫",
    description: "SuperTokens demo app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <nav className="navbar navbar-expand-lg text-left">
                <div className="container-fluid">
                    <ul className="navbar-nav mb-auto text-center">
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                            Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link">
                            Login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/signup" className="nav-link">
                            Signup
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/todo-list/list" className="nav-link">
                            TODOs
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
                <SuperTokensProvider>{children}</SuperTokensProvider>
            </body>
        </html>
    );
}
