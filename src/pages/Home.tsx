import DiscordCTA from '../components/sections/DiscordCTA';
import FeatureGrid from '../components/sections/FeatureGrid';
import HeroSection from '../components/sections/HeroSection';
import MediaPreview from '../components/sections/MediaPreview';
import OperationsPreview from '../components/sections/OperationsPreview';
import RulesPreview from '../components/sections/RulesPreview';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <OperationsPreview />
      <RulesPreview />
      <MediaPreview />
      <DiscordCTA />
    </>
  );
}
