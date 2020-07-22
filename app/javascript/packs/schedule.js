(function(App){ 
  App.schedule = {
    initEventListeners: function() {
      $('.alertSchedule').on('click', function(e) {
        const rowColValues = e.target.id.split('-');
        const col = parseInt(rowColValues[1]);
        const row = parseInt(rowColValues[3]);
        const interval = App.schedule.getWorkScheduleInterval(col, row);
        alert(`Available Time Between Work Orders: ${interval[0]} hour(s) and ${interval[1]} minute(s)`);
      });
    },
    getWorkScheduleInterval: function(col, row) {
      let previousRow = row - 6;
      col = col + 1;
      let previousWorkOrder, nextWorkOrder, previousEndTime, nextStartTime;
      while(true) {
        previousWorkOrder = $(`table tr:nth-child(${previousRow}) td:nth-child(${col})`)
          .text().replace(/\n/g, " ").trim();
        if (previousWorkOrder && (previousWorkOrder.length !== 0)) {
          previousEndTime = App.schedule.getEndTime(previousWorkOrder);
          break;
        }
        if (previousRow <= 1) {
          previousEndTime = [6, 0];
          break;
        }
        previousRow = previousRow - 1;
      };
      nextRow = row - 6 + 1;
      while(true) {
        nextWorkOrder = $(`table tr:nth-child(${nextRow}) td:nth-child(${col})`)
          .text().replace(/\n/g, " ").trim();
        if (nextWorkOrder && (nextWorkOrder.length !== 0)) {
          nextStartTime = nextWorkOrder.trim().match(/[0-2][0-9]:[0-5][0-9]/)[0].split(':');
          nextStartTime = [parseInt(nextStartTime[0]), parseInt(nextStartTime[1])]
          break;
        }
        if (nextRow >= 16) {
          nextStartTime = [16, 0];
          break;
        }
        nextRow = nextRow + 1;
      }
      return App.schedule.getInterval(previousEndTime, nextStartTime);
    },
    getInterval: function(previousEndTime, nextStartTime) {
      let minutes = nextStartTime[1] - previousEndTime[1];
      let hours = nextStartTime[0] - previousEndTime[0];
      if (minutes < 0) {
        hours = hours - 1;
        minutes = minutes + 60;
      }
      return [hours, minutes];
    },
    getEndTime: function(cellText) {
      const startTime = cellText.trim().match(/[0-2][0-9]:[0-5][0-9]/)[0].split(':');
      const duration = parseInt(cellText.split('Duration: ').slice(-1)[0].trim());
      const startTimeHour = parseInt(startTime[0]);
      const startTimeMinute = parseInt(startTime[1]);
      let endTimeHour = parseInt(startTimeHour + duration/60);
      let endTimeMinute = startTimeMinute + (duration % 60);
      if (endTimeMinute == 60) {
        endTimeHour = endTimeHour + 1;
        endTimeMinute = endTimeMinute - 60;
      }
      return [endTimeHour, endTimeMinute];
    }
  }; 
})(window.App = window.App || {});