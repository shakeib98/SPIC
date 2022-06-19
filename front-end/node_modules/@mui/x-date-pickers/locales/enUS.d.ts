import { PickersLocaleText } from './utils/pickersLocaleTextApi';
import { CalendarPickerView } from '../internals/models';
export declare const DEFAULT_LOCALE: PickersLocaleText<any>;
export declare const enUS: {
    components: {
        MuiLocalizationProvider: {
            defaultProps: {
                localeText: {
                    previousMonth?: string | undefined;
                    nextMonth?: string | undefined;
                    openPreviousView?: string | undefined;
                    openNextView?: string | undefined;
                    cancelButtonLabel?: string | undefined;
                    clearButtonLabel?: string | undefined;
                    okButtonLabel?: string | undefined;
                    todayButtonLabel?: string | undefined;
                    start?: string | undefined;
                    end?: string | undefined;
                    calendarViewSwitchingButtonAriaLabel?: ((currentView: CalendarPickerView) => string) | undefined;
                    clockLabelText?: ((view: import("../internals/models").ClockPickerView, time: any, adapter: import("../internals/models").MuiPickersAdapter<any>) => string) | undefined;
                    hoursClockNumberText?: ((hours: string) => string) | undefined;
                    minutesClockNumberText?: ((minutes: string) => string) | undefined;
                    secondsClockNumberText?: ((seconds: string) => string) | undefined;
                    openDatePickerDialogue?: ((date: any, utils: import("../internals/models").MuiPickersAdapter<any>) => string) | undefined;
                    openTimePickerDialogue?: ((date: any, utils: import("../internals/models").MuiPickersAdapter<any>) => string) | undefined;
                    timeTableLabel?: string | undefined;
                    dateTableLabel?: string | undefined;
                };
            };
        };
    };
};
