<template>
  <div>
    <details id="detail-id1" @click="click">
      <summary>Details</summary>
      Something small enough to escape casual notice.
    </details>
    <details id="detail-id2" @click="click">
      <summary>Details</summary>
      Something small enough to escape casual notice.
    </details>

    <div
      tabindex="0"
      id="box-id1"
      @click="boxClick"
      @keyup.enter="boxClick"
      @keyup.space.prevent="boxClick"
    >
      test1
    </div>
    <div
      tabindex="0"
      id="box-id2"
      @click="boxClick"
      @keyup.enter="boxClick"
      @keyup.space.prevent="boxClick"
    >
      test2
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    click(event) {
      const details = document.querySelectorAll('details')
      details.forEach(el => {
        if (el != event.target) {
          el.removeAttribute('open')
        }
      })
    },
    boxClick(event) {
      const details = document.querySelectorAll('details')
      const id = event.target.id
      const detailId = id.replace('box', 'detail')
      const detail = document.getElementById(detailId)
      if (detail.getAttribute('open') === '') {
        detail.removeAttribute('open', '')
      } else {
        detail.setAttribute('open', '')
      }
      details.forEach(el => {
        if (el != detail) {
          el.removeAttribute('open')
        }
      })
    }
  }
}
</script>
