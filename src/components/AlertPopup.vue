<template>
  <div
    class="modal fade"
    id="alertModal"
    tabindex="-1"
    aria-labelledby="alertPopupLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="alertPopupLabel">{{ title }}</h1>
        </div>
        <div class="modal-body">
          <p>{{ info }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertPopup',
  data() {
    return {
      show: false,
    };
  },
  props: {
    title: String,
    info: String,
  },
};
</script>
