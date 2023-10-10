<template>
  <AlertBanner title="Coming Soon" />
  <TitleDiv title="Alle Unternehmen im Staat auf einen Blick" />
  <InfoDiv
    info="Hier hast du in Zukunft einen Überblick über alle Unternehmen und Angebote im Staat. Du kannst sehen wo sich die Unternehmen befinden und welche Produkte sie anbieten. Außerdem kannst du Unternehmen bewerten und die Bewertungen von anderen lesen."
  />
</template>

<script>
import AlertBanner from '@/shared/components/AlertBanner';
import TitleDiv from '@/shared/components/TitleDiv';
import InfoDiv from '../components/InfoDiv';

export default {
  name: 'InfoCompanyView',
  components: {
    AlertBanner,
    TitleDiv,
    InfoDiv,
  },
};
</script>
