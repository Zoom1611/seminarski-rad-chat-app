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
      this.$emit("sendMessage", this.message);
      if (this.message === "") {
        return;
      }
      this.message = "";
    },
  },
};
</script>

<style>
.message-input {
  width: 100%;
  margin-top: 8px;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #75aafd;
  overflow-wrap: break-word;
  resize: none;
}
.message-input:focus {
  outline: none !important;
  border-color: #75aafd;
  box-shadow: 0 0 10px #75aafd;
}
.send-button {
  margin-top: 8px;
  padding: 6px 10px;
  font-size: 16px;
  background-color: #75aafd;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
}
.send-button:hover {
  background-color: #acccff;
}
</style>
