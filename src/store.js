export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    favourites: []   // Lista de favoritos
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
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

    default:
      throw Error('Unknown action.');
  }    
}
