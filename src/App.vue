<template>
  <div class="heading">
    <h1>{{ heading }}</h1>
  </div>
  <div class="my-container">
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 line" v-if="members.length !== 0">
        <div class="member-count-align">
          <span><i class="mdi mdi-account"></i></span>
          <span>{{ members.length }}</span>
        </div>
        <div
          class="members-list"
          v-for="(sender, index) in members"
          :key="index"
        >
          <div
            class="avatar"
            :style="`background-color: ${sender.clientData.color}`"
          ></div>
          <div class="username">
            {{ sender.clientData.name }}
          </div>
        </div>
      </div>
      <div
        class="col-lg-8 col-md-8 col-sm-8 scrollbar wallpaper"
        id="scrollContent"
      >
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
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3"></div>
      <div class="col-md-8 col-sm-8">
        <input
          type="text"
          name="message"
          id="message"
          class="message-input"
          placeholder="Type a message..."
          v-model="message"
          @keyup.enter="sendMessage"
          autocomplete="off"
        />
      </div>
      <div class="col-md-1 col-sm-1">
        <button class="send-button" @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  drone,
  getRandomName,
  getRandomColor,
} from "./components/conneciton.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      heading: "Chat App",
      members: [],
      message: "",
      membersCount: "",
      membersList: "",
      name: getRandomName(),
      color: getRandomColor(),
      messageInfo: {
        color: null,
        sender: null,
        text: null,
        id: null,
        time: null,
        isHost: false,
      },
      messageList: [],
      isHost: false,
      hostMember: {},
      typing: false,
    };
  },
  created() {},
  mounted() {
    drone.on("open", (error) => {
      // otvaranje veze sa scaledroneom
      if (error) {
        console.log(error);
      }

      const room = drone.subscribe("observable-room");
      room.on("open", (error) => {
        if (error) {
          console.log(error);
        }
      });

      room.on("members", (m) => {
        this.members = m;
        this.membersCount = this.members.length;
        const me = this.members.find((member) => {
          return member.id === drone.clientId;
        });
        this.setHostMember(me);
      });

      room.on("member_join", (member) => {
        this.members.push(member);
      });

      room.on("member_leave", ({ id }) => {
        const index = this.members.findIndex((member) => member.id === id);
        this.members.splice(index, 1);
        // updateMembersDOM(); uncomment later
      });
      room.on("data", (text, member) => {
        this.newMsg(text, member);
      });
      /* room.on("message", (message) => {
        const { data, id, timestamp, clientId, member } = message;
        this.setHostMember(member);
      }); */
    });
  },
  methods: {
    sendMessage() {
      drone.publish({
        room: "observable-room",
        message: this.message,
      });
      if (this.message === "") {
        return;
      }
      this.message = "";
    },

    newMsg(text, member) {
      this.messageInfo = {
        color: null,
        sender: null,
        text: null,
        id: null,
        time: null,
        isHost: false,
      };
      console.log(member);
      this.messageInfo.color = member.clientData.color;
      this.messageInfo.sender = member.clientData.name;
      this.messageInfo.id = member.id;
      this.messageInfo.text = text;
      if (this.hostMember.clientData.name === this.messageInfo.sender) {
        this.messageInfo.isHost = true;
      } else {
        this.messageInfo.isHost = false;
      }
      this.messageList.push(this.messageInfo);
      const date = new Date();
      const time = date.toLocaleTimeString();
      this.messageInfo.time = time;
    },
    setHostMember(me) {
      this.hostMember = me;
    },
  },
  watch: {
    messageList: {
      handler(val, oldVal) {
        setTimeout(function () {
          const element = document.getElementById("scrollContent");
          element.scrollTop = element.scrollHeight - element.clientHeight;
        }, 0);
      },
      deep: true,
    },
    message: {
      handler(val, oldVal) {
        if (this.hostMember) {

        }
      },
    },
  },
};
</script>

<style>
.heading {
  text-align: center;
  background: #262626;
  color: #fefefe;
  padding: 2px;
  font-size: 18px;
  margin-top: -8px;
  margin-left: -8px;
  margin-bottom: 24px;
}
.my-container {
  margin: 0 100px;
}
.message-input {
  width: 100%;
  margin-top: 8px;
  padding: 5px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #75aafd;
}
.message-input:focus {
  outline: none !important;
  border-color: #75aafd;
  box-shadow: 0 0 10px #75aafd;
}
.send-button {
  margin-top: 8px;
  padding: 5px 10px;
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
.user-icon {
  width: 40px;
}
i {
  font-size: 24px;
  margin-right: 3px;
}
.member-count-align {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.username {
  margin-left: 5px;
  color: gray;
}

/* MESSAGE BOX CSS*/

.avatar {
  height: 35px;
  width: 35px;
  border-radius: 50%;
}
.message-text {
  overflow-wrap: break-word;
  max-width: 300px;
  display: inline-block;
  border-radius: 12px;
  padding: 10px;
}
.message-text-sender {
  background-color: #75aafd;
  color: white;
}
.message-text-reciever {
  background-color: #e5e5e5;
  color: black;
}
.user-info {
  display: flex;
  align-items: center;
}

.isHostClass {
  flex-direction: row-reverse;
}

.flex-end-class {
  display: flex;
  justify-content: flex-end;
}

.flex-start-class {
  display: flex;
  justify-content: flex-start;
}

.message-padding {
  padding-bottom: 15px;
}
.msg-box {
  margin-bottom: 8px;
  margin-top: 8px;
}
.line:after {
  content: "";
  background-color: #75aafd;
  position: absolute;
  width: 1px;
  height: 543px;
  top: 10px;
  left: 80%;
  display: block;
  border-radius: 8px;
  margin-top: -8px;
}
.sender {
  color: gray;
}
.members-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
}
.scrollbar {
  height: 500px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--lightestgrey);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #b4d0fd;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9aabb7;
}
</style>
