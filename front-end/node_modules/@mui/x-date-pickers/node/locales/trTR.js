"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trTR = void 0;

var _getPickersLocalization = require("./utils/getPickersLocalization");

// import { CalendarPickerView } from '../internals/models';
// This object is not Partial<PickersLocaleText> because it is the default values
const trTRPickers = {
  // Calendar navigation
  previousMonth: 'Önceki ay',
  nextMonth: 'Sonraki ay',
  // View navigation
  openPreviousView: 'sonraki görünüm',
  openNextView: 'önceki görünüm',
  // calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) => view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view',
  // DateRange placeholders
  start: 'Başlangıç',
  end: 'Bitiş',
  // Action bar
  cancelButtonLabel: 'iptal',
  clearButtonLabel: 'Temizle',
  okButtonLabel: 'Tamam',
  todayButtonLabel: 'Bugün' // Clock labels
  // clockLabelText: (view, time, adapter) => `Select ${view}. ${time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`}`,
  // hoursClockNumberText: hours => `${hours} hours`,
  // minutesClockNumberText: minutes => `${minutes} minutes`,
  // secondsClockNumberText: seconds => `${seconds} seconds`,
  // Open picker labels
  // openDatePickerDialogue: (rawValue, utils) => rawValue && utils.isValid(utils.date(rawValue)) ? `Choose date, selected date is ${utils.format(utils.date(rawValue)!, 'fullDate')}` : 'Choose date',
  // openTimePickerDialogue: (rawValue, utils) => rawValue && utils.isValid(utils.date(rawValue)) ? `Choose time, selected time is ${utils.format(utils.date(rawValue)!, 'fullTime')}` : 'Choose time',
  // Table labels
  // timeTableLabel: 'pick time',
  // dateTableLabel: 'pick date',

};
const trTR = (0, _getPickersLocalization.getPickersLocalization)(trTRPickers);
exports.trTR = trTR;