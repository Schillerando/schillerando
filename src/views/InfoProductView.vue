<template>
  <AlertBanner title="Coming Soon" />
  <TitleDiv title="Vergleiche Preise und bestelle Produkte" />
  <InfoDiv
    info="Hier wirst du in Zukunft die Produkte aller Unternehmen im Staat sehen. Du kannst nach bestimmten Kategorien oder Produkten suchen und Preise vergleichen. Außerdem kannst du dir Produkte bestellen und direkt zu dir liefern lassen."
  />
</template>

<script>
import AlertBanner from '../components/AlertBanner';
import TitleDiv from '../components/TitleDiv';
import InfoDiv from '../components/InfoDiv';

export default {
  name: 'InfoProductView',
  components: {
    AlertBanner,
    TitleDiv,
    InfoDiv,
  },
  data() {
    return {};
  },
};
</script>
