import ClientUser from './IclientUser'

export default interface ServerUser extends ClientUser {
	password: string;
}