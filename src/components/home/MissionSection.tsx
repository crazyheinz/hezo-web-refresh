const MissionSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
          Voor wie is Hezo?
        </h2>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>
            Hezo is er voor iedere zelfstandige verpleegkundige die zich elke dag met hart en ziel inzet voor patiënten. Maar administratie, facturatie en planning nemen steeds meer tijd in beslag. Terwijl de zorgvraag groeit, loopt de werkdruk op.
          </p>
          <p>
            Hezo helpt je die druk te verminderen. Zo hou je meer tijd over voor wat er echt toe doet: zorgen voor patiënten.
          </p>
          <p className="text-base text-foreground/80 italic">
            Je blijft volledig zelfstandig werken: je organiseert je eigen praktijk, behoudt je patiëntenbestand en kiest zelf met wie je samenwerkt.
          </p>

          <div className="grid md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <h3 className="text-foreground font-semibold text-lg">
                Start je net als zelfstandige thuisverpleegkundige?
              </h3>
              <p className="text-base">
                Dan komt er veel op je af: Hezo helpt je je administratie op orde te krijgen en je goed op te starten.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-foreground font-semibold text-lg">
                Werk je al langer in de thuisverpleging?
              </h3>
              <p className="text-base">
                Hezo zorgt voor meer overzicht in je administratie en facturatie, zodat je werkdag rustiger verloopt.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-foreground font-semibold text-lg">
                Heb je een eigen praktijk of werk je in een praktijk?
              </h3>
              <p className="text-base">
                Ook praktijken krijgen dezelfde ondersteuning bij administratie, patiënteninstroom en groei.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
