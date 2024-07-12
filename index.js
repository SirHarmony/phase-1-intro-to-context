// Your code here
function createEmployeeRecord(arrayOfRecords) {
  return {
    firstName: arrayOfRecords[0],
    familyName: arrayOfRecords[1],
    title: arrayOfRecords[2],
    payPerHour: arrayOfRecords[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(nestedArrayOfRecords) {
  return nestedArrayOfRecords.map((arrayOfRecords, i) =>
    createEmployeeRecord(arrayOfRecords)
  );
}

function createTimeInEvent(employeeRecordObject, timeStamp) {
  const newEmployeeRecordObject = Object.assign(employeeRecordObject);

  const hour = +timeStamp.split(" ")[1];
  const date = timeStamp.split(" ")[0];

  newEmployeeRecordObject.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date,
  });

  return newEmployeeRecordObject;
}

// createTimeInEvent(
//   {
//     firstName: "Harmony",
//     familyName: "Adero",
//     title: "Sir",
//     payPerHour: 2500,
//     timeInEvents: [],
//     timeOutEvents: [],
//   },
//   "YYYY-MM-DD 1800"
// );

function createTimeOutEvent(employeeRecordObject, timeStamp) {
  const newEmployeeRecordObject = Object.assign(employeeRecordObject);

  const hour = +timeStamp.split(" ")[1];
  const date = timeStamp.split(" ")[0];

  newEmployeeRecordObject.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date,
  });

  return newEmployeeRecordObject;
}

function hoursWorkedOnDate(employeeRecordObject, date) {
  const hoursWorked = Math.abs(
    (employeeRecordObject.timeOutEvents[0].hour -
      employeeRecordObject.timeInEvents[0].hour) /
      100
  );
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecordObject, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecordObject, date);
  const payOwed = hoursWorked * employeeRecordObject.payPerHour;
  return payOwed;
}

// wagesEarnedOnDate(
//   {
//     firstName: "Harmony",
//     familyName: "Adero",
//     title: "Sir",
//     payPerHour: 2500,
//     timeInEvents: [
//       {
//         type: "TimeOut",
//         hour: 2300,
//         date: "YYYY-MM-DD",
//       },
//     ],
//     timeOutEvents: [
//       {
//         type: "TimeOut",
//         hour: 1800,
//         date: "YYYY-MM-DD",
//       },
//     ],
//   },
//   "YYYY-MM-DD 1800"
// );

function allWagesFor(employeeRecordObject) {
  let totalHours = 0;

  employeeRecordObject.timeOutEvents.map((object, i) => {
    totalHours += Math.abs(
      (employeeRecordObject.timeInEvents[i].hour - object.hour) / 100
    );
  });
  const totalWage = totalHours * employeeRecordObject.payPerHour;
  console.log(totalWage);
  return totalWage;
}

// allWagesFor({
//   firstName: "Harmony",
//   familyName: "Adero",
//   title: "Sir",
//   payPerHour: 2500,
//   timeInEvents: [
//     {
//       type: "TimeOut",
//       hour: 2300,
//       date: "YYYY-MM-DD",
//     },
//     {
//       type: "TimeOut",
//       hour: 1000,
//       date: "YYYY-MM-DD",
//     },
//     {
//       type: "TimeOut",
//       hour: 700,
//       date: "YYYY-MM-DD",
//     },
//   ],
//   timeOutEvents: [
//     {
//       type: "TimeOut",
//       hour: 1800,
//       date: "YYYY-MM-DD",
//     },
//     {
//       type: "TimeOut",
//       hour: 2200,
//       date: "YYYY-MM-DD",
//     },
//     {
//       type: "TimeOut",
//       hour: 1000,
//       date: "YYYY-MM-DD",
//     },
//   ],
// });

function calculatePayroll(arrayOfRecords) {
  let totalPayRoll = 0;
  arrayOfRecords.map((employeeRecordObject) => {
    totalPayRoll += allWagesFor(employeeRecordObject);
  });

  return totalPayRoll;
}
