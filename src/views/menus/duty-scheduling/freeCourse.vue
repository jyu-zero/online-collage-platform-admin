<template>
  <div class='duty-container'>
    <div class='incident'>
      <div>
        <el-button type='primary'>安排人员</el-button>
        <el-button type='primary'>重置所有安排</el-button>
      </div>
      <el-button type='primary' @click='toggle'>登记无课表</el-button>
    </div>
    <div class='course-container' v-if='visibility'>
      <h3>登记无课表</h3>
      
      <div class='record-course'>
        <table border='1' cellspacing='0' cellpadding='0'>
          <tr>
            <th class='day' v-for='(item, index) in weekday' :key='index'>
              {{ item }}
            </th>
          </tr>
          <tr v-for='(itemss, index) in idArr' :key='index'>
            <td
              v-for='(items, index) in itemss'
              :key='index'
              @click='saveId(items)'
            >
              <course @add-to-arr='addId'></course>
            </td>
          </tr>
        </table>
      </div>

      <div class='btn-container'>
        <el-button class='button' @click='cancel'>取消</el-button>
        <el-button type='primary' class='button' @click='submit'
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { prefix, responseHandler, dutySchedulingApi } from '@/api'
import course from '@/components/duty-scheduling/Course.vue'
import { Button } from 'element-ui'
export default {
    name: 'home',
    components: {
        [Button.name]: Button,
        course
    },
    data() {
        return {
            visibility: false,
            weekday: ['星期一', '星期二', '星期三', '星期四', '星期五'],
            idArr: [
                ['1', '2', '3', '4', '5'],
                ['6', '7', '8', '9', '10'],
                ['11', '12', '13', '14', '15'],
                ['16', '17', '18', '19', '20'],
                ['21', '22', '23', '24', '25'],
                ['26', '27', '28', '29', '30'],
                ['31', '32', '33', '34', '35'],
                ['36', '37', '38', '39', '40']
            ],
            saveIdArr: [],
            id: 0
        }
    },
    methods: {
        // 取消按钮
        cancel() {
            this.visibility = !this.visibility
        },
        // 无课表显示
        toggle() {
            this.visibility = !this.visibility
        },
        // 保存课程对应的id
        saveId(items) {
            this.id = Number(items)
            console.log(this.id)
        },
        // 将id保存到数组中
        addId(data) {
            switch (data) {
                case '单周无课':
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break

                case '双周无课':
                    this.id = Number(this.id + 20)
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break

                case '单双无课':
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    this.id = Number(this.id + 20)
                    if (this.saveIdArr.indexOf(this.id) >= 0) {
                        return
                    }
                    this.saveIdArr.push(this.id)
                    break
                case '单双有课':
                    break
            }
            console.log(this.saveIdArr)
        },
        // 提交id数组
        submit() {
            this.axios
                .post(prefix.api + dutySchedulingApi.submitFreeInformation, {
                    freeCourseList: this.saveIdArr
                })
                .then(response => {
                    if (!responseHandler.handle(response.data, this)) {
                        return
                    }
                    console.log('success')
                })
        }
    }
}
</script>
<style lang='less' scoped>
@width: 100px;
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
  margin-top: 50px;
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
  width: @width;
  height: 32px;
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
