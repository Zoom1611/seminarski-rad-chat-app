<template>
  <div class="member-count-align">
    <span><i class="mdi mdi-account"></i></span>
    <span>{{ members.length }}</span>
  </div>
  <div class="scrollbar members-list-box">
    <div class="members-list" v-for="(sender, index) in members" :key="index">
      <div
        class="avatar"
        :style="`background-color: ${sender.clientData.color}`"
      ></div>
      <div class="username">
        {{ sender.clientData.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["members"],
};
</script>

<style>
.line:after {
  content: "";
  background-color: #adccff;
  position: absolute;
  width: 1px;
  height: 562px;
  top: 10px;
  left: 90%;
  display: block;
  border-radius: 8px;
  margin-top: -8px;
}
.member-count-align {
  display: flex;
  flex-direction: row;
  align-items: center;
}
i {
  font-size: 24px;
  margin-right: 3px;
}
.members-list-box {
  max-width: 280px;
}
.members-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
  width: 80%;
}
.username {
  margin-left: 5px;
  color: gray;
}
</style>
