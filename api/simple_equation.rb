require 'sinatra'
require 'json'
require 'rack/cors'
require 'prawn'
require 'prawn/table'

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

get '/generate_equations' do
  content_type 'application/pdf'
  attachment 'equations.pdf'

  number_of_equations = params[:count].to_i
  equations = generate_equations(number_of_equations)

  pdf = Prawn::Document.new do
    text "Generated Equations", size: 30, style: :bold
    move_down 20

    table_data = []
    equations.each_slice(6) do |slice|
      table_data << slice
    end

    table(table_data, cell_style: { borders: [] }) do 
      cells.padding = 12
      cells.align = :center
      cells.valign = :center
      row(0).font_style = :bold
    end
  end
  pdf.render
end

def generate_equations(count)
  operators = ['+', '-', 'x', ':']
  equations = []
  count.times do
    a = rand(0..10)
    b = rand(0..10)
    operator = operators.sample

    equations << "#{a} #{operator} #{b} = ..."
  end
  equations
end