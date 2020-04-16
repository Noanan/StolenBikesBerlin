
for %%f in (%cd%\populate_server\officer*.*) do (

curl -X POST -H "Content-Type: application/json" -d @%%f http://localhost:3000/officers


)


for %%f in (%cd%\populate_server\bike*.*) do (

curl -X POST -H "Content-Type: application/json" -d @%%f http://localhost:3000/bikes


)





