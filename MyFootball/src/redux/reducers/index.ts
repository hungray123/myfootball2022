import { combineReducers } from 'redux';
import { UserReducer } from './userReducer';

const rootReducer:any = combineReducers({
    userReducer: UserReducer,
    //shoppingReducer: ShoppingReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>
export { rootReducer}