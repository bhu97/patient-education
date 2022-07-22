

export class DateUtility {
    public static getDayByDate(date: string, separator: string) {
        let firstSeparator = date.indexOf(separator);
        let day = date.substring(0, firstSeparator);
        if (parseInt(day) > 0 && day.length < 2) day = '0' + day;
        return day;
    }

    public static getDayAndMonthNameByDate(date: string, separator: string) {
        return this.getDayByDate(date, separator) + ' ' + this.getMonthNameByNumber(Number.parseInt(this.getMonthByDate(date, separator))).substring(0, 3);
    }

    public static getDayAndMonthFullNameByDate(date: string, separator: string) {
        return this.getDayByDate(date, separator) + ' ' + this.getMonthNameByNumber(Number.parseInt(this.getMonthByDate(date, separator)));
    }

    public static getMonthByDate(date: string, separator: string) {
        let firstSeparator = date.indexOf(separator);
        let secondSeparator = date.indexOf(separator, firstSeparator + 1);
        let month = date.substring(firstSeparator + 1, secondSeparator);
        if (parseInt(month) > 0 && month.length < 2) month = '0' + month;
        return month;
    }

    public static getYearByDate(date: string, separator: string) {
        let firstSeparator = date.indexOf(separator);
        let secondSeparator = date.indexOf(separator, firstSeparator + 1);
        return date.substring(secondSeparator + 1, date.length);
    }

    public static getMonthAndYearByDate(date: string, separator: string, withSeparator: boolean = false) {
        const month = this.getMonthByDate(date, separator);
        const year = this.getYearByDate(date, separator);
        return month + (withSeparator ? separator : '') + year;
    }

    public static getYearAndMonthByDate(date: string, separator: string, withSeparator: boolean = false) {
        const month = this.getMonthByDate(date, separator);
        const year = this.getYearByDate(date, separator);
        return year + (withSeparator ? separator : '') + month;
    }

    public static getYearAndMonthByResponseDate(date: string, separator: string, withSeparator: boolean = true) {
        const month = Number.parseInt(date.substring(0, 2), 10);
        const year = Number.parseInt(date.substring(3, 7), 10);
        const dateObj = new Date(year, month - 1);

        const resultDate = this.formatDate(dateObj, 'yyyy' + (withSeparator ? separator : '') + 'MM');

        return resultDate;
    }

    public static formatDate(date: Date, format: string): string {
        var res: string = format;
        if (res.indexOf('dd') >= 0) {
            const day = date.getDate().toString();
            res = res.replace('dd', day.length < 2 ? '0' + day : day);
        }

        if (res.indexOf('MMMM') >= 0) {
            res = res.replace('MMMM', this.getMonthNameByNumber(date.getMonth() + 1));
        } else if (res.indexOf('MM') >= 0) {
            const month = (date.getMonth() + 1).toString();
            res = res.replace('MM', month.length < 2 ? '0' + month : month);
        }

        if (res.indexOf('yyyy') >= 0) {
            res = res.replace('yyyy', date.getFullYear().toString());
        }

        if (res.indexOf('HH') >= 0) {
            let hoursString = '';
            if (date.getHours() < 10) {
                hoursString = '0' + date.getHours().toString();
            } else {
                hoursString = date.getHours().toString();
            }
            res = res.replace('HH', hoursString);
        }

        if (res.indexOf('mm') >= 0) {
            let mitutesString = '';
            if (date.getMinutes() < 10) {
                mitutesString = '0' + date.getMinutes().toString();
            } else {
                mitutesString = date.getMinutes().toString();
            }
            res = res.replace('mm', mitutesString);
        }

        if (res.indexOf('ss') >= 0) {
            let secondsString = '';
            if (date.getSeconds() < 10) {
                secondsString = '0' + date.getSeconds().toString();
            } else {
                secondsString = date.getSeconds().toString();
            }
            res = res.replace('ss', secondsString);
        }
        return res;
    }

    public static checkDateFormat(date: string) {
        let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        return date_regex.test(date);
    }

    public static parse(date: string, separator: string): Date {
        var firstSep = date.indexOf(separator);
        var secondSep = date.indexOf(separator, firstSep + 1);
        var day = date.substring(0, firstSep);
        var month = date.substring(firstSep + 1, secondSep);
        var year = date.substring(secondSep + 1, date.length);
        return new Date(Number.parseInt(year, 10), Number.parseInt(month, 10) - 1, Number.parseInt(day, 10));
    }

    public static parseTime(date: string, separator: string, separatorTime: string): Date {
        var firstSep = date.indexOf(separator);
        var secondSep = date.indexOf(separator, firstSep + 1);
        var day = date.substring(0, firstSep);
        var month = date.substring(firstSep + 1, secondSep);
        var year = date.substring(secondSep + 1, date.length);
        var firstStepTime = date.indexOf(separatorTime);
        var secondStepTime = date.indexOf(separatorTime, firstStepTime + 1);
        var hour = date.substring(firstStepTime - 2, firstStepTime);
        var minute = date.substring(firstStepTime + 1, secondStepTime);
        let data = new Date(Number.parseInt(year, 10), Number.parseInt(month, 10) - 1, Number.parseInt(day, 10));
        data.setHours(parseInt(hour));
        data.setMinutes(parseInt(minute));
        return data;
    }

    public static parseTimeV2(date: string, separator: string, separatorTime: string): Date {
        var firstSep = date.indexOf(separator);
        var secondSep = date.indexOf(separator, firstSep + 1);
        var year = date.substring(0, firstSep);
        var month = date.substring(firstSep + 1, secondSep);
        var day = date.substring(secondSep + 1, date.length);
        var firstStepTime = date.indexOf(separatorTime);
        var secondStepTime = date.indexOf(separatorTime, firstStepTime + 1);
        var hour = date.substring(firstStepTime - 2, firstStepTime);
        var minute = date.substring(firstStepTime + 1, secondStepTime);
        let data = new Date(Number.parseInt(year, 10), Number.parseInt(month, 10) - 1, Number.parseInt(day, 10));
        data.setHours(parseInt(hour));
        data.setMinutes(parseInt(minute));
        return data;
    }

    public static parseDate(date: string, separator: string): string {
        var firstSep = date.indexOf(separator);
        var secondSep = date.indexOf(separator, firstSep + 1);
        var year = date.substring(0, firstSep);
        var month = date.substring(firstSep + 1, secondSep);
        var day = date.substring(secondSep + 1, secondSep + 3);
        let data = day + "/" + month + "/" + year;
        return data;
    }

    public static addDayToDate(date: Date, daysQuantity: number = 1): Date {
        try {
            date.setDate(date.getDate() + daysQuantity);
        } catch (ex) { }

        return date;
    }
    public static addDayToDateExcludeWeekend(date: Date, daysQuantity: number = 1): Date {
        let day: any = '';
        try {

            for (let i = 0; i <= daysQuantity; i++) {

                date.setDate(date.getDate() + i);
                if (date.getDay() === 0 || date.getDay() === 6) {
                    date.setDate(date.getDate() + 1);
                }
            }
            // day.setDate(date.getDate() + daysQuantity);
        } catch (ex) { }

        return date;
    }

    public static addYearToDate(date: Date, yearsQuantity: number = 1): Date {
        try {
            date.setFullYear(date.getFullYear() + yearsQuantity);
        } catch (ex) { }

        return date;
    }

    public static subtractYearToDate(date: Date, yearsQuantity: number = 1): Date {
        try {
            date.setFullYear(date.getFullYear() - yearsQuantity);
        } catch (ex) { }

        return date;
    }

    public static subtractMonthToDate(date: Date, monthsQuantity: number = 1): Date {
        try {
            date.setMonth(date.getMonth() - monthsQuantity);
        } catch (ex) { }

        return date;
    }

    public static addMonthToDate(date: Date, monthsQuantity: number = 1): Date {
        try {
            date.setMonth(date.getMonth() + monthsQuantity);
        } catch (ex) { }

        return date;
    }

    public static subtractDayToDate(date: Date, daysQuantity: number = 1): Date {
        try {
            date.setDate(date.getDate() - daysQuantity);
        } catch (ex) { }

        return date;
    }

    // public static getMonthNameByNumber(month: number): string {
    //     switch (month) {
    //         case 1:
    //             return BaseLocalization.monthJan;

    //         case 2:
    //             return BaseLocalization.monthFeb;

    //         case 3:
    //             return BaseLocalization.monthMar;

    //         case 4:
    //             return BaseLocalization.monthApr;

    //         case 5:
    //             return BaseLocalization.monthMay;

    //         case 6:
    //             return BaseLocalization.monthJun;

    //         case 7:
    //             return BaseLocalization.monthJul;

    //         case 8:
    //             return BaseLocalization.monthAug;

    //         case 9:
    //             return BaseLocalization.monthSep;

    //         case 10:
    //             return BaseLocalization.monthOct;

    //         case 11:
    //             return BaseLocalization.monthNov;

    //         case 12:
    //             return BaseLocalization.monthDec;

    //         default:
    //             return '';
    //     }
    // }

    public static stringDateToDate(date: string): string {
        let changedDate = date
            .split('/')
            .reverse()
            .join('/');
        return changedDate;
    }

    public static checkStringDate(date: string): string {
        if (date == '03/01/0001') {
            return '-';
        }
        return date;
    }

    public static getLastDayOfMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    public static convertNexiCardFormatToConventionalFormat(date: string) {
        const year = date.slice(0, 4);
        const month = date.slice(5, 7);
        const day = date.slice(8, 10);
        return `${day}/${month}/${year}`;
    }

    public static isValid(date: Date) {
        return typeof date.getTime == 'function' && !isNaN(date.getTime());
    }

    public static calcWorkingForRibaDebitoreDay(fromDate: any, days: any) {
        var count = 0;
        while (count < days) {
            fromDate.setDate(fromDate.getDate() + 1);
            if (fromDate.getDay() != 0 && fromDate.getDay() != 6)
                count++
        }
        return fromDate
    }

    public static getMinDateForRiba(accountingDates: string[]) {
        if (accountingDates && accountingDates.length > 2) {
            if (accountingDates[0] == this.formatDate(new Date(), 'dd/MM/yyyy')) {
                return accountingDates[2];
            }
            else {
                return accountingDates[1];
            }
        }
        else {
            return DateUtility.formatDate(DateUtility.addDayToDate(new Date(), 2), 'dd/MM/yyyy');
        }
    }

    public static getStartOfToday() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    }

    public static getDateStringFromDateTimeMs(dateString?: string) {
        if (dateString != undefined) {
            const date = DateUtility.parseTimeV2(dateString, "-", ":");
            if (DateUtility.isValid(date)) {
                return DateUtility.formatDate(date, "dd/MM/yyyy");
            } else {
                console.error("Invalid date format", dateString);
                return "";
            }
        }
        else {
            console.error("Invalid date format", dateString);
            return "";
        }
    }

    public static getDateTimeStringFromDateTimeMs(dateString?: string) {
        if (dateString != undefined) {
            const date = DateUtility.parseTimeV2(dateString, "-", ":");
            if (DateUtility.isValid(date)) {
                return DateUtility.formatDate(date, "dd.MM.yyyy HH.mm");
            } else {
                console.error("Invalid date format", dateString);
                return "";
            }
        }
        else {
            console.error("Invalid date format", dateString);
            return "";
        }
    }

    public static getNumberofDaysLeftForDetailOperation(initialDateParam: string) {
        let initialDate = (new Date() > new Date(initialDateParam)) ? new Date() : new Date(initialDateParam);
        let finalDate;
        if (initialDate.getMonth() === 12) {
            finalDate = new Date(initialDate.getFullYear() + 1, 1, 16)
            //exclude weekend
            while (finalDate.getDay() == 0 || finalDate.getDay() == 1) {
                finalDate.setDate(finalDate.getDate() + 1);
            }
        }
        else {
            finalDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 16)
            //exclude weekend
            while (finalDate.getDay() == 0 || finalDate.getDay() == 1) {
                finalDate.setDate(finalDate.getDate() + 1);
            }
            // Exclude 15 AUG every year (BANKS's NATIONAL HOLIDAY)
            if (finalDate.getMonth() == 7) {
                finalDate.setDate(finalDate.getDate() + 1);
            }
        }
        // One day Time in ms (milliseconds)
        let oneDay = 1000 * 60 * 60 * 24;
        let numberOfDays = Math.round(finalDate.getTime() - initialDate.getTime()) / (oneDay);

        // To remove the decimals from the (numberOfDays) resulting days value
        let finalNumberOfDays = numberOfDays.toFixed(0);
        return finalNumberOfDays

    }

    public static getStandardDateFormatByString(date:string):Date {
        let year= parseInt(date.split(' ')[2]) || NaN
        let month= DateUtility.getMonthNumberByMonthString((date.split(' ')[1] && date.split(' ')[1].toLowerCase()))|| NaN
        let day= parseInt(date.split(' ')[0])|| NaN
        return new Date(year, month,day)
    }

//     public static getMonthNumberByMonthString(month: string): number {
//         switch (month) {
//             case BaseLocalization.monthJan.toLowerCase():
//                 return 0;

//             case BaseLocalization.monthFeb.toLowerCase():
//                 return 1;

//             case BaseLocalization.monthMar.toLowerCase():
//                 return 2;

//             case BaseLocalization.monthApr.toLowerCase():
//                 return 3;

//             case BaseLocalization.monthMay.toLowerCase():
//                 return 4;

//             case BaseLocalization.monthJun.toLowerCase():
//                 return 5;

//             case BaseLocalization.monthJul.toLowerCase():
//                 return 6;

//             case BaseLocalization.monthAug.toLowerCase():
//                 return 7;

//             case BaseLocalization.monthSep.toLowerCase():
//                 return 8;

//             case BaseLocalization.monthOct.toLowerCase():
//                 return 9;

//             case BaseLocalization.monthNov.toLowerCase():
//                 return 10;

//             case BaseLocalization.monthDec.toLowerCase():
//                 return 11;

//             default:
//                 return -1;
//         }
//     }

//    public static getWeekDayFromDate(dateString:string): string{
//         let weekDayNumber = new Date(this.parseTimeV2(dateString, '-', ':')).getDay()

//         switch (weekDayNumber){

//             case 1: return BaseLocalization.weekMonday;
            
//             case 2: return BaseLocalization.weekTuesday;

//             case 3: return BaseLocalization.weekWednesday;

//             case 4: return BaseLocalization.weekThursday;

//             case 5: return BaseLocalization.weekFriday;

//             case 6: return BaseLocalization.weekSaturday;

//             case 7: return BaseLocalization.weekSunday;

//             default: return ''
//         }
//     }

    public static compareSpecificDateWithCurrent(dateString: string): boolean {
        if(DateUtility.formatDate(new Date(dateString), 'yyyy-MM-dd') == 
            DateUtility.formatDate(new Date(), 'yyyy-MM-dd')) {
            return true
        }
        return false
    }

    public static compareSpecificTimeWithCurrent(dateString: string): boolean {
        if(Date.parse('01/01/2011 ' + DateUtility.formatDate(new Date(dateString), 'HH:mm')) > 
            Date.parse('01/01/2011 ' + DateUtility.formatDate(new Date(), 'HH:mm'))) {
            return true
        }
        return false
    }
}

