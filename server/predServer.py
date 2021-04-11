from flask import Flask, request, jsonify, send_from_directory
import uuid
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)


model = load_model(os.path.join("./model/","covid_model.h5"))

@app.route('/api/covid', methods=['POST'])
def predict():
    print(request)
    content = request.json
    errors = []
    if len(errors) < 1:
        x = np.zeros( (1,10) )
        x[0,0] = content['sex']
        x[0,1] = content['age_group']
        x[0,2] = content['medcond_yn']
        x[0,3] = content['AmIn_NH']
        x[0,4] = content['As_NH']
        x[0,5] = content['Bl_NH']
        x[0,6] = content['HS']
        x[0,7] = content['Ot_NH']
        x[0,8] = content['PI_NH']
        x[0,9] = content['Wh_NH']
        pred = model.predict(x)
        hosp = float(pred[0][0])
        icu = float(pred[0][1])
        death = float(pred[0][2])
        response = {"id":str(uuid.uuid4()),"hosp":hosp,"icu":icu,"death":death}
    else:
        response = {"id":str(uuid.uuid4()),"errors":errors}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host= '127.0.0.1',debug=True)