<template>
	{{ realTimeUsers }}
</template>

<script setup lang="ts">
import axios from "axios";
// @ts-ignore
import { io } from "socket.io-client";

const realTimeUsers = useState("realTimeUsers", () => 0);
const socket = io();

socket.on("error", (e: any) => {
	console.log(e, "error");
});

socket.on("onlineUsersCount", (a: any) => {
	realTimeUsers.value = a?.count;
});

const getRealTimeUsers = async () => {
	try {
		const { data } = await axios.get("/api/onlineUsers");

		realTimeUsers.value = data.count;
	} catch (error) {
		console.error("Error fetching real-time online users:", error);
		throw error;
	}
};

getRealTimeUsers();
</script>
