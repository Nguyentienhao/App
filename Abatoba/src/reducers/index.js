import {combineReducers} from "redux";
import auth from "./auth";
import nav from "./nav";
import ui from "./ui";
import product from "./product";
import article from "./article";
import category from "./category";
import transaction from "./transaction";
import profile from "./profile";

export default combineReducers({
    auth,
    nav,
    ui,
    product,
    article,
    category,
    transaction,
    profile,
});
