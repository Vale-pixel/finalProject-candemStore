from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Declare the APP server instance
app = Flask(__name__)
# Enable CORS policies
CORS(app)

df = pd.read_csv('CANDEM.csv')
names = list(df['Name'])

def calcular_promedio_columnas(currentDataframe):
    # Calcular el promedio de cada columna
    promedios = currentDataframe.mean()
    # Filtrar los promedios mayores a 4
    promedios_mayores_a_4 = promedios[promedios > 4]

    # Mostrar los resultados
    return promedios_mayores_a_4.to_dict()
    #print("Promedios mayores a 4:")
    #print(promedios_mayores_a_4)



# GET Endpoint =============================================================================
@app.route("/names", methods=["GET"])
def index():
  global names
  global df
  return jsonify({
    "names": names, 
    "columns": list(df.columns),
    "rows": df.values.tolist()
  })

# POST Endpoint =============================================================================
@app.route('/post_endpoint', methods=['POST'])
def create_data():
    # Get the data from the POST endpoint
    data = request.get_json()
    if not data:
        return (jsonify({'error': 'No data provided'}), 400)
    costumers = data["data"]
    
    costumersInitialValues = [x[1:] for x in costumers]
    costumersValues = [[int(f) for f in x] for x in costumersInitialValues]
    costumersDf = pd.DataFrame(costumersValues)
    columns = list(df.columns)[1:]
    costumersDf.columns = columns
    promedios_mayores_a_4 = calcular_promedio_columnas(costumersDf)
    print(type(promedios_mayores_a_4))
    #print(costumersDf)
    #print(costumersDf, "??????????????????")
    return (jsonify({'response': 'ok all good', 'data': promedios_mayores_a_4}), 201)

# Execute the app instance
# The app will run locally in: http://localhost:5001/ after execution
if __name__ == "__main__":
  app.run(debug=True, port=5001)