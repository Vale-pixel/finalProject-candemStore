from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# Declare the APP server instance
app = Flask(__name__)
# Enable CORS policies
CORS(app)

df = pd.read_csv('CANDEM.csv')
names = list(df['Name'])

beer = pd.read_csv('productos.csv')
products = list(beer['productos'])

def calcular_promedio_columnas(currentDataframe):
    # Calcular el promedio de cada columna
    promedios = currentDataframe.mean()

    # Mostrar los resultados
    return promedios.to_dict()
    #print("Promedios mayores a 4:")
    #print(promedios_mayores_a_4)

def euclidean_distance(point1, point2):
    return np.sqrt(np.sum((point1 - point2) ** 2))

# def knn(data, proto_beer, k=3):
#     distances = [(index, euclidean_distance(row, proto_beer)) for index, row in data.iterrows()]
#     distances.sort(key=lambda x: x[1])
#     return [products[distances[i][0]] for i in range(k)]

# def knn(data,proto_beer, k=3):
#     distances = []

#     for index, row in data.iterrows():
#         distance = euclidean_distance(row, proto_beer)
#         distances.append((index, distance))

#     distances.sort(key=lambda x: x[1])
#     print(distances)
#     return [products[distances[i][0]] for i in range(k)]

# GET Endpoint =============================================================================
@app.route("/names", methods=["GET"])
def index():
  global names
  global df
  return jsonify({
    "names": names,
    "columns": list(df.columns),
    "rows": df.values.tolist(),
  })

# GET Endpoint =============================================================================
@app.route("/products", methods=["GET"])
def show_beers():
  global products
  global beer
  return jsonify({
    "products": products,
    "rows": beer.values.tolist(),
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
    protoPersona = calcular_promedio_columnas(costumersDf)

    # print(recommendations = knn(beer, promedios_mayores_a_4, k=3))

    print(type(promedios_mayores_a_4))
    #print(costumersDf)
    #print(costumersDf, "??????????????????")
    return (jsonify({'response': 'ok all good', 'data': promedios_mayores_a_4}), 201)

# Execute the app instance
# The app will run locally in: http://localhost:5001/ after execution
if __name__ == "__main__":
  app.run(debug=True, port=5001)