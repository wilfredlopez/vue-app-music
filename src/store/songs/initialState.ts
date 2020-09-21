import { AppContextState, Song } from './songReducer'
import { Storage } from '../Storage'

const initialState: AppContextState = {
  dispatch: () => {},
  playing: {
    index: 0,
    progress: 27000,
    isPlaying: false,
    currentAudioTime: '0:00',
    percentPlayed: 0,
  },
  auth: {
    user: null,
  },
  user: {
    recentTracks: [],
    favTracks: [],
  },
  ui: {
    playerOpen: false,
  },
  music: {
    tracks: [
      {
        id: '5de11a305a58b41df485e98a',
        name: 'Ozuna - Dificil Olvidar',
        audioUrl:
          'https://res.cloudinary.com/wlopez/video/upload/v1575033391/vapemusic2/2019/10/Ozuna%20%E2%80%93%20Dif%C3%ADcil%20Olvidar.mp3/gkxjvzeulzhoy9l0mzz8.mp3',
        imageUrl:
          'https://res.cloudinary.com/wlopez/image/upload/v1575033390/vapemusic2/2019/10/Ozuna%20-%20Niviru%20Cover.jpg/Ozuna_-_Niviru_Cover_z7mtjj.jpg',
        artist: 'Ozuna',
        title: 'Dificil De Olvidar',
        artistList: [],
        genre: 'Reggaeton',
      },
      {
        id: '5e514f8e47f6b853d0439a89',
        name: 'Reik Ft. Farruko &  Camilo - Si Me Dices Que Si',
        audioUrl:
          'https://res.cloudinary.com/wlopez/video/upload/v1582387085/vapemusic2/2020/1/Farruko_-_Si_Me_Dices_Que_Si.mp3',
        imageUrl:
          'https://res.cloudinary.com/wlopez/image/upload/v1582385647/vapemusic2/2020/1/Si_Me_Dices_Que_Si.jpg',
        artist: 'Reik Ft. Farruko &  Camilo',
        artistList: [],
        genre: 'Reggaeton',
        title: 'Si Me Dices Que Si',
      },
      {
        album: '',
        artist: 'Manuel Turizo',
        artistList: ['manuel turizo'],
        audioUrl:
          'https://res.cloudinary.com/wlopez/video/upload/v1566749960/pxmusic/music/2019/7/Manuel_Turizo_-_No_Me_Conoce_oe6vjr.mp3',
        createdAt: '2020-05-03T02:39:02.267Z',
        genre: 'Reggaeton',
        id: '5eae2f39dac2a700123365fd',
        imageUrl:
          'https://res.cloudinary.com/wlopez/image/upload/v1566749960/pxmusic/images/2019/7/260Manuel_Turizo_-_No_Me_Conoce_czh0no.jpg',
        name: 'Manuel Turizo - No Me Conoce',
        promoted: false,
        title: 'No Me Conoce',
        updatedAt: '2020-05-03T02:39:02.267Z',
        viewCount: 12,
        __typename: 'Song',
      },
      {
        album: 'Farruko',
        artist: 'Farruko',
        artistList: ['farruko'],
        audioUrl:
          'https://res.cloudinary.com/wlopez/video/upload/v1566749601/pxmusic/music/2019/7/Farruko_-_Que_Hay_de_Malo_oqjfuh.mp3',
        createdAt: '2020-05-03T02:39:02.267Z',
        genre: 'Reggaeton',
        id: '5eae2f39dac2a700123365dd',
        imageUrl:
          'https://res.cloudinary.com/wlopez/image/upload/v1566749600/pxmusic/images/2019/7/721Farruko_-_Que_Hay_de_Malo_lgheuk.jpg',
        name: 'Farruko - Qué Hay De Malo',
        promoted: false,
        title: 'Qué Hay De Malo',
        updatedAt: '2020-05-03T02:39:02.267Z',
        viewCount: 7,
        __typename: 'Song',
      },
      {
        album:
          'Six Feet Apart - Luke Combs (Unreleased, New Song) (Performed at the Grand Ole Opry)',
        artist: 'Luke Combs',
        artistList: ['luke combs'],
        audioUrl:
          'https://res.cloudinary.com/wlopez/video/upload/v1588539413/vapemusic2/2020/4/Six_Feet_Apart_-_Luke_Combs_Unreleased.mp3',
        createdAt: '2020-05-03T20:56:54.473Z',
        genre: 'pop-r&b',
        id: '5eaf30166eccb80012ac804e',
        imageUrl:
          'https://res.cloudinary.com/wlopez/image/upload/v1588538906/vapemusic2/2020/4/Six_Feet_Apart_Unreleased.jpg',
        name: 'Luke Combs - Six Feet Apart (Unreleased)',
        promoted: true,
        title: 'Six Feet Apart (Unreleased)',
        updatedAt: '2020-05-03T20:56:54.473Z',
        viewCount: 6,
      },
    ],
    hotTracks: [
      '5eae2f39dac2a700123365dd',
      '5eaf30166eccb80012ac804e',
      '5eae2f39dac2a700123365fd',
      '5e514f8e47f6b853d0439a89',
    ],
    newTracks: [
      '5eae2f39dac2a700123365dd',
      '5eaf30166eccb80012ac804e',
      '5eae2f39dac2a700123365fd',
      '5e514f8e47f6b853d0439a89',
    ],
  },
}
export const FAV_TRACKS_LOCAL_STORAGE_KEY = 'USER-FAV-TRACKS-VUE'
export const RECENT_TRACKS_LOCAL_STORAGE_KEY = 'USER-RECENT-TRACKS-VUE'

async function getLocalStorageTracks() {
  let favTracks: Song[] = []
  let recentTracks: Song[] = []
  const savedFavs = await Storage.getObject<Song[]>({
    key: FAV_TRACKS_LOCAL_STORAGE_KEY,
  })
  const savedRecent = await Storage.getObject<Song[]>({
    key: RECENT_TRACKS_LOCAL_STORAGE_KEY,
  })
  if (savedFavs && savedFavs.length > 0) {
    favTracks = savedFavs
  }
  if (savedRecent && savedRecent.length > 0) {
    recentTracks = savedRecent
  }
  return {
    favTracks,
    recentTracks,
  }
}

export function setLocalStorageRecentTracks(tracks: Song[]) {
  Storage.setObject({
    key: RECENT_TRACKS_LOCAL_STORAGE_KEY,
    value: JSON.stringify(tracks),
  })
}

export function setLocalStorageFaveTracks(tracks: Song[]) {
  Storage.setObject({
    key: FAV_TRACKS_LOCAL_STORAGE_KEY,
    value: JSON.stringify(tracks),
  })
}

getLocalStorageTracks().then(({ favTracks, recentTracks }) => {
  if (favTracks) {
    initialState.user.favTracks = favTracks
  }
  if (recentTracks) {
    initialState.user.recentTracks = recentTracks
  }
})

export { initialState }
