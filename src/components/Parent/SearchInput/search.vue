<template>
  <section>
    <form @submit.prevent="SearchDegree">
      <div class="flex items-center justify-center sm:w-full bg-gray-100 rounded-3xl mt-10">
        <div class="inputGroup sm:w-7/12 w-96 relative pb-6">
          <input id="searchInput" type="text" autocomplete="off" style="padding: 10px" v-model="ChildNationalID">
          <label for="">الرقم القومي للطالب</label>
          <div class="absolute top-0 left-5">
            <div class="flex items-center justify-center gap-5">
              <button class="py-1.5" @click="SearchDegree">
                <i class="fa-duotone fa-magnifying-glass text-2xl animate-pulse"></i>
              </button>
              <button @click="toggleMicrophone" class="animate-pulse">
                <i :class="isRecording ? 'fa-solid fa-microphone-lines' : 'fa-duotone fa-microphone'" class="text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    isRecording: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      ChildNationalID: "",
    };
  },
  methods: {
    SearchDegree() {
      this.$emit("search", this.ChildNationalID);
    },
    toggleMicrophone() {
      this.$emit("update:isRecording", !this.isRecording);
      if (this.isRecording) {
        this.startRecognition();
      }
    },
    startRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not available in your browser.');
        this.$emit("update:isRecording", false);
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-EG';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        this.ChildNationalID = this.convertToNumbers(spokenText);
      };
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        this.$emit("update:isRecording", false);
      };
      recognition.onend = () => {
        this.$emit("update:isRecording", false);
        this.SearchDegree();
      };
      recognition.start();
    },
    convertToNumbers(text) {
      const numWords = {
        'واحد': 1, 'اثنين': 2, 'ثلاثة': 3, 'أربعة': 4, 'خمسة': 5,
        'ستة': 6, 'سبعة': 7, 'ثمانية': 8, 'تسعة': 9, 'صفر': 0,
      };
      if (text.endsWith(".")) {
        text = text.slice(0, -1);
      }
      return text.split(' ').map(word => numWords.hasOwnProperty(word) ? numWords[word] : word).join('');
    },
  },
};
</script>

<style scoped>
@import url("../../../UI/CustomsCss/CustomParentInput.css");
</style>
