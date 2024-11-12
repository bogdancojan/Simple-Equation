require 'sinatra'
require 'json'
require 'rack/cors'

use Rack::Cors do
  allow do
    origins 'http://127.0.0.1:8080'
    resource '*',
      headers: :any,
      methods: [:get, :post, :options]
  end
end

get '/generate_equation' do
  operators = ['+', '-', '*', '/']
  num1 = rand(0..10)
  num2 = rand(0..10)
  operator = operators.sample

  equation = "#{num1} #{operator} #{num2} = ?"
  { equation: equation }.to_json
end
