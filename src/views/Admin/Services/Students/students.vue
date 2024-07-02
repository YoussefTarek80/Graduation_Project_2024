<template>
    <div>
        <Navbar_Component></Navbar_Component>
        <section
            class="m-6 sm:m-16"
            data-aos="fade-up"
            data-aos-duration="1000"
        >
            <div class="flex flex-col">
                <span class="sm:text-3xl text-2xl">قائمة الطلاب</span>
                <i
                    class="fa-regular fa-horizontal-rule fa-2xl text-customPink"
                ></i>
            </div>
          <FilterStudents @search-national-id="handleSearchNationalID" @school-selected="handleSchoolSelected" @stage-selected="handleStageSelected" @level-selected="handlelevelSelected" @Retrived-done="handleRetrived" @Retrived-false="handleResetRetrived"></FilterStudents>
          <div class="relative">
                <table_Component
                    :items="filtered_Array"
                    :infoRoute="'/Admin/Students/InfoStudent'"
                ></table_Component>
            </div>
        </section>
        <Footer_Component></Footer_Component>
    </div>
</template>

<script>
import table_Component from "../../../../UI/Tables/StudentTable/Table.vue";
import FilterComponent from "../../../../components/Admin/Filtration/Filter.vue";
import FilterStudents from "../Students/Filteration/filterStudents.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FilterStudents,
    table_Component,
    FilterComponent,
  },
  data() {
    return {
      filtered_Array: [],
      Students: [
        {
          id: 1,
          schoolname: "السعيدية",
          schoolAdminstration: "الجيزة",
          name: "احمد حسام",
          national_id: "024144657498798354",
        },
        {
          id: 2,
          schoolname: "الهرم",
          schoolAdminstration: "الجيزة",
          name: " كريم طارق",
          national_id: "1",
        },
      ],
      stageID: null,
      levelID: null,
      schoolID: null,
      nationalID:"",
      RetrivedDone: false,
      SubhjectRetrivedDone: false,
      RetrivedTermDone: false,

    };
  },
  created() {
    this.loadFromSessionStorage();
  },
  computed: {
    ...mapGetters(['GetAllstudents']),
  },
  methods: {
    ...mapActions(['FetchStudents']),
    handleSchoolSelected(schoolID) {
      try {
        this.schoolID = schoolID;
        console.log('Selected schoolID:', this.schoolID);
        this.SubhjectRetrivedDone = true;
        this.saveToSessionStorage();
      } catch (err) {
        console.log(err);
      }
    },
    async handleStageSelected(stageID) {
      try {
        this.stageID = stageID;
        console.log('Selected stageID:', this.stageID);
        this.SubhjectRetrivedDone = true;
        this.saveToSessionStorage();
      } catch (err) {
        console.log(err);
      }
    },
    async handlelevelSelected(levelID) {
      this.levelID = levelID;
      await this.FetchStudents({ school: this.schoolID, stage: this.stageID, grade: this.levelID });
      if (this.GetAllstudents) {
        this.filtered_Array = this.GetAllstudents;
      }
      console.log(this.GetAllstudents);
      console.log('Selected levelID:', this.levelID);
      this.saveToSessionStorage();
    },
    handleRetrived() {
      this.RetrivedDone = true;
      this.saveToSessionStorage();
    },
    handleResetRetrived() {
      this.RetrivedDone = false;
      this.saveToSessionStorage();
    },
    saveToSessionStorage() {
      const data = {
        stageID: this.stageID,
        levelID: this.levelID,
        schoolID: this.schoolID,
        filtered_Array: this.filtered_Array,
        RetrivedDone: this.RetrivedDone,
        SubhjectRetrivedDone: this.SubhjectRetrivedDone,
        RetrivedTermDone: this.RetrivedTermDone,
      };
      sessionStorage.setItem('studentFilterData', JSON.stringify(data));
    },
    loadFromSessionStorage() {
      const data = JSON.parse(sessionStorage.getItem('studentFilterData'));
      if (data) {
        this.stageID = data.stageID;
        this.levelID = data.levelID;
        this.schoolID = data.schoolID;
        this.filtered_Array = data.filtered_Array;
        this.RetrivedDone = data.RetrivedDone;
        this.SubhjectRetrivedDone = data.SubhjectRetrivedDone;
        this.RetrivedTermDone = data.RetrivedTermDone;
      }
    },
    async handleSearchNationalID(nationalID) {
      this.nationalID=nationalID;
      const form = new FormData();
      form.append('national_id', this.nationalID);
      console.log('Search national ID:', nationalID);
      // this.filtered_Array = this.Students.filter(student => student.national_id === nationalID);
    },
  },
};
</script>
