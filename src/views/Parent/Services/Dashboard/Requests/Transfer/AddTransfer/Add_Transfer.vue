<template>
  <NavBar_View></NavBar_View>
  <section data-aos="fade-left" data-aos-duration="1000" class="px-20 py-10">
    <div class="flex flex-col">
      <span class="sm:text-5xl text-2xl text-customDarkPurple"> اضافة طلب تحويل   </span>
      <i
          class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
      ></i>
    </div>

    <ChildData :form="ChildFormData"></ChildData>
    <ParentData :form="ParentFormData"></ParentData>
    <SchoolData :scID="std.school_id" :adID="std.school.adminstration_id" @transfer-request="addTransfer"></SchoolData>
  </section>
</template>
<script>
import NavBar_View from "../../../../../../../components/Parent/NavBar.vue";
import ChildData from "../AddTransfer/ChildData/child-data.vue"
import ParentData from "../AddTransfer/ParentData/parent-data.vue"
import SchoolData from "../AddTransfer/SchoolData/school--data.vue"
import {mapActions, mapGetters} from "vuex";


export default {
  components: {NavBar_View,ChildData,ParentData,SchoolData},
  data() {
    return {
      std: '',
      schoolId: '',
      ChildFormData:{
        name:'',
        national_id:'',
        gender:'',
        level:'',
        birthdate:'',
        childbirth_certificate:'',
        image:''
      },
      ParentFormData:{
        name:'',
        national_id:'',
        gender:'',
        nationality:'',
        phone:'',
        religion:'',
        address:'',
        email:''
      },
    }
  },
  computed: {
    ...mapGetters(['getChildren', 'getAllSchools']),
  },
  async created() {
    await this.GetStudent();
  },
  mounted(){

  },
  methods: {
    ...mapActions(['ShowChildren', 'FetchNotOwnSchool', 'addTransferRequest']),
    init(){
      this.ChildFormData.name=this.std.name
      this.ChildFormData.national_id=this.std.national_id
      this.ChildFormData.gender=this.std.gender
      this.ChildFormData.level=this.std.level
      this.ChildFormData.birthdate=this.std.date_of_birth
      this.ChildFormData.childbirth_certificate=this.std.childbirth_certificate
      this.ChildFormData.image=this.std.image
      this.ParentFormData.name=this.std.parent.name
      this.ParentFormData.national_id=this.std.parent.national_id
      this.ParentFormData.gender=this.std.parent.gender
      this.ParentFormData.address=this.std.parent.address
      this.ParentFormData.nationality=this.std.parent.nationality
      this.ParentFormData.phone=this.std.parent.phone
      this.ParentFormData.religion=this.std.parent.religion
      this.ParentFormData.email=this.std.parent.email
    },
    async GetStudent() {
      try {
        await this.ShowChildren();
        const index = this.$route.params.id;
        this.std = this.getChildren.find(
            (student) => student.id === parseInt(index)
        );
        if(this.std){
          this.init();
        }

        console.log(this.std)
      } catch (err) {
        console.log(err)
      }
    },
    async addTransfer(newSchoolId) {
      const form = new FormData();
      form.append('new_school', newSchoolId);
      const studentID=this.std.id;
      await this.addTransferRequest({formData:form,id:studentID});
    },
    change() {
      console.log(this.schoolId);
    }
  },

};
</script>
<style scoped>
@import url("../../../../../../../UI/CustomsCss/CustomParentInput.css");
@import url("./Add_Transfer.css");
</style>