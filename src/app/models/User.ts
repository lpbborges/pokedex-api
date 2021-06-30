import { Schema, model } from "mongoose";

import { IUser } from "../../interfaces/User";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
});

export const UserModel = model<IUser>("User", UserSchema);
