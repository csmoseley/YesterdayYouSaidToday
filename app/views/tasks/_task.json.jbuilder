json.extract! task, :id, :room, :name, :status, :created_at, :updated_at
json.url task_url(task, format: :json)