<template>
  <AlertBanner title="Coming Soon" />
  <TitleDiv title="Der Lieferservice für Schule Als Staat" />
  <InfoCards />
  <QuestionsCarousel />
</template>

<script>
import AlertBanner from '@/shared/components/AlertBanner';
import TitleDiv from '@/shared/components/TitleDiv';
import InfoCards from '../components/InfoCards';
import QuestionsCarousel from '../components/QuestionsCarousel';

export default {
  name: 'InfoHomeView',
  components: {
    AlertBanner,
    TitleDiv,
    InfoCards,
    QuestionsCarousel,
  },
  data() {
    return {};
  },
};
</script>
