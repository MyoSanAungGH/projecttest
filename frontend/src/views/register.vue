<template>
  <div>
    <v-container>
      
      <v-form ref="registerForm" v-model="registerForm">
        
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="[
            (v) => !!v || 'Required',
            (v) =>
              (v && v.length <= 10) || 'Name must be less than 10 characters',
          ]"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="age"
          label="Age"
          placeholder="Enter your age"
          type="number"
          :rules="[v => !!v || 'Required', 
        v => (v && v > 20 )|| 'Age must be greater than 20',
        v => (v && v < 60 )|| 'Age must be less than 60'
        ]"
        required
        ></v-text-field>

        <v-text-field 
        v-model="address" 
        label="Address" 
        placeholder="eg.Myanmar"
        :rules="[
        v => !!v || 'Required'
        ]"
        ></v-text-field>

        <v-select 
        v-model="gender"
        label="Gender"
        :items="['male','female']"
        :rules="[
        v => !!v || 'Required']"
        ></v-select>


        <v-text-field
          v-model="gmail"
          :rules="[
            (v) => !!v || 'Required',
            (v) => /.+@.+\..+/.test(v) || 'G-mail must be valid',
          ]"
          label="G-mail"
          required
        ></v-text-field>

        
        <v-text-field
          v-model="password"
          :counter="10"
          :rules="[
            (v) => !!v || 'Required',
            (v) =>
              (v && v.length <= 10) ||
              'Password must be less than 10 characters',
          ]"
          label="Password"
          required
        ></v-text-field>

        
        <v-btn
          :disabled="!registerForm"
          color="success"
          class="mr-4"
          @click="OnClickRegister()"
        >
          <span v-if="!loading">Register</span>
          <v-progress-circular
            v-else
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-btn>

        <!-- Error Alert -->
        <v-alert class="mt-3" v-show="errorAlert" dense type="error">
          Register Failed!
        </v-alert>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import utils from "../utils/utils";

export default {
  name: "register",

  components: {},

  data() {
    return {
            name:"Aung Aung",
            age:"33",
            gender:"male",
            address:"myanmar",
            gmail:"aungaung@gmail.com",
            password:"1111",
            registerForm: false,
            loading:false,
            errorAlert:false
    };
  },

  async created() {},

  methods: {
    async OnClickRegister() {
      if (this.$refs.registerForm.validate()) {
        this.errorAlert = false;

        try {
          this.loading = true;

          // API Call
          const resp = await utils.http.post("/user/register", {
            name: this.name,
            age: this.age,
            address:this.address,
            gender:this.gender,
            gmail: this.email,
            password: this.password,
          });

          if (resp && resp.status === 200) {
            const data = await resp.json();
            if (data) {
              // Store Login Info in Vuex
              this.$store.commit("setLoginUser", data);
              // If Admin -> Go to Admin
              // If User -> Go to Home
              if (data.role == "admin") {
                this.$router.push({ path: "/admin" });
              } else {
                this.$router.push({ path: "/" });
              }
            }
          } else {
            this.errorAlert = true;
          }
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
