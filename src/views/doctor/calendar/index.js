import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { Calendar as RBCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import styles from '../../../assets/styles/scss/doctor/big-calendar/index.scss';
import 'react-dropdown/style.css';
import PageTitle from '../../../components/PageTitle';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from '../../../components/modal';
import LoaderOverlay from '../../../components/LoaderOverlay';

import '../../../assets/styles/scss/doctor/calendar/index.scss';
import Toast from '../../../components/Toast';

const cx = classNames.bind(styles);
const localizer = momentLocalizer(moment);

export default function Calendar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const appointments = useState([])
  const availableTimes = useState([])
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);
  const [timeSlots, setTimeSlots] = useState({});
  const [addTimes, setAddTimes] = useState([]);
  const [removeTimes, setRemoveTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (isOpen && selectedDate !== '') {
  //     setTimeSlots({});
  //     if (availableTimes && availableTimes.length > 0) {
  //       const times = availableTimes.filter((item) =>
  //       item && item.time && moment(item.time.split('T')[0]).isSame(selectedDate, 'day'),
  //       );
  //       setSelectedTimes([...times]);
  //       let name = '';
  //       const temp = {};
  //       times.forEach(async (time) => {
  //         name = moment(new Date(time.time)).subtract(1, 'hours').format('LT');
  //         temp[`time-${name}`] = time;
  //         setTimeSlots({ ...temp });
  //       });
  //     }
  //   }
  // }, [isOpen, selectedDate, availableTimes]);

  // useEffect(() => {
  //   const dataObj = {};
  //   if (availableTimes && availableTimes.length) {
  //     availableTimes.forEach((availableTime) => {
  //       dataObj[moment(availableTime.time).subtract(1, 'h').toISOString()] = {
  //         start: moment(availableTime.time).subtract(1, 'h').toDate(),
  //         end: moment(availableTime.time).subtract(30, 'm').toDate(),
  //         title: `Available`,
  //         id: null,
  //       };
  //     });
  //   }
  //   if (appointments && appointments.length) {
  //     appointments.forEach((appointment) => {
  //       dataObj[moment(appointment.dateTime).toISOString()] = {
  //         start: moment(appointment.dateTime).toDate(),
  //         end: moment(appointment.dateTime).add(30, 'm').toDate(),
  //         title: appointment.patient && appointment.anonymous
  //           ? `Anonymous`
  //           : `Patient: ${appointment.patient && appointment.patient.firstName} ${
  //             appointment.patient && appointment.patient.lastName
  //           }`,
  //         id: appointment.id,
  //       };
  //     });
  //     // setEvents([...Object.values(dataObj)]);
  //   }
  // }, [appointments, availableTimes]);

  const handleEventSelect = ({ id }) => {
    if (id) {
      // history.push(`/doctor/appointment/${id}`);
    }
  };
  const handleSelect = async ({ start }) => {
    setSelectedDate(start);
    setIsOpen(true);
  };

  const handleAvailable = async (e) => {
    const { name, value } = e.target;
    if (timeSlots[name] && timeSlots[name] !== '') {
      if (timeSlots[name].id) {
        setRemoveTimes([...removeTimes, timeSlots[name].id]);
      }
      const filtered = addTimes.filter(
        (item) =>
          item.getTime() !== new Date(`${moment(selectedDate).format('ll')},${value}`).getTime(),
      );
      setAddTimes([...filtered]);
      delete timeSlots[name];
      setTimeSlots({ ...timeSlots });
    } else {
      setAddTimes([...addTimes, new Date(`${moment(selectedDate).format('ll')},${value}`)]);
      setTimeSlots({ ...timeSlots, [name]: value });
    }
    // await dispatch(AvailabilityActions.getAvailableTimes());
  };

  const handleDayChange = async (e) => {
    setSelectedDate('');
    setSelectedDate(e);
    // setTimeSlots({});
  };

  const generateTimes = () => {
    let time = moment().startOf('day').format('LT');

    const times = [
      <div className="radio-block mb-4" key={time}>
        <input
          type="checkbox"
          className={'hidden'}
          id={`time-${time}`}
          name={`time-${time}`}
          onClick={handleAvailable}
          defaultChecked={false}
          value={time}
        />
        <label
          htmlFor={`time-${time}`}
          className={`${
            timeSlots[`time-${time}`] ? 'bg-cta text-white' : 'border border-cta'
          } rounded py-2 px-3 cursor-pointer`}
        >
          {time}
        </label>
      </div>,
    ];

    for (let i = 1; i < 48; i += 1) {
      time = moment()
        .startOf('day')
        .add(30 * i, 'm')
        .format('LT');
      times.push(
        <div className="radio-block mb-4" key={time}>
          <input
            type="checkbox"
            className={'hidden'}
            id={`time-${time}`}
            name={`time-${time}`}
            onClick={handleAvailable}
            defaultChecked={false}
            value={time}
          />
          <label
            htmlFor={`time-${time}`}
            className={`${
              timeSlots[`time-${time}`] ? 'bg-cta text-white' : 'border border-cta'
            } rounded py-2 px-3 cursor-pointer`}
          >
            {time}
          </label>
        </div>,
      );
    }
    return times;
  };

  const saveAvailability = async () => {
    setLoading(true);
    const payload = {};
    if (addTimes.length > 0) {
      payload.insert = addTimes.map(item => moment(item).add(1, 'h'));
    }
    if (removeTimes.length > 0) {
      payload.delete = removeTimes;
    }
    try {
      // await dispatch(DoctorActions.bulkSaveAvailability(payload)).then(() => {
      //   setAddTimes([]);
      //   setRemoveTimes([]);
      //   dispatch(AvailabilityActions.getAvailableTimes()).then(async () => {
      //     setLoading(false);
      //     await Toast.fire({ icon: 'success', title: 'Doctor availability updated.' });
      //   });
      // });
      // setIsOpen(false)
    } catch (e) {
      await Toast.fire({ icon: 'error', title: e.toString() });
    }
  };

  return (
    <section className={`${cx('dashboard')} w-full lg:w-4/5 mx-auto pt-6 px-6 lg:px-0 doctor-calendar`}>
      <PageTitle header={'Doctor Calendar'}/>
      {loading ? <LoaderOverlay/> : null}
      <div className="title-bar flex flex-row justify-between">
        <h2 className={'text-title pl-2'}>Calendar</h2>
      </div>
      <div className={'mt-4 mb-10 doctor-calendar'}>
        <div>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={''}>
              <p className={'text-title border-b border-grey px-6 py-2 font-medium mb-6'}>
                {' '}
                Select Availability
              </p>
              <div className={'px-6 border-b border-grey'}>
                <p className={'text-title mb-2'}>Select Date and Time slot</p>
                <div className={'flex flex-row justify-center'}>
                  <DatePicker
                    onChange={(date) => handleDayChange(date)}
                    name={'availableDate'}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    selected={selectedDate}
                    peekNextMonth
                    inline
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="DD/MM/YY"
                  />
                </div>
              </div>
              <div className={'px-6 pt-2'}>
                <p className={'text-title mb-4'}>Select Time slot</p>
                <div className={'grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center'}>
                  {generateTimes()}
                </div>
              </div>
              <div className="modal-footer p-6 border-t border-grey">
                <div className={'flex flex-row'}>
                  {addTimes.length > 0 || removeTimes.length > 0 ? (
                    <button className={'bg-cta rounded px-3 py-2 mr-2'} onClick={saveAvailability}>
                      <span className={'text-white'}>Update availability</span>
                    </button>
                  ) : null}

                  <button
                    className={'border border-canceled text-canceled rounded px-3 py-2'}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <RBCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="week"
            events={events}
            style={{ minHeight: '80vh' }}
            selectable={true}
            onSelectEvent={handleEventSelect}
            onSelectSlot={handleSelect}
            longPressThreshold={10}
          />
        </div>
      </div>
    </section>
  );
}
