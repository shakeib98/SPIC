"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frFR = void 0;

var _getPickersLocalization = require("./utils/getPickersLocalization");

// import { CalendarPickerView } from '../internals/models';
const frFRPickers = {
  // Calendar navigation
  previousMonth: 'Mois précédent',
  nextMonth: 'Mois suivant',
  // View navigation
  openPreviousView: 'Ouvrir la vue précédente',
  openNextView: 'Ouvrir la vue suivante',
  // calendarViewSwitchingButtonAriaLabel: (view: CalendarPickerView) => view === 'year' ? 'year view is open, switch to calendar view' : 'calendar view is open, switch to year view',
  // DateRange placeholders
  start: 'Début',
  end: 'Fin',
  // Action bar
  cancelButtonLabel: 'Annuler',
  clearButtonLabel: 'Vider',
  okButtonLabel: 'OK',
  todayButtonLabel: "Aujourd'hui" // Clock labels
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
const frFR = (0, _getPickersLocalization.getPickersLocalization)(frFRPickers);
exports.frFR = frFR;