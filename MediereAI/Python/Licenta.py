#!/usr/bin/env python
# coding: utf-8

# In[1]:


#pachete
import sys
import pyodbc
import json
import numpy as np
import spacy
#torch
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

from sklearn import svm
import spacy
import en_core_web_trf

import textblob
from textblob import TextBlob
#natural language
import nltk
nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('punkt')
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer


# In[2]:


#clase suport

class AISet(Dataset):
    def __init__(self):
        self.sample_nr = len(train_x)
        self.data_x=train_x
        self.data_y=train_y
        
    def __getitem__(self,i):
        return self.data_x[i], self.data_y[i]
    
    def __len__(self):
        return self.sample_nr

class ReteaNeuronala(nn.Module):
    def __init__(self, dim_input, dim_hidden, clase):
        super(ReteaNeuronala, self).__init__()
        self.layer1=nn.Linear(dim_input, dim_hidden)
        self.layer2=nn.Linear(dim_hidden, dim_hidden)
        self.layer3=nn.Linear(dim_hidden, clase)  
        self.relu = nn.ReLU()
    
    #parcurgere layere retea
    def forward(self, a):
        rez = self.layer1(a)
        rez = self.relu(rez)
        rez = self.layer2(rez)
        rez = self.relu(rez)
        rez = self.layer3(rez)
        rez = self.relu(rez)
        return rez


# In[3]:


#TRAINING

lemmatizer = WordNetLemmatizer()

with open('C:/Users/alexa/Source/Repos/MediereAI/MediereAI/Python/training.json', 'r') as f:
    training=json.load(f)

all_array = []
tags = []
training_xy = []
for train in training['training']:
    tag=train['tag']
    tags.append(tag)
    for q in train['Question']:
        pat = word_tokenize(q)
        all_array.extend(pat)
        training_xy.append((pat, tag))
        
ignore=['?', ',', '.', '!'] #stergem semnele de punctuatie
all_array =[lemmatizer.lemmatize(w, pos='v') for w in all_array if w not in ignore]
all_array = sorted(set(all_array))
tags = sorted(set(tags))

#construire date training
train_x=[]
train_y=[]

for (fraza, tag) in training_xy:
    fraza=[lemmatizer.lemmatize(w, pos='v') for w in fraza]
    bow=np.zeros(len(all_array), dtype=np.float32)
    for index, w in enumerate(all_array):
        if w in fraza:
            bow[index]=1.0
    train_x.append(bow)
    train_y.append(tags.index(tag))

train_x=np.array(train_x)
train_y=np.array(train_y)

#model pyTorch
batch_size=8 #deocamdata    
dataset= AISet()
train_loader= DataLoader(dataset=dataset, batch_size=batch_size, shuffle=True, num_workers=0)

#aplicare retea neuronala
dim_hidden=8 
aparatura = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = ReteaNeuronala(len(all_array), dim_hidden, len(tags)).to(aparatura)

#optimizare (nu stiu ce face, dar merge)
learning_rate=0.001
generatii=1000
criteriu = nn.CrossEntropyLoss()
optimizare = torch.optim.Adam(model.parameters(), lr=learning_rate)

for i in range(generatii):
    for(cuv, etichete) in train_loader:
        cuv = cuv.to(aparatura)
        etichete = etichete.to(dtype=torch.long).to(aparatura)
        
        outputs = model(cuv)
        pierdere = criteriu(outputs, etichete)
        
        optimizare.zero_grad()
        pierdere.backward()
        optimizare.step()
    

data={
    "stare_model": model.state_dict(),
    "dim_input": len(all_array),
    "dim_output": len(tags),
    "dim_hidden": dim_hidden,
    "all_array": all_array,
    "tags": tags
}

#salvare model antrenat
torch.save(data, "data.pth")





