import { checkTypes } from "../../utils/check-types";
import { data } from "../../utils/constants";

export function UserInfo(user) {
  this.user = user;

  this.get = () => {
    return this.user;
  };

  this.set = (...args) => {
    checkTypes(args, ['object']);
    const [user] = args;

    this.user = { ...user };
    data.userInfo.title.textContent = this.user.name;
    data.userInfo.description.textContent = this.user.about;
    data.userInfo.avatar.style.backgroundImage = `url(${this.user.avatar})`;
  };

  return {
    get: this.get,
    set: this.set,
  };
};