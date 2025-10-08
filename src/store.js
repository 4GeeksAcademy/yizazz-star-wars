import { act } from "react";

export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    favourites: [],
    characters: {},
    planets: {}
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case `load_characters`:
      return {
        ...store,
        characters: { ...store.characters, ...action.payload }
      }

    case `add_character`:
      return {
        ...store,
        characters: { ...store.characters, [action.payload.uid]: action.payload.data }
      };

    case 'add_to_favourites':
      return {
        ...store,
        favourites: [...store.favourites, action.payload]
      };

    case 'remove_from_favourites':
      return {
        ...store,
        favourites: store.favourites.filter(item => item.uid !== action.payload.uid)
      };

    case `load_planet`:
      return {
        ...store,
        planets: { ...store.planets, ...action.payload }
      };

    case `add_planet`:
      return {
        ...store,
        planets: { ...store.planets, [action.payload.uid]: action.payload.data }
      }

    default:
      throw Error('Unknown action.');
  }
}
