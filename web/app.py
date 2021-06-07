from flask import Flask, request, render_template, jsonify
import json
import requests
import ast

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/process', methods=['POST'])
def ret_positive():
    if request.method == "POST":
        req = request.get_json(silent=True)
        
        text = req['text']
        option = req['option']
        num_samples = req['num_samples']
        length = req['length']

        headers = {'Content-Type': 'application/json; chearset=utf-8'}
        
        # preprocess
        data = {'context': text}
        res = requests.post('https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/preprocess', headers=headers, data=json.dumps(data))
        processed = res.text

        processed = str(processed[2:-3])
        processed = list(map(int, processed.split(',')))

        # predict
        data = {'text': processed, 'num_samples': num_samples, 'length': length}
        if option == "p":
            res = requests.post('https://train-39bbuxt6erfsjix19q6z-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-medium-finetune', headers=headers, data=json.dumps(data))
        elif option == "n":
            res = requests.post('https://train-8u6hh0276k3qodyzsvax-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-en-medium-finetune', headers=headers, data=json.dumps(data))
        nested = res.text
        nested = ast.literal_eval(nested)

        # postprocess
        res = requests.post('https://main-gpt-2-server-gkswjdzz.endpoint.ainize.ai/postprocess', headers=headers, data=json.dumps(nested))
        data = ast.literal_eval(res.text)

        response = []
        for i in data:
            response.append(data[i]['text'])
        
        return jsonify(response)
        
if __name__ == '__main__':
    app.run()
