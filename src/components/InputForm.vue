<template>
  <form>
    <div
      class="col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 col-md-offset-3 col-lg-offset-3 col-xl-offset-3"
    >
      <textarea
        autofocus
        type="text"
        name="message"
        id="message"
        class="msgInput"
        placeholder="Type a message..."
        v-model="message"
        @keydown.enter.prevent="sendMessage"
        autocomplete="off"
        rows="1"
      />
    </div>
    <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
      <button class="sendBtn" @click="sendMessage">Send</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  props: [],
  emits: ["sendMessage"],
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
.msgInput {
  width: 100%;
  margin-top: 8px;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #75aafd;
  overflow-wrap: break-word;
  resize: none;
}
.msgInput:focus {
  outline: none !important;
  border-color: #75aafd;
  box-shadow: 0 0 10px #75aafd;
}
.sendBtn {
  margin-top: 8px;
  padding: 6px 10px;
  font-size: 16px;
  background-color: #75aafd;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
}
.sendBtn:hover {
  background-color: #acccff;
}
</style>
