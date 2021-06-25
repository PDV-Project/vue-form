<template>
  <div>
    <h2>Registro</h2>

    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error !== undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>

        <input
          type="hidden"
          id="g-recaptcha-response"
          name="g-recaptcha-response"
        />
        <input type="hidden" name="action" value="validate_captcha" />

        <p>Nome:</p>
        <input
          type="text"
          placeholder="Insira seu nome"
          class="input"
          v-model="nome"
        />

        <p>Email:</p>
        <input
          type="email"
          placeholder="example@email.com"
          class="input"
          v-model="email"
        />

        <p>Senha:</p>
        <input
          type="password"
          placeholder="*****"
          class="input"
          v-model="password"
        />
        <vue-recaptcha
          sitekey="6LfSplQbAAAAAPgOfrR3j-YCQOoi9_n4aLi9fEhp"
          :loadRecaptchaScript="true"
          @verify="onVerify"
          @expired="onCaptchaExpired"
          ref="recaptcha" 
        ></vue-recaptcha>

        <hr />
        <button class="button is-primary" @click="registrar">Logar</button>
      </div>
    </div>
  </div>
</template>


<script src="https://www.google.com/recaptcha/api.js?render=%3C6LfSplQbAAAAAPgOfrR3j-YCQOoi9_n4aLi9fEhp%3E"></script>

<script>
import axios from "axios";
import VueRecaptcha from "vue-recaptcha";

export default {
  components: { VueRecaptcha },
  data() {
    return {
      nome: "",
      email: "",
      password: "",
      recaptcha: null,
      error: undefined,
    };
  },
  mounted() {
   

  },
  methods: {
    registrar() {

      if(this.recaptcha !== null) {
        axios
        .post("http://localhost:3000/register", {
          nome: this.nome,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          alert("Usuário registrado com sucesso");
          this.nome = "";
          this.email = "";
          this.password = "";
          this.error = undefined
          this.$refs.recaptcha.reset();
          this.recaptcha = null
  
        })
        .catch((err) => {
          var msgErro = err.response.data.err;
          this.error = msgErro;
        }) 
      }
      else {
        this.error = "Por favor complete o Recaptcha"
      }
      
    },
    onVerify(response) {
      this.recaptcha = response;
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    }
  },
};
</script>

<style scoped>
.notification {
  margin-top: -50px;
  margin-bottom: 2rem;
}
h2 {
  margin-top: 30px;
  font-size: 1.2rem;
  font-weight: 600;
}
div hr {
  margin-bottom: 4rem;
}
input {
  margin: 0.8rem 0;
}
button {
  padding: 7px 19px;
  width: 120px;
  height: 55px;
}
</style>