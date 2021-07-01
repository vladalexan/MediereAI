#!/usr/bin/env python
# coding: utf-8

# In[1]:


#pachete
import sys
  
import random
import pyodbc
import numpy as np
from sklearn import svm
import spacy
import en_core_web_trf
import json
import torch
import textblob
from textblob import TextBlob
from Licenta import ReteaNeuronala
from nltk.tokenize import word_tokenize
from nltk import tokenize
from nltk.stem import WordNetLemmatizer


# In[2]:


#incarcare date pytorch pentru bot-ul antrenat
with open('C:/Users/alexa/Source/Repos/MediereAI/MediereAI/Python/training.json', 'r') as file:
    training=json.load(file)

data=torch.load("data.pth")

#preluare date din model antrenat
stare_model=data["stare_model"]
dim_input=data["dim_input"]
dim_hidden=data["dim_hidden"]
dim_output=data["dim_output"]
all_array=data["all_array"]
tags=data["tags"]

aparatura = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model=ReteaNeuronala(dim_input, dim_hidden, dim_output).to(aparatura)
model.load_state_dict(stare_model)
model.eval()


# In[3]:


#obtinere text 
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-FQ76HOP\SQLEXPRESS;'
                      'Database=MediereAI;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
query='SELECT Descriere FROM Medieri WHERE Id='+ str(sys.argv[1])
cursor.execute(query)

for row in cursor:
    test_x=["".join(row)]

#separare fraze intr-un array
fraze=tokenize.sent_tokenize(test_x[0])


# In[4]:


#prelucrare text
raspuns=''
for fraza in fraze:
    #corectare+sentiment
    tb_phrase = TextBlob(fraza)
    tb_phrase=tb_phrase.correct()
    sent=tb_phrase.sentiment
    text=str(tb_phrase)

    #procesare
    nlp = en_core_web_trf.load()
    text=nlp(text)

    #tokenize+lemmatize
    lemmatizer = WordNetLemmatizer()
    words=word_tokenize(str(text))
    lemmed_words=[]
    for word in words:
        lemmed_words.append(lemmatizer.lemmatize(word.lower(), pos='v'))
    " ".join(lemmed_words)

    #bag of words
    bow=np.zeros(len(all_array), dtype=np.float32)
    for index, w in enumerate(all_array):
        if w in lemmed_words:
            bow[index]=1.0

    bow=bow.reshape(1, bow.shape[0])
    bow=torch.from_numpy(bow).to(aparatura)

    output=model(bow)
    _, predictie=torch.max(output, dim=1)

    tag_pred=tags[predictie.item()]

    probabilitati = torch.softmax(output, dim=1)
    prob1=probabilitati[0][predictie.item()]

    if ((prob1.item()>=0.3) and (sent.polarity>=-0.5)):
        for sentiment in training["training"]:
            if tag_pred == sentiment["tag"]:
                raspuns+=random.choice(sentiment["Answer"])
    else:
        raspuns="Error. Try contacting a human advisor."
    
print(raspuns)




