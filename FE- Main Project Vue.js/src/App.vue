<template>
  <router-view></router-view>
</template>
<script>
export default {
  data() {
    return {
      Students: [
        {
          id: 1,
          schoolname: "السعيدية",
          schoolAdminstration: "الجيزة",
          name: "احمد حسام",
          level: "الصف الثاني الاعدادي",
          parent: "حسام حسني",
          parentPassion: "مهندس",
          nationality: "مصري",
          country: "مصر",
          nationalID: "3020102272656",
          address: "مصر - القاهرة",
          state: 'القاهرة',
          detailedAddress: 'القاهرة - مصر القديمة - النزهة',
        },
        {
          id: 2,
          schoolname: "الهرم",
          schoolAdminstration: "الجيزة",
          name: " كريم طارق",
          level: "الصف الثالث الاعدادي",
          parent: "طارق صلاح محمد",
          parentPassion: "دكتور",
          nationality: "سعودي",
          country: "السعودية",
          nationalID: "3020102272651",
          address: "مصر - الجيزة",
          state: null,
          detailedAddress: 'الجيزة -الهرم - سهل حمزة',
        },
      ],
      Requests: [
        {
          type: "تحويل",
          newScAddress: 'فيصل - الهرم - سهل حمزة',
          manager: null,
          studname: "يوسف طارق صلاح محمد",
          parentName: "طارق صلاح محمد",
          newSchool: 'عبدالله بن رواحة',
          currSchool: 'مصطفي كامل',
          level: 'الصف الخامس الابتدائي',
          schoolYear: new Date().getFullYear(),
          reason: 'ذكر السبب، مثل: عائلية، أو تغيير مكان الإقامة، أو أسباب صحية، أو أي سبب آخر',
          parentPhone: '+201065390754',
          parentEmail: 'tarek.salah122@gmail.com',
          date: {
            day: new Date().getDay() + 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
          time: {
            hrs: new Date().getHours(),
            mins: new Date().getMinutes(),
            secs: new Date().getSeconds(),
          }
        },
        {
          type: "تسجيل",
          studname: "الاء خميس عبد النعيم",
          parentName: "خميس عبد النعيم",
          dob: {
            day: 9,
            month: "January",
            year: 2009,
          },
          gender: "Female",
          religion: "Islam",
          nationlity: "Egyptian",
          nationalId: "084756456456",
          phone: "+201065390754",
          parentEmail: "khamess.abdel@gmail.com",
          level: "الصف الأول الثانوي",
          schoolYear: new Date().getFullYear(),
          grade: "A+",
          date: {
            day: new Date().getDay() + 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
          time: {
            hrs: new Date().getHours(),
            mins: new Date().getMinutes(),
            secs: new Date().getSeconds(),
          }
        },
        {
          parentName: "رمضان شوقي إسماعيل",
          type: "استفسار",
          query: "وصف الاستفسار؟",
          senderEmail: "ramadan.shawky@gmail.com",
          date: {
            day: new Date().getDay() + 1,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
          time: {
            hrs: new Date().getHours(),
            mins: new Date().getMinutes(),
            secs: new Date().getSeconds(),
          }
        },
      ],
    };
  },
  provide() {
    return {
      students: this.Students,
      requests: this.Requests,
    };
  },
};
</script>
<style scoped></style>
