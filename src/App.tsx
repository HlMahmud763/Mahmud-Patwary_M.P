import { useCallback, useState } from "react";
import About from "./components/About";
import Achievements from "./components/Achievements";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Graphics from "./components/Graphics";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";
import ScrollStory from "./components/ScrollStory";
import WebDesigns from "./components/WebDesigns";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <div className="relative bg-forest-950">
      <Preloader onDone={onDone} />
      <Cursor />
      <Navbar />
      <BackToTop />
      <main>
        <Hero ready={ready} />
        <ScrollStory />
        <Projects />
        <WebDesigns />
        <Graphics />
        <Achievements />
        <About />
        <Contact />
      </main>
    </div>
  );
}
