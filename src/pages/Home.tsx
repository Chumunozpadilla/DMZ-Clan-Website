import DiscordCTA from '../components/sections/DiscordCTA';
import FeatureGrid from '../components/sections/FeatureGrid';
import HeroSection from '../components/sections/HeroSection';
import MediaPreview from '../components/sections/MediaPreview';
import OperationsAnnouncement from '../components/sections/OperationsAnnouncement';
import OperationsPreview from '../components/sections/OperationsPreview';
import RulesPreview from '../components/sections/RulesPreview';
import TimeZoneClocks from '../components/sections/TimeZoneClocks';

export default function Home() {
  return (
    <>
      <TimeZoneClocks />
      <OperationsAnnouncement />
      <HeroSection />
      <FeatureGrid />
      <OperationsPreview />
      <RulesPreview />
      <MediaPreview />
      <DiscordCTA />
    </>
  );
}
