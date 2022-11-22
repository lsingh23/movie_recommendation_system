from flask import Flask, request
import streamlit as st
import pickle
import pandas as pd
import requests
import time

import numpy as np
import pandas as pd
 
app = Flask(__name__)


movies_dict = pickle.load(open('movie_dict.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies = pd.DataFrame(movies_dict)

# with pd.option_context('display.max_rows', None, 'display.max_columns', None):
#     print(movies.head())

@app.route('/recommend', methods=['POST', 'GET'])
def setMovieName():
    movie_title = ''
    recommended_movies = []
    if request.method == 'POST':
        movie_title = request.data
        movie_title = movie_title.decode('utf-8')
    else: 
        movie_title = "Avatar"
    recommended_movies  = []
    recommended_movies = recommend(str(movie_title))
    return recommended_movies

@app.route('/test/<name>', methods=['POST', 'GET'])
def test(name):
    print(name)
    return recommend(str(name))

def recommend(movie_title):
    movie_index = movies[movies['title'] == movie_title].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    recommended_movies = []
    recommended_movies_posters = []
    for i in movies_list:
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movies.insert(i[0] , (movies.iloc[i[0]].title, fetch_poster(movie_id)))
        # recommended_movies_posters.append(fetch_poster(movie_id))
        # recommended_movies.append(movies.iloc[i[0]].title)
    return recommended_movies

def fetch_poster(movie_id):
    response = requests.get('https://api.themoviedb.org/3/movie/{}?api_key=320686df03bbd535fb7882440a88516c&language=en-US'.format(movie_id))
    data = response.json()
    print(data['poster_path'])
    return str("https://image.tmdb.org/t/p/w500/" + data['poster_path'])

# st.title('Movie Recommender System')
# selected_movie_name = st.selectbox('Select: ', movies['title'].values)
# if st.button('Recommend'):
#     names, posters = recommend(selected_movie_name)
#     col1, col2, col3, col4, col5 = st.columns(5)
#     with col1:
#         st.text(names[0])
#         st.image(posters[0])
#     with col2:
#         st.text(names[1])
#         st.image(posters[1])
#     with col3:
#         st.text(names[2])
#         st.image(posters[2])
#     with col4:
#         st.text(names[3])
#         st.image(posters[3])
#     with col5:
#         st.text(names[4])
#         st.image(posters[4])

if __name__ == "__main__":
    app.run(debug=True)
