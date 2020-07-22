class ScheduleController < ApplicationController
  def index
    @technicians = Technician.all
    @work_orders = WorkOrder.order(time: 'asc', technician_id: 'asc').includes(:location)
  end
end
