<template>
  <div class="col-md-3 col-sm-3"></div>
  <div class="col-md-8 col-sm-8">
    <textarea
      autofocus
      type="text"
      name="message"
      id="message"
      class="message-input"
      placeholder="Type a message..."
      v-model="message"
      @keydown.enter.prevent="sendMessage"
      autocomplete="off"
      rows="1"
    />
  </div>
  <div class="col-md-1 col-sm-1">
    <button class="send-button" @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  props: [],
  methods: {
    sendMessage() {
      debugger;
      this.$emit("sendMessage", this.message);
      if (this.message === "") {
        return;
      }
      this.message = "";
    },
  },
};
</script>

<style></style>
