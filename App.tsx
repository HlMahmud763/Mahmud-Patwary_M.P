import { useCallback, useState } from "react";
import About from "./About";
import Achievements from "./Achievements";
import BackToTop from "./BackToTop";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Graphics from "./Graphics";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Preloader from "./Preloader";
import Projects from "./Projects";
import ScrollStory from "./ScrollStory";
import WebDesigns from "./WebDesigns";
import { useLenis } from "./useLenis";

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
