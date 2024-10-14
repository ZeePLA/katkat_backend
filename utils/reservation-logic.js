/* class 
export class HairdresserAppointment {
  constructor(
    userId,
    shopName,
    hairdresserId,
    services,
    appointmentDate,
    appointmentStartTime,
    appointmentEndTime
  ) {
    this.userId = userId;
    this.shopName = shopName;
    this.hairdresserId = hairdresserId;
    this.appointmentDate = appointmentDate;
    this.appointmentStartTime = appointmentStartTime;
    this.appointmentEndTime = appointmentEndTime;
    this.services = services;
  }

  // Constants
  static #allTimes = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
  ];

  static #availableTimes = [];

  // Methods
  static formatDate() {
    const date = new Date(`${this.appointmentDate}T${this.appointmentStartTime}:00`);
    // adjusting time for UTC+03:00
    date.setHours(date.getHours() + 3);
    // ISOfy and remove miliseconds
    const toISO = date.toISOString().split(".")[0];
    // append the fixed +03:00 offset at the end
    return `${toISO}+03:00`;
  }

  getAppointmentDetails() {
    return `Appointment at ${this.shopName} for ${this.services} reserved between ${this.appointmentStartTime} - ${this.appointmentEndTime}`;
  }
}
*/

//DATE FUNCTIONALITY
function constructDate(appointmentDate, appointmentStartTime) {
  //appointmentDate format: "2024-11-14"
  //appointmentTime format: "15:00"
  const date = new Date(`${appointmentDate}T${appointmentStartTime}:00`);
  // adjusting time for UTC+03:00
  date.setHours(date.getHours() + 3);
  // ISOfy and remove miliseconds
  const toISO = date.toISOString().split(".")[0];
  // append the fixed +03:00 offset at the end
  return `${toISO}+03:00`; // Output format: "2024-11-14T15:00:00+03:00"
}

function deconstructDate(isoDate) {
  //isoDate format: "2024-11-14T15:00:00+03:00"
  const date = isoDate.slice(0, 10);
  const time = isoDate.slice(11, 16);
  return [date, time]; // Output format: [ '2024-11-14', '15:00' ]
}

function createTimeSlot() {
  return { status: "available", userId: "", services: [] };
}
function createTimeSheet(startHour, endHour, intervalMinutes) {
  const timeSheet = {};
  const start = new Date();
  start.setHours(startHour, 0, 0, 0);
  const end = new Date();
  end.setHours(endHour, 0, 0, 0);

  for (let time = start; time <= end; time.setMinutes(time.getMinutes() + intervalMinutes)) {
    const timeString = time.toTimeString().slice(0, 5); // "HH:MM"
    timeSheet[timeString] = createTimeSlot();
  }
  return timeSheet;
}

const STATUS = {
  AVAILABLE: "available",
  BOOKED: "booked",
  PENDING: "pending",
};

const timeSheet = createTimeSheet(7, 22, 15);
console.log(timeSheet);

function isAvailable(timeSheet, time) {
  if (timeSheet[time].status === STATUS.AVAILABLE) {
    return true;
  }
}

function bookAppointment(timeSheet, time, userId, services) {
  if (isAvailable(timeSheet, time)) {
    // Logic to book appointment
    timeSheet[time].status = STATUS.BOOKED;
    timeSheet[time].userId = userId;
    timeSheet[time].services = services;
    return true;
  } else {
    throw new Error(`Time slot ${time} is already booked.`);
  }
}

function cancelAppointment(timeSheet, time) {
  if (timeSheet[time].status === STATUS.BOOKED) {
    timeSheet[time].status = STATUS.AVAILABLE;
    timeSheet[time].userId = "";
    timeSheet[time].services = [];
    return true;
  }
  return false;
}

const success = bookAppointment(timeSheet, "21:15", "user123", ["Haircut", "Shampoo"]);
if (success) {
  console.log("Appointment booked successfully.");
  console.log(timeSheet["21:15"]);
} else {
  console.log("Failed to book appointment.");
}

cancelAppointment(timeSheet, "21:15");
console.log(timeSheet["21:15"]);

export { constructDate, deconstructDate };
