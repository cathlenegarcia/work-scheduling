# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'
require 'csv'

Rails.application.load_tasks

desc 'Import CSV files into ActiveRecord tables'
namespace :import do
  task :technicians, [:filename] => :environment do |_, args|
    CSV.foreach(args[:filename], headers: true, encoding: 'bom|utf-8') do |row|
      row = row.to_h.with_indifferent_access
      technician = Technician.new
      technician.id = row[:id]
      technician.name = row[:name]
      technician.save
    end
  end

  task :locations, [:filename] => :environment do |_, args|
    CSV.foreach(args[:filename], headers: true, encoding: 'bom|utf-8') do |row|
      row = row.to_h.with_indifferent_access
      location = Location.new
      location.id = row[:id]
      location.name = row[:name]
      location.city = row[:city]
      location.save
    end
  end

  task :work_orders, [:filename] => :environment do |_, args|
    CSV.foreach(args[:filename], headers: true, encoding: 'bom|utf-8') do |row|
      row = row.to_h.with_indifferent_access
      work_order = WorkOrder.new
      work_order.id = row[:id]
      work_order.technician_id = row[:technician_id]
      work_order.location_id = row[:location_id]
      work_order.time = DateTime.strptime(row[:time], '%m/%d/%y %I:%M')
      work_order.duration = row[:duration]
      work_order.price = row[:price]
      work_order.save!
    end
  end
end
