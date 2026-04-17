-- Create trainings table
CREATE TABLE public.trainings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titel TEXT NOT NULL,
  datum DATE NOT NULL,
  tijd TEXT NOT NULL,
  locatie TEXT,
  max_deelnemers INTEGER NOT NULL DEFAULT 50,
  beschrijving TEXT NOT NULL,
  lesgever TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('webinar', 'fysiek')),
  opname_beschikbaar BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;

-- Public can view active trainings only
CREATE POLICY "Active trainings are viewable by everyone"
ON public.trainings
FOR SELECT
USING (is_active = true);

-- Reuse existing timestamp trigger function
CREATE TRIGGER update_trainings_updated_at
BEFORE UPDATE ON public.trainings
FOR EACH ROW
EXECUTE FUNCTION public.update_webinar_updated_at();

-- Seed existing trainings
INSERT INTO public.trainings (titel, datum, tijd, locatie, max_deelnemers, beschrijving, lesgever, type, opname_beschikbaar) VALUES
('Medische akkoorden: Wat doet het ziekenfonds?', '2026-05-28', '13:30 – 15:30 (2u00)', NULL, 50, 'Iris, het aanspreekpunt voor verpleegkundige zorgen bij Helan Ziekenfonds neemt je mee achter de schermen van MyCareNet. Een toelichting over het proces na indienen van je prestaties, toelichting van medische akkoorden en verschillende aandachtspunten komen aan bod.', 'Helan Ziekenfonds', 'webinar', false),
('BLS/AED – officieel certificaat', '2026-05-11', '13:30 – 17:30 (4u00)', 'Helan Hoofdkantoor – zaal Magnolia', 12, 'Wist je dat je elke 2 jaar een gecertificeerde opleiding BLS/AED moet volgen? Deze opleiding, onder begeleiding van Hogent, neemt je mee in alle principes van BLS en het gebruik van een AED.', 'Hogent', 'fysiek', false),
('Palliatieve Zorg: vroegtijdige zorgplanning en sociale voorzieningen', '2026-04-21', '13:00 – 16:00 (3u00)', NULL, 50, 'In deze opleiding leer je alles over vroegtijdige zorgplanning, communicatie en beschikbare voorziening voor de patiënt.', 'Palliatief netwerk Gent-Eeklo', 'webinar', true),
('Katz schaal in de thuisverpleging', '2026-04-27', '13:30 – 15:30 (2u00)', NULL, 50, 'De Katz schaal is een essentieel instrument in de thuisverpleging. In deze opleiding komen de richtlijnen uitgebreid aan bod en oefenen we de toepassing en gebruik ervan met casussen uit de praktijk.', 'Onafhankelijk Ziekenfonds: Els Desmet en Debbie Goossens', 'webinar', true),
('Palliatieve Zorg: Pijn- en symptoomcontrole', '2026-05-20', '13:00 – 16:00 (2u00)', NULL, 50, 'Comfortzorg in de thuisomgeving omvat onder meer gerichte pijn- en symptoomcontrole. In deze opleiding krijg je tips om pijn te herkennen en onder controle te houden.', 'Palliatief netwerk Gent-Eeklo', 'webinar', true),
('Toelichting: controle van de verzekeringsinstellingen', '2026-05-21', '13:30 – 15:30 (2u00)', NULL, 50, 'In deze opleiding krijg je informatie over de controles die gebeuren door de verzekeringsinstellingen (mutualiteiten). Hoe verloopt een controle en waar wordt op gelet? Wat als een controle niet kan doorgaan? Wat als je een afscoring hebt? Wat kan je zelf doen?', 'Onafhankelijk Ziekenfonds: Els Desmet en Debbie Goossens', 'webinar', true);