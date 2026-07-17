import { Navbar } from './components/Navbar.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Skills } from './components/Skills.tsx'
import { Projects } from './components/Projects.tsx'
import { Certificates } from './components/Certificates.tsx'
import { Gallery } from './components/Gallery.tsx'
import { Contact } from './components/Contact.tsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Gallery />
        <Contact />
      </main>
    </>
  )
}

export default App
