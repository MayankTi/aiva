# *_train.py is for offline training, shall not be run during deployment
import os
import shutil
import numpy as np
from ai_lib import preprocess
from sklearn import cross_validation, metrics
import pandas
import tensorflow.contrib.learn as skflow

# method wrap for safety, so training doesn't run when imported by accident
def train():
  # reliable absolute path when this module is called elsewhere
  data_path = preprocess.abspath('data/titanic.csv')
  model_path = preprocess.abspath('models/dnn_titanic')

  # load and clean the dataset
  df = pandas.read_csv(data_path)
  X, y = df[['Sex', 'Age', 'SibSp', 'Fare']], df['Survived']
  # chain: fillna for str with 'NA', num with 0
  X = preprocess.MultiFillna(X)
  # Label Encoder; will always encode str columns into integers
  mle = preprocess.MultiLabelEncoder(columns=[])
  X = mle.fit_transform(X)

  # random-split into train (80%), test data (20%)
  X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2, random_state=42)

  # Build 3 layer DNN with 10, 20, 10 units respecitvely. Allows to be trained continuously
  classifier = skflow.TensorFlowDNNClassifier(
    hidden_units=[10, 20, 10],
    n_classes=2,
    steps=500,
    learning_rate=0.01,
    continue_training=True
  )

  # Fit and save model for deployment.
  classifier.fit(X_train, y_train)
  score = metrics.accuracy_score(y_test, classifier.predict(X_test))
  print('Accuracy: {0:f}'.format(score)) # should be arond 0.74

  # Clean checkpoint folder if exists
  try:
    shutil.rmtree(model_path)
  except OSError:
    pass
  # save the model and label encoder for use
  classifier.save(model_path)
  mle.save(model_path)
  print('Model saved to', model_path)


# auto train first time if models/ does not exist
if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(__file__), 'models'))):
  print("Training dnn_titanic")
  train()

# Uncomment to train it
train()

# # save test data for fast loading in deploy
#data_path = preprocess.abspath('data/titanic.csv')
#df = pandas.read_csv(data_path)
#train, test = cross_validation.train_test_split(df, test_size=0.2, random_state=42)
#test.to_csv('data/titanic_test.csv', index=False)