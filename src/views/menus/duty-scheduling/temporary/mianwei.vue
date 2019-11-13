<template>
  <div class="duty-container">
    <div class="incident">
      <div>
        <el-button type="primary">安排人员</el-button>
        <el-button type="primary">重置所有安排</el-button>
      </div>
      <el-button type="primary" @click="toggle">登记无课表</el-button>
    </div>
    <div class="course-container" v-if="visibility">
      <h3>登记无课表</h3>
      <div class="record-course">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <th class="day" v-for="(item,index) in weekday" :key="index">{{item}}</th>
          </tr>
          <tr v-for="(itemss,index) in idArr" :key="index">
            <td v-for="(items,index) in itemss" :key="index" @click="saveId(items)">
              <course @addArr="addId"></course>
            </td>
          </tr>
        </table>
      </div>

      <div class="btn-container">
        <el-button class="button" @click="cancel">取消</el-button>
        <el-button type="primary" class="button" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
import course from "@/views/Course.vue";
import responseHandler from "@/utils/responseHandler";
export default {
  name: "home",
  data() {
    return {
      visibility: true,
      weekday: ["星期一", "星期二", "星期三", "星期四", "星期五"],
      idArr: [
        ["1", "2", "3", "4", "5"],
        ["6", "7", "8", "9", "10"],
        ["11", "12", "13", "14", "15"],
        ["16", "17", "18", "19", "20"]
      ],
      saveIdArr: [],
      id: 0
    };
  },
  components: {
    course
  },
  methods: {
    cancel() {
      this.visibility = !this.visibility;
    },
    toggle() {
      this.visibility = !this.visibility;
    },
    saveId(items) {
      this.id = Number(items);
      console.log(this.id);
    },
    addId(data) {
      switch (data) {
        case "单周无课":
          if (this.saveIdArr.indexOf(this.id) >= 0) {
            return;
          }
          this.saveIdArr.push(this.id);
          break;

        case "双周无课":
          this.id = Number(this.id + 20);
          if (this.saveIdArr.indexOf(this.id) >= 0) {
            return;
          }
          this.saveIdArr.push(this.id);
          break;

        case "单双无课":
          if (this.saveIdArr.indexOf(this.id) >= 0) {
            return;
          }
          this.saveIdArr.push(this.id);
          this.id = Number(this.id + 20);
          if (this.saveIdArr.indexOf(this.id) >= 0) {
            return;
          }
          this.saveIdArr.push(this.id);
          break;
        case "单双有课":
          break;
      }
      console.log(this.saveIdArr);
    },
     submit() {
      axios
        .post("/api" + api.submitFreeInformation, {
          freeCourseList: this.saveIdArr
        })
        .then(response => {
          if (!responseHandler.handle(response.data, this)) {
            return;
          }
          console.log("success");
        });
    },
  }
};
</script>
<style lang="less" >
@width: 110px;
.duty-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px;
}
.incident {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h3 {
  margin: 0;
  margin-bottom: 10px;
}
.course-container {
  box-sizing: border-box;
  width: @width*5+47px;
  padding: 20px;
  display: fixed;
  margin: 0 auto;
  margin-top: 100px;
  border: 1px solid black;
}
.record-course {
  width: @width*5+7px;
  box-sizing: border-box;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
}
td {
  width: 110px;
  height: 40px;
}
.day {
  line-height: 40px;
  text-align: center;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
}
.button {
  margin-top: 15px;
}
</style>