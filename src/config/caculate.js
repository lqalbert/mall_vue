const SETDATE={
    formartNumber: function (v) {
        if ((new String(v)).length == 1) {
            return '0' + v;
        } else {
            return v;
        }
    },
    //本周第一天
    showWeekFirstDay:function(){
        let Nowdate = new Date();
        let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
        let M = Number(WeekFirstDay.getMonth()) + 1;
        return WeekFirstDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(WeekFirstDay.getDate());     
    },

    //本周最后一天
    showWeekLastDay: function (){
        let Nowdate = new Date();
        let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
        let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        let M = Number(WeekLastDay.getMonth()) + 1;
        return WeekLastDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(WeekLastDay.getDate());
    },

    //上周第一天
    showLastWeekFirstDay: function (){
        let Nowdate = new Date();
        let LastWeekFirstDay = new Date(Nowdate - (Nowdate.getDay() + 6) * 86400000);
        let M = Number(LastWeekFirstDay.getMonth()) + 1;
        return LastWeekFirstDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(LastWeekFirstDay.getDate());
    },

    //上周最后一天
    showLastWeekLastDay: function (){
        let Nowdate = new Date();
        let LastWeekFirstDay = new Date(Nowdate - (Nowdate.getDay() + 6) * 86400000);
        let LastWeekLastDay = new Date((LastWeekFirstDay / 1000 + 6 * 86400) * 1000);
        let M = Number(LastWeekLastDay.getMonth()) + 1;
        return LastWeekLastDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(LastWeekLastDay.getDate());
    },


    //本月第一天
    showMonthFirstDay: function (){
        let Nowdate = new Date();
        let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
        let M = Number(MonthFirstDay.getMonth()) + 1;
        return MonthFirstDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(MonthFirstDay.getDate());
    },

    //本月最后一天
    showMonthLastDay: function (){
        let Nowdate = new Date();
        let MonthNextFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1);
        let MonthLastDay = new Date(MonthNextFirstDay - 86400000);
        let M = Number(MonthLastDay.getMonth()) + 1;
        return MonthLastDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(MonthLastDay.getDate());
    },

    //上月第一天
    showLastMonthFirstDay: function (){
        let Nowdate = new Date();
        let LastMonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() - 1, 1);
        let M = Number(LastMonthFirstDay.getMonth()) + 1;
        return LastMonthFirstDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(LastMonthFirstDay.getDate());
    },
    //上月最后一天
    showLastMonthLastDay: function (){
        let Nowdate = new Date();
        let MonthFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
        let LastMonthLastDay = new Date(MonthFirstDay - 86400000);
        let M = Number(LastMonthLastDay.getMonth()) + 1;
        return LastMonthLastDay.getFullYear() + "-" + this.formartNumber(M) + "-" + this.formartNumber(LastMonthLastDay.getDate());
    },
    //当天 格式为2017-10-12
    showDay: function (){
        let day = new Date();
        //   let month_day= (day.getMonth()+1)<10 ? 0 :''+ (day.getMonth()+1)  + "-" + (day.getDate()<10 ? 0 :'' )+ day.getDate();
        //   return day.getFullYear() +'-'+ month_day;
        return day.getFullYear() + "-" + (day.getMonth() + 1) < 10 ? 0 : '' + (day.getMonth() + 1) + "-" + (day.getDate() < 10 ? 0 : '') + day.getDate();
    },
};
export default SETDATE;