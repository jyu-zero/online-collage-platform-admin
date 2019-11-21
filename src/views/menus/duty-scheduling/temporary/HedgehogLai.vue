<template>
    <div class="home">
        <div id="btn1">
            <!-- Todo：整合金隆安排表 -->
            <!-- <el-button type="primary" @click="goToArrange">安排人员</el-button> -->
            <!-- 清空安排表数据库 -->
            <el-button type="primary" @click="resetArrange">重置所有安排</el-button>
            <!-- 自加：清空无课表 -->
            <el-button type="primary" @click="resetFreelnformation">重置无课表</el-button>
            <!-- Todo:整合棉伟登记无课表 -->
            <!-- <el-button type="primary" @click="goToRegister">登记无课表</el-button> -->
        </div>

        <!-- 主表格 -->
        <el-table  :data="tableData" border  style="width: 60%" >
            <el-table-column prop="course" label="" width="100">
            </el-table-column>
            <el-table-column prop="monday"  label="星期一">
            </el-table-column>
            <el-table-column prop="tuesday"   label="星期二">
            </el-table-column>
            <el-table-column prop="wednesday"  label="星期三">
            </el-table-column>
            <el-table-column prop="thursday"  label="星期四">
            </el-table-column>
            <el-table-column prop="friday" label="星期五">
            </el-table-column>
        </el-table>
        <!-- 主表格完 -->

        <!-- 查看单双周 -->
        <!-- Todo：等待后台单双周接口 -->
        <div id = "btn">
            <!-- <el-button type="primary" @click="goToSingleWeek">单周</el-button>
            <el-button type="primary" @click="goToDoubleWeek">双周</el-button> -->
        </div>
        
    </div>
</template>
<script>

export default {
    dytyStaff:'home',   
    data() {  
        return {
            duty:[],
            message:[],
            // 主体表格信息获取
            // clas：第一列信息
            tableData: [{
                course: '第一节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                }, {
                course: '第二节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第三节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第四节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第五节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第六节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第七节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
                },{
                course: '第八节',
                monday:"",
                tuesday:"",
                wednesday:"",
                thursday:"",
                friday:""
            }],

        };
    },
    created(){
        this.getArrange();       
    },
    methods: {
    //   goToArrange(){
    //       this.$router.push({name:''})
    //   },
    // 重置所有安排
        resetArrange(){
            axios.post("/api"+api.resetArrange,{           
            }).then(response=>{
                if(response.data.code="0000"){
                    this.$message({
                    message: response.data.msg,
                    type: 'success',
                    center: true
                    });
                }
            });
        },
        resetFreelnformation(){
            axios.post("/api"+api.resetFreeInformation,{            
            }).then(response=>{
                if(response.data.code="0000"){
                    this.$message({
                    message: response.data.msg,
                    type: 'success',
                    center: true
                    });
              }
          });
        },
        getArrange(){
            axios.get("/api"+api.getArrange,{           
            }).then(response=>{
                if(response.data.code="0000"){
                    this.message=response.data.data;
                    this.dutyStaff=this.message.map(item=>{return{'name':item.name}});
                    for(let i=0;i<this.dutyStaff.length;i++){
                    let weekday = "";
                    switch(i%5){
                        case 0:
                        weekday = "monday";
                        break;
                        case 1:
                            weekday = "tuesday";
                            break;
                        case 2:
                            weekday = "wednesday";
                            break;
                        case 3:
                            weekday = "thursday";
                            break;
                        case 4:
                            weekday = "friday";
                            break;
                        case 5:
                        weekday = "monday";
                        break;
                        case 6:
                            weekday = "tuesday";
                            break;
                        case 7:
                            weekday = "wednesday";
                            break;
                        case 8:
                            weekday = "thursday";
                            break;
                        case 9:
                            weekday = "friday";
                            break;
                    }
                    this.tableData[Math.floor(i/5)][weekday] = this.dutyStaff[i].name;
                    }
                }
            });
        },
    //   goToRegister(){

    //   },
    //   goToSingleWeek(){

    //   },
    //   goToDoubleWeek(){

    //   }
    },
};
</script>

<style lang="less">
body{
    padding: 20px;
}

h1{
    text-align: center;
}
#btn1{
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>