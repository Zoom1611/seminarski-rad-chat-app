<template>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
  <div class="my-container">
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3 line" v-if="members.length !== 0">
        <OnlineMembers :members="members" />
      </div>
      <div class="col-lg-8 col-md-8 col-sm-8 scrollbar" id="scrollContent">
        <Messages :messageList="messageList" />
      </div>
    </div>
    <div class="row">
      <InputForm @sendMessage="messagePublish($event)" />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { drone } from "./components/conneciton.js";
import OnlineMembers from "./components/OnlineMembers.vue";
import InputForm from "./components/InputForm.vue";
import Messages from "./components/Messages.vue";

export default {
  name: "App",
  components: { OnlineMembers, InputForm, Messages },
  data() {
    return {
      title: "Chat App",
      members: [],
      hostMember: {},
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
    };
  },
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
      });

      room.on("data", (text, member) => {
        this.newMsg(text, member);
      });
    });
  },
  methods: {
    messagePublish(message) {
      drone.publish({
        room: "observable-room",
        message,
      });
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
  },
};
</script>

<style>
.title {
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
  padding: 8px 10px;
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

/* MESSAGE BOX CSS*/

.avatar {
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.scrollbar {
  height: 500px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--lightestgrey);
}

::-webkit-scrollbar-thumb {
  background: #b4d0fd;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9aabb7;
}
</style>
