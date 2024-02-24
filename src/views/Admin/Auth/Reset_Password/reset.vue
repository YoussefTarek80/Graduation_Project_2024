<template>
    <div>
        <form action="" @submit.prevent>
            <input type="text" placeholder="email" v-model="email" />
            <input type="text" placeholder="pass" v-model="pass" />
            <input type="text" placeholder="confirm pass" v-model="conf_pass" />
            <button @click="resetPassword">reset</button>
        </form>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            email: "",
            pass: "",
            conf_pass: "",
        };
    },
    methods: {
        async resetPassword() {
            try {
                await axios
                    .post("http://127.0.0.1:8000/api/reset-password", {
                        token: this.$route.params.token,
                        email: this.email,
                        password: this.pass,
                        password_confirmation: this.conf_pass,
                    })
                    .then(this.$router.push("/Login"));
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
