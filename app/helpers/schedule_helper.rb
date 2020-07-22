module ScheduleHelper
  def order_in_cell?(work_orders, hour, technician_id)
    first_work_order = work_orders.first
    work_hour = first_work_order.time.strftime('%H').to_i
    in_interval = (work_hour >= hour) && (work_hour < hour + 1)
    return true if in_interval && (first_work_order.technician_id == technician_id)

    false
  end

  def rowspan_value(duration)
    return 1 if (duration/60).zero?

    duration/60
  end

  def array_of_rowspan_with_value
    array = []
    (6..16).each do |_i|
      array.push(@technicians.count)
    end
    array
  end

  def get_rowspan(rowspan_array, duration, hour)
    rowspan = rowspan_value(duration)
    return rowspan if rowspan_value(duration) <= 1

    row_position = hour - 6
    (1..rowspan).each do |_i|
      rowspan_array[row_position] = rowspan_array[row_position] - 1
    end
  end
end
