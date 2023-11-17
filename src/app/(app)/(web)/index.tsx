import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import TinderCard from 'react-tinder-card'
import { Text } from '../../../components/Themed';
import axios from 'axios';

export default function TabTwoScreen() {

  const [movies, setMovies] = React.useState();
  const [page, setPage] = React.useState();

  let moviesState = movies // This fixes issues with updating movies state forcing it to use the current state and not the state that was active when the card was created.
  const alreadyRemoved = []
  const [lastDirection, setLastDirection] = useState()
  const childRefs = useMemo(() => Array(movies?.length).fill(0).map(i => React.createRef()), [])

  React.useEffect(() => {
    setPage(0)
    getMovies();
  }, [page])

  // Demo URL : 'https://jsonplaceholder.typicode.com/photos'

  // Chunk Function
  // const chunk = (data: string | any[]) => {
  //   const chunkSize = 10;
  //   let chunkedMovies = []
  //   for (let i = 0; i < data.length; i += chunkSize) {
  //     const chunk = res.data.slice(i, i + chunkSize);
  //     chunkedMovies.push(chunk)
  //   }
  //   return chunkedMovies;
  // }

  // Streaming service api
  // const options = {
  //   method: 'GET',
  //   url: 'https://streaming-availability.p.rapidapi.com/search/filters',
  //   params: {
  //     services: 'netflix',
  //     country: 'us',
  //     output_language: 'en',
  //     order_by: 'original_title',
  //     genres_relation: 'and',
  //     show_type: 'all'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
  //     'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
  //   }
  // };

  // Random Movie API
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/random',
    params: {
      list: 'most_pop_movies'
    },
    headers: {
      'X-RapidAPI-Key': 'HIYN33YPwamshwr94ZobUkgsCp4yp1AU8X8jsnG6vg7P62zjSj',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  // API DATA Refs
  // let movieKey = movies[page].movie.id
  // let movieTitle = movies.movie.titleText.text
  // let movieImageUrl  = movies.movie.primaryImage.url


  const getMovies = () => {
    return axios
      .request(options)
      .then((res: { data: { results: React.SetStateAction<undefined>; }; }) => {
        console.log(res.data.results);
        setMovies(res.data.results)
      })
      .catch((err: any) => console.log(err))
  }




  const swiped = (direction: string | React.SetStateAction<undefined>, nameToDelete: string, index: string | number) => {
    console.log('removing: ' + nameToDelete + ' to the ' + direction + ', page is last index: ' + index)
    if (index === 0) {
      setPage(page + 1)
    }
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name: any) => {
    // console.log(name + ' left the screen!')
    moviesState = moviesState.filter((movie: { title: any; }) => movie.title !== name)
    setMovies(moviesState)
  }



  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.cardContainer}>
          {movies ?
            <>
              {movies?.map((movie: { id: any; titleText: { text: string | undefined; }; primaryImage: { url: any; caption: { plainText: string | undefined; }; }; }, index: string | number) =>

                <TinderCard ref={childRefs[index]} key={movie.id} onSwipe={(dir: any) => swiped(dir, movie.titleText.text, index)} onCardLeftScreen={() => outOfFrame(movie.titleText.text)} className="pressable">
                  <TouchableOpacity onPress={() => Alert.alert('You')}>
                    <View style={styles.card}>
                      <ImageBackground style={styles.cardImage} source={{ uri: movie?.primaryImage?.url }}>
                        <Text style={styles.cardTitle}>{movie.titleText.text}</Text>
                      </ImageBackground>
                      <View style={styles.bottomView}>
                        <Text style={styles.infoText}>{movie.primaryImage?.caption.plainText}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </TinderCard>
              )}
            </>
            : <ActivityIndicator />}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    height: '100%'
  },
  cardContainer: {
    width: '90%',
    maxWidth: 400,
    height: 500,
    flexDirection: 'column',
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    height: 500,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    // resizeMode: 'cover',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: 'black'
  },
  textBackground: {
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    padding: 5,
    position: 'absolute',
  },
  cardTitle: {
    position: 'absolute',
    bottom: 50,
    margin: 10,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20,
    borderRadius: 4,
    textDecorationLine: "underline",
  },
  infoText: {
    color: 'black'
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    borderRadius: 20
  },
});