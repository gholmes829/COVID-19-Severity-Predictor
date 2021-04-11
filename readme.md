# COVID-19 Severity Predictor
This is a project started at HackKU 2021 by Daniel Johnson and Grant Holmes.<br>

## Explanation
This project uses artificial neural networks trained on a public CDC COVID-19 dataset to predict the severity of COVID-19 cases.<br>The dataset can be found here: [CDC Case Surveilance Public Use Data](https://data.cdc.gov/Case-Surveillance/COVID-19-Case-Surveillance-Public-Use-Data/vbim-akqf)<br>
There are three neural networks that calculate the probability of death, being sent into the intensive care unit, and being admitted to a hospital.<br>
The neural networks' architecture are 10->10->1, using reLu for activation layers and sigmoid for the output layer.<br>

## How To Use
1. Install Python and React dependencies
2. Navigate to "client" folder in a terminal and run `npm install`
3. Navigate to "client" folder in a terminal and run `npm start`
4. Naviate to "server" folder in a terminal and run `python predServer.py`
