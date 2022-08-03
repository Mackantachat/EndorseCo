<template>
  <section class="bg-white ">
    <div class="container py-20 mx-auto">
      <div class="flex flex-wrap items-center">
        <div class="w-full p-4 lg:w-12/12">
          <h3 class="text-center pt-5 mb-8 text-blue-400">ข้อมูลการออกกรมธรรม์ของฝ่ายบริหารงานสาขา สายประกันชีวิต</h3>
           <div ref="valSetup">Hello World</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated
  } from 'vue';
  import http from '@/services/AuthService'
  import Select2 from 'vue3-select2-component'
  import useValidate from '@vuelidate/core'
  import {
    required,
    helpers
  } from '@vuelidate/validators'
  import LitepieDatepicker from 'litepie-datepicker';

  export default {
    components: {
      Select2,
      LitepieDatepicker
    },

    setup() {
      const valSetup = ref(null);

      // console.log("Set up CanCall", this.CanCall());

     // const root = ref(null)

      onBeforeMount(() => {
        console.log("Compo onBeforeMount", valSetup.value )
      })

      onMounted(() => {
        console.log('Compo onMounted ' , valSetup.value )
      })


      return {
        valSetup,
      };
    },

    data() {
      return {
        val: "hello Option",
        valUpdate: 0
      };
    },

    beforeCreate() {
      console.log("option beforeCreate: " + this.val + this.$el );
    },
    created() {
      console.log("option created: " + this.val + this.$el );
    },
    beforeMount() {
      console.log("option beforeMount:", this.val + this.$el + this.CanCall());
    },

    mounted: function () {
      console.log("option mounted", this.val + this.$el + this.CanCall());
    },
    
    beforeUpdate() {
      console.log("option beforeUpdate() val: " + this.valUpdate)
    },
    updated() {
      console.log("option updated() val: " + this.valUpdate)
    },

    props() {
      console.log("State prop")
    },

    computed() {
      console.log("State computed")
    },

    

    methods: {
      CanCall() {
       return " Can Call Methord"
      },
    },

    validations() {
      return {

      }
    },


  };
</script>

<style lang="css">
  select.form-control {
    width: 128px !important;
  }
</style>