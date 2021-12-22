<template>
  <div class="message-padding" v-for="msg in messageList" :key="msg.id">
    <div class="user-info" :class="{ isHostClass: msg.isHost }">
      <div
        class="avatar col-lg-2"
        :style="`background-color: ${msg.color}`"
      ></div>
      <div
        class="col-lg-2 sender"
        :class="{
          'flex-end-class': msg.isHost,
          'flex-start-class': !msg.isHost,
        }"
      >
        {{ msg.sender }}
      </div>
    </div>

    <div :class="{ isHostClass: msg.isHost }">
      <div
        class="msg-box"
        :class="{
          'flex-end-class': msg.isHost,
          'flex-start-class': !msg.isHost,
        }"
      >
        <div
          :class="{
            'flex-end-class': msg.isHost,
            'flex-start-class': !msg.isHost,
          }"
        >
          <div
            class="message-text"
            :class="{
              'message-text-sender': msg.isHost,
              'message-text-reciever': !msg.isHost,
            }"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div
        :class="{
          'flex-end-class': msg.isHost,
          'flex-start-class': !msg.isHost,
        }"
      >
        {{ msg.time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["messageList"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.message-padding {
  padding-bottom: 15px;
}
.user-info {
  display: flex;
  align-items: center;
}
.sender {
  color: gray;
}
.msg-box {
  margin-bottom: 8px;
  margin-top: 8px;
}
.message-text {
  overflow-wrap: break-word;
  max-width: 300px;
  display: inline-block;
  border-radius: 12px;
  padding: 10px;
}
.flex-end-class {
  display: flex;
  justify-content: flex-end;
}
.flex-start-class {
  display: flex;
  justify-content: flex-start;
}
.isHostClass {
  flex-direction: row-reverse;
}
.message-text-sender {
  background-color: #75aafd;
  color: white;
}
.message-text-reciever {
  background-color: #e5e5e5;
  color: black;
}
</style>
