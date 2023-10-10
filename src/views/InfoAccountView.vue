<template>
  <AlertBanner title="Coming Soon" />
  <TitleDiv title="Alle Infos über dein Kundenkonto oder dein Unternehmen" />
  <InfoDiv
    info="Hier kannst du in Zukunft dein Konto verwalten. Du siehst dein aktuelles Guthaben, deine Bestellungen und kannst Abonnements abschließen. Falls du ein Unternehmen hast, kannst du hier dein Unternehmensprofil bearbeiten und Produkte und Preise einstellen."
  />
</template>

<script>
import AlertBanner from '../components/AlertBanner';
import TitleDiv from '../components/TitleDiv';
import InfoDiv from '../components/InfoDiv';

export default {
  name: 'InfoAccountView',
  components: {
    AlertBanner,
    TitleDiv,
    InfoDiv,
  },
};
</script>
