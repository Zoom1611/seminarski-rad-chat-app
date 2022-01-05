<template>
  <div class="msgPadding" v-for="msg in messageList" :key="msg.id">
    <div class="userInfo" :class="{ isHostClass: msg.isHost }">
      <div
        class="avatar col-lg-2"
        :style="`background-color: ${msg.color}`"
      ></div>
      <div
        class="col-lg-2 sender"
        :class="{
          flexEndClass: msg.isHost,
          flexStartClass: !msg.isHost,
        }"
      >
        {{ msg.sender }}
      </div>
    </div>

    <div :class="{ isHostClass: msg.isHost }">
      <div
        class="msgBox"
        :class="{
          flexEndClass: msg.isHost,
          flexStartClass: !msg.isHost,
        }"
      >
        <div
          :class="{
            flexEndClass: msg.isHost,
            flexStartClass: !msg.isHost,
          }"
        >
          <div
            class="msgText"
            :class="{
              msgTextSender: msg.isHost,
              msgTextReciever: !msg.isHost,
            }"
          >
            {{ msg.text }}
          </div>
        </div>
      </div>
      <div
        class="msgTime"
        :class="{
          flexEndClass: msg.isHost,
          flexStartClass: !msg.isHost,
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
.msgPadding {
  padding-bottom: 15px;
}
.userInfo {
  display: flex;
  align-items: center;
}
.sender {
  color: gray;
}
.msgBox {
  margin-bottom: 8px;
  margin-top: 8px;
}
.msgText {
  overflow-wrap: break-word;
  max-width: 300px;
  display: inline-block;
  border-radius: 12px;
  padding: 10px;
}
.msgTime {
  color: gray;
}
.flexEndClass {
  display: flex;
  justify-content: flex-end;
}
.flexStartClass {
  display: flex;
  justify-content: flex-start;
}
.isHostClass {
  flex-direction: row-reverse;
}
.msgTextSender {
  background-color: #75aafd;
  color: white;
}
.msgTextReciever {
  background-color: #e5e5e5;
  color: black;
}
</style>
