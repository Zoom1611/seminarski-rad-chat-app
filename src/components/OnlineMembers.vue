<template>
  <div class="memberCountAlign">
    <span><i class="mdi mdi-account"></i></span>
    <span>{{ members.length }}</span>
    <button class="showUsersBtn" @click="handleShowUsers">
      {{ buttonText }}
    </button>
  </div>
  <div
    class="membersListBox usersBox"
    :class="{ showUsers: showUsers, hideUsers: !showUsers }"
  >
    <div class="membersList" v-for="(sender, index) in members" :key="index">
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
  data() {
    return {
      showUsers: false,
      buttonText: "Show users",
    };
  },
  methods: {
    handleShowUsers() {
      this.showUsers = !this.showUsers;
      if (this.showUsers) {
        this.buttonText = "Hide users";
      } else {
        this.buttonText = "Show users";
      }
    },
  },
};
</script>

<style>
.memberCountAlign {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
}
i {
  font-size: 24px;
  margin-right: 3px;
}
.membersList {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
}
.username {
  margin-left: 5px;
  color: gray;
}
.showUsers {
  display: block;
}
.hideUsers {
  display: none;
}
.showUsersBtn {
  padding: 4px 5px;
  font-size: 12px;
  background-color: #75aafd;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: auto;
}
.usersBox {
  background: #f6f6f6;
  padding: 1px;
  padding-left: 5px;
  border-radius: 8px;
  margin-bottom: 5px;
}
@media screen and (min-width: 993px) {
  .showUsersBtn {
    display: none;
  }
}
@media screen and (min-width: 993px) {
  .membersListBox {
    display: block;
  }
}
</style>
