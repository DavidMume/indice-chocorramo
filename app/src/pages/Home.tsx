import HeroSection from '../components/HeroSection'
import ConceptExplainer from '../components/ConceptExplainer'
import CountrySection from '../components/CountrySection'
import MethodologySection from '../components/MethodologySection'
import SourcesSection from '../components/SourcesSection'
import Footer from '../components/Footer'
import { indexData } from '../data'
import ChocorramoStory from '../components/ChocorramoStory'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <ChocorramoStory />
        <ConceptExplainer />
        <CountrySection countryData={indexData.countries.colombia} />
        <CountrySection countryData={indexData.countries.australia} />
        <MethodologySection />
        <SourcesSection />
      </main>
      <Footer />
    </div>
  )
}
