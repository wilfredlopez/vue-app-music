import { assertNever, deepCopy } from '@wilfredlopez/react-utils'
import {
  setLocalStorageFaveTracks,
  setLocalStorageRecentTracks,
} from './initialState'

export type Maybe<T> = T | null
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  Upload: any
}

export type Song = {
  __typename?: 'Song'
  id: Scalars['ID']
  artist: Scalars['String']
  title: Scalars['String']
  genre: Scalars['String']
  album?: Maybe<Scalars['String']>
  viewCount?: Maybe<Scalars['Int']>
  promoted?: Maybe<Scalars['Boolean']>
  imageUrl: Scalars['String']
  audioUrl: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  artistList: Array<Scalars['String']>
  name: Scalars['String']
}

export interface PlayingState {
  index: number
  isPlaying: boolean
  currentAudioTime: string
  percentPlayed: number
  progress: number
}

export interface AppContextState {
  dispatch: Dispatch
  playing: PlayingState
  user: {
    favTracks: Song[]
    recentTracks: Song[]
  }
  auth: {
    user: User | null
  }
  ui: {
    playerOpen: boolean
  }
  music: {
    tracks: Song[]
    hotTracks: string[]
    newTracks: string[]
  }
}

export interface User {
  name: string
  email: string
  id: string
}

type SET_PLAYER_OPEN_ACTION = {
  type: 'SET_PLAYER_OPEN'
  open: boolean
}

type PAUSE_ACTION = {
  type: 'PAUSE'
  open: boolean
}

type PLAY_ACTION = {
  type: 'PLAY'
  track: Song
}

type SEEK_ACTION = {
  type: 'SEEK'
  time: number
}

type NEXT_ACTION = {
  type: 'NEXT'
  track: Song
}

type PREV_ACTION = {
  type: 'PREV'
}

type FAV_ACTION = {
  type: 'FAV'
  track: Song
}

type LOGGED_IN_ACTION = {
  type: 'LOGGED_IN'
  user: User
}

type LOGOUT_ACTION = {
  type: 'LOGOUT'
}
type PERCENT_PLAYED_ACTION = {
  type: 'PERCENT_PLAYED'
  payload: number
}

type AUDIO_TIME_ACTION = {
  type: 'AUDIO_TIME'
  payload: string
}

type ADD_SONGS_ACTION = {
  type: 'ADD_SONGS'
  payload: Song[]
}

type ADD_SONGS_IF_NOT_ACTION = {
  type: 'ADD_SONGS_IF_NOT'
  payload: Song[]
}

export type Actions =
  | SET_PLAYER_OPEN_ACTION
  | PAUSE_ACTION
  | PLAY_ACTION
  | SEEK_ACTION
  | NEXT_ACTION
  | PREV_ACTION
  | FAV_ACTION
  | LOGGED_IN_ACTION
  | LOGOUT_ACTION
  | ADD_SONGS_ACTION
  | ADD_SONGS_IF_NOT_ACTION
  | PERCENT_PLAYED_ACTION
  | AUDIO_TIME_ACTION

export interface Action {
  type: Actions
  payload?: any
}

export type Dispatch = (action: Actions) => void

// Some state selectors
export const isPlayerOpen = (state: AppContextState) => state.ui.playerOpen

// Get all tracks in database
export const getTracks = (state: AppContextState) => state.music.tracks

export const getNewTracks = (state: AppContextState) =>
  state.music.tracks.filter(t => state.music.newTracks.find(nt => nt === t.id))

export const getHotTracks = (state: AppContextState) =>
  state.music.tracks.filter(t => state.music.hotTracks.find(nt => nt === t.id))

export const getFavTracks = (state: AppContextState) => state.user.favTracks

export const getRecentTracks = (state: AppContextState) =>
  state.user.recentTracks

export const isFavTrack = (state: AppContextState, track: Song) =>
  !!state.user.favTracks.find(t => t.id === track.id)

export const getPlaying = (state: AppContextState) => state.playing

export const getCurrentTrack = (state: AppContextState) =>
  state.music.tracks[state.playing ? state.playing.index || 0 : 0]

export const getTrack = (state: AppContextState, id: string) =>
  state.music.tracks.find(t => t.id === id)

export const getTrackIndex = (state: AppContextState, id: string) =>
  state.music.tracks.findIndex(t => t.id === id)

export const getUser = (state: AppContextState) => state.user

export const ActionCreators = {
  // Some state action creators
  openPlayer: () =>
    ({
      type: 'SET_PLAYER_OPEN',
      open: true,
    } as SET_PLAYER_OPEN_ACTION),

  closePlayer: () =>
    ({
      type: 'SET_PLAYER_OPEN',
      open: false,
    } as SET_PLAYER_OPEN_ACTION),

  pauseTrack: () =>
    ({
      type: 'PAUSE',
    } as PAUSE_ACTION),

  playTrack: (track?: Song) =>
    ({
      type: 'PLAY',
      track,
    } as PLAY_ACTION),

  seekTrack: (time: number) =>
    ({
      type: 'SEEK',
      time,
    } as SEEK_ACTION),

  nextTrack: () =>
    ({
      type: 'NEXT',
    } as NEXT_ACTION),

  setPercentPlayed: (percent: number) =>
    ({
      type: 'PERCENT_PLAYED',
      payload: percent,
    } as PERCENT_PLAYED_ACTION),

  addSongs: (songs: Song[]) =>
    ({
      type: 'ADD_SONGS',
      payload: songs,
    } as ADD_SONGS_ACTION),

  addSongsIfNotExist: (songs: Song[]) =>
    ({
      type: 'ADD_SONGS_IF_NOT',
      payload: songs,
    } as ADD_SONGS_IF_NOT_ACTION),

  setCurrentAudioTime: (time: string) =>
    ({
      type: 'AUDIO_TIME',
      payload: time,
    } as AUDIO_TIME_ACTION),

  prevTrack: () =>
    ({
      type: 'PREV',
    } as PREV_ACTION),

  favTrack: (track: Song) =>
    ({
      type: 'FAV',
      track,
    } as FAV_ACTION),

  logout: () =>
    ({
      type: 'LOGOUT',
    } as LOGOUT_ACTION),

  loggedIn: (user: User) =>
    ({
      type: 'LOGGED_IN',
      user,
    } as LOGGED_IN_ACTION),
}

export const reducer = (
  state: AppContextState,
  action: Actions
): AppContextState => {
  const playing = getPlaying(state)
  const ct = getCurrentTrack(state)
  const user = getUser(state)

  switch (action.type) {
    case 'SET_PLAYER_OPEN': {
      return {
        ...state,
        ui: {
          ...state.ui,
          playerOpen: action.open,
        },
      }
    }
    case 'PAUSE': {
      return {
        ...state,
        playing: {
          ...playing,
          isPlaying: false,
        },
      }
    }
    case 'PLAY': {
      if (action.track && action.track !== ct) {
        const newRecentTracks = getRecentTracks(state).filter(
          t => t.id !== action.track.id
        )
        //if track comes from search it might not exist.
        let index = getTrackIndex(state, action.track.id)
        let tracks = state.music.tracks

        //adding track to end of the array of tracks if index=-1 and settings index to last.
        if (index === -1) {
          index = tracks.length
          tracks.push(action.track)
        }

        setLocalStorageRecentTracks([action.track, ...newRecentTracks])

        return {
          ...state,
          music: {
            ...state.music,
            tracks: [...tracks],
          },
          ui: {
            playerOpen: true,
          },
          user: {
            ...user,
            recentTracks: [action.track, ...newRecentTracks],
          },
          playing: {
            ...playing,
            index,
            isPlaying: true,
            progress: 0,
            currentAudioTime: '0',
            percentPlayed: 0,
          },
        }
      }
      return {
        ...state,
        playing: {
          ...playing,
          isPlaying: true,
        },
      }
    }
    case 'SEEK': {
      return {
        ...state,
        playing: {
          ...playing,
          progress: action.time,
        },
      }
    }
    case 'NEXT': {
      return {
        ...state,
        playing: {
          ...state.playing,
          index: (playing.index + 1) % getTracks(state).length,
          progress: 0,
        },
      }
    }
    case 'PREV': {
      return {
        ...state,
        playing: {
          ...state.playing,
          index: Math.max(0, (state.playing?.index || 0) - 1),
          progress: 0,
        },
      }
    }
    case 'FAV': {
      const isFav = isFavTrack(state, action.track)
      const newFavs = getFavTracks(state).filter(t => t.id !== action.track.id)
      const favs = !isFav ? [ct, ...newFavs] : newFavs
      setLocalStorageFaveTracks(favs)
      return {
        ...state,
        user: {
          ...user,
          favTracks: favs,
        },
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        playing: {
          ...state.playing,
          isPlaying: false,
          currentAudioTime: '0',
          index: 0,
          percentPlayed: 0,
          progress: 0,
        },
        auth: {
          ...state.auth,
          user: null,
        },
      }
    }
    case 'LOGGED_IN': {
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.user,
        },
      }
    }
    case 'PERCENT_PLAYED':
      return {
        ...state,
        playing: {
          ...state.playing,
          percentPlayed: action.payload,
        },
      }
    case 'AUDIO_TIME':
      return {
        ...state,
        playing: {
          ...state.playing,
          currentAudioTime: action.payload,
        },
      }
    case 'ADD_SONGS': {
      const oldTracks = deepCopy(state.music.tracks)
      const newTracks = action.payload.map(s => s.id)
      const hotTracks = action.payload
        .filter(s => s.promoted && s.promoted === true)
        .map(s => s.id)

      const uniqueHot = deepCopy([...hotTracks, ...state.music.hotTracks])
      const uniqueNew = deepCopy([...newTracks, ...state.music.newTracks])
      const uniqueTracks = filterUniqueSongs([...action.payload, ...oldTracks])
      return {
        ...state,
        music: {
          tracks: uniqueTracks,
          newTracks: uniqueNew,
          hotTracks: uniqueHot,
        },
      }
    }
    case 'ADD_SONGS_IF_NOT': {
      const unique = filterUniqueSongs([
        ...state.music.tracks,
        ...action.payload,
      ])
      const songsIds = getSongIds(action.payload)
      const newTracks = filterUniqueIds([...state.music.newTracks, ...songsIds])
      const hotTracks = action.payload
        .filter(s => s.promoted && s.promoted === true)
        .map(s => s.id)

      const uniqueHot = filterUniqueIds([
        ...hotTracks,
        ...state.music.hotTracks,
      ])
      return {
        ...state,
        music: {
          tracks: unique,
          newTracks: newTracks,
          hotTracks: uniqueHot,
        },
      }
    }
    default:
      assertNever(action)
      return state
  }
}

function getSongIds(songs: Song[]) {
  return songs.map(song => song.id)
}

function filterUniqueIds(songIds: string[]) {
  return filterUnique(songIds, (every, current) => every === current)
}

function filterUniqueSongs(songs: Song[]) {
  return filterUnique(songs, (every, current) => every.id === current.id)
}

function filterUnique<T extends any>(
  songs: T[],
  where: (every: T, current: T) => boolean
) {
  return songs.reduce((prev, curr) => {
    if (prev.findIndex(s => where(s, curr)) !== -1) {
      return [...prev]
    }
    return [...prev, curr]
  }, [] as T[])
}
